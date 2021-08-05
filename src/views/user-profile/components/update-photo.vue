<template>
  <div class="update-photo">
    <img
      :src="img"
      class="img"
      ref="img"
    >
    <!-- 底部工具栏 -->
    <div class="toolbar">
      <div
        class="cancel"
        @click="$emit('close')"
      >取消</div>
      <div
        class="confirm"
        @click="onConfirm"
      >完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    onConfirm () {
      // 基于服务端的裁切，则使用：getData 方法，该方法得到裁切的区域参数
      // console.log(this.cropper.getData())
      // 是纯客户端的图片裁切，则使用：getCroppedCanvas方法
      // 该方法得到裁切之后的图片对象（类似于URL.createObjectURL 方法得到的文件对象）。
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateUserPhoto()
      })
    },

    async updateUserPhoto (blob) {
      // console.log(blob)
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })

      try {
        // 错误的用法

        // 如果接口需求 Content-Type application/json
        // 则传递普通 js 对象

        // 如果接口要求 Content-Type 是 multipart/form-data
        // 则必须传递 FormData 对象
        const formData = new FormData()

        formData.append('photo', blob)

        const { data: res } = await updateUserPhoto(formData)

        // 关闭视图
        this.$emit('close')

        this.$emit('update-photo', res.data.photo)
      } catch (err) {
        this.$toast.fail('头像上传失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang='less'>
.update-photo {
  background-color: #000;
  height: 100%;
  .img {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
