<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title"
           class="title-text">我的频道</div>
      <van-button class="edit-btn"
                  type="danger"
                  plain
                  round
                  size="mini"
                  @click="isEdit = !isEdit">
        {{isEdit? '完成':'编辑'}} </van-button>
    </van-cell>
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(channel, index) in myChannels"
                     :key="index"
                     @click="onMyChannelClick(channel, index)">
        <!-- v-bind:class 语法
          一个对象，对象中的 Key 表示要作用的 css 类名
                   对象中的 value 要计算出布尔值，
                   true，则作用该类名
                   false, 不作用类名 -->
        <van-icon v-show="isEdit && !fiexdChannels.includes(channel.id)"
                  slot="icon"
                  name="clear"></van-icon>
        <span class="text"
              :class="{ active: index === active }"
              slot="text">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title"
           class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(channel, index) in recommendChannels"
                     :key="index"
                     icon="plus"
                     :text="channel.name"
                     @click="onAddChannel(channel)" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道,
      isEdit: false, // 控制编辑状态的显示
      fiexdChannels: [0] // 固定频道，不允许删除
    }
  },
  computed: {
    // 映射store
    ...mapState(['user']),
    recommendChannels () {
      // 数组 filter（） 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。
      return this.allChannels.filter(channel => {
        // const channels = []
        // 数组 find 方法：遍历数组，把符合条件的第一个元素返回
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
        //  return channels 伪代码
      })
    }
    // recommendChannels() {
    //   const channels = []
    //   this.allChannels.forEach(channel => {
    //     // find 遍历数组，找到满足条件的元素项
    //     const ret = this.myChannels.find(mychannel => {
    //       return mychannel.id === channel.id
    //     })
    //     // 如果我的频道中不包含该频道，则收集到推荐频道中
    //     if (!ret) {
    //       channels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return channels
    // }
  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () { },
  methods: {
    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取所有频道数据失败')
      }
    },

    // 点击添加频道
    async onAddChannel (channel) {
      // - 如果未登录，则存储到本地
      //   - 如果已登录，则存储到线上
      //     - 找到数据接口
      //     - 封装请求方法
      //     - 请求调用
      // console.log(channel)
      this.myChannels.push(channel)

      try {
        if (this.user) {
          // 已登录，则存储到线上
          await addUserChannels({
            id: channel.id, // 频道ID
            seq: this.myChannels.length
          })
        } else {
          // 未登录，则存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('保存失败，请稍后再试')
      }
    },

    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 1.如果是固定频道就不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        // 2.删除频道项
        this.myChannels.splice(index, 1)
        // 3.如果删除的激活频道之前的频道，则更新激活的频道项
        // 参数1：需要删除的元素的索引
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }

        // 4.处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },

    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        console.log(error)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85a5a;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      // 去除父容器的相对定位
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
