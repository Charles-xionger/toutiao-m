<template>
  <div class="login-container">
    <!-- 导航栏 Nav -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>

    <!-- 登录表单 -->
    <!-- 表单验证
          1. 给van-field组件配置 rules 验证规则
          2. 给表单提交的时候会自动触发表单验证
             如果验证通过，会触发 submit 事件
             如果验证失败，不会触发 submit 事件
    -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile"
        :rules="userFromRules.mobile" type="number" maxlength="11">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field name="name" placeholder="请输入验证码" v-model="user.code"
        :rules="userFromRules.code" type="numbe" maxlength="6">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <!-- time : 倒计时事件 -->
          <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s"
            @finish="isCountDownShow = false" />
          <van-button v-else class="send-msg-btn" native-type="button" round
            size="small" type="default" @click="onSendSms">
            获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: 13911111111, // 手机号
        code: 246810 // 验证码
      },
      userFromRules: {
        mobile: [{
          require: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
          message: '手机号格式错误'
        }],
        code: [{
          require: true,
          message: '填写验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user

      // TODO 2.表单验证

      // 在组件中必须通过，this.$toast 来调用 Toast 组件
      // 下一个toast组件生效，前一个toast组件自动关闭
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 2000 // 持续时间，默认是2000， 如果是0 ，则持续展示
      })

      // 3.提交表单请求登录
      try {
        const { data: res } = await login(user)
        console.log('登录成功', res)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功')
        // 登录成功跳转回原来的页面
        // back 方式不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或者验证码错误')
          this.$toast.fail('登录失败')
        } else {
          console.log('登录失败，请稍后再试', err)
          this.$toast.fail('登录失败，请稍后再试')
        }
      }
      // 4.根据请求返回的数据进行后续操作
    },

    async onSendSms() {
      // 1. 校验手机号

      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = true
        console.log('发送失败', err)
        if (err.response.statsus === 429) {
          this.$toast('发送太频繁，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .send-msg-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
