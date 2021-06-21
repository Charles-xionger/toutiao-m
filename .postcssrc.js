/**
 * Postcss配置文件
 */
module.exports = {
  // 配置需要使用的PostCSS插件
  plugins: {
    // 配置使用 autoprofixer 插件
    // 作用: 生成浏览器 CSS 样式
    // vueCLI 已经配置了autoprefixer 插件
    // 'autoprefixer': {
    //   // 配置兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 配置使用 postcss-pxtorem 插件
    'postcss-pxtorem': {
      // 根元素的值，lib-fiexible 的适配方案，一行分为 10 份，
      // 所以rootValue 应该设计为设计稿宽度的1/10
      // 我们的设计稿是750，所以设置为75
      // vant 设计为37.5 ，因为Vant是基于375写的
      // 所以必须设置为37.5，唯一的缺点就是使用我们的设计稿的尺寸必须要/2
      // 如果是vant 的样式按照37.5 转换，自己的样式按照75转换
      // 查阅文档，rootValue 支持两种类型
      // 数值，固定的数值
      // 函数：可以动态处理返回
      //  postcss-pxtorem 处理每个css 文件的时候来调用函数
      //  它会把处理的css文件相关的信息，通过参数传递给该函数

      rootValue({ file }) {
        // console.log('处理的css文件：', file)
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,
      // 配置要转换的css属性
      // * 表示所有
      propList: ['*']
    }
  }
}
