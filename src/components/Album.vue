<template>
  <div class="frame"
    :style="frameStyle"
  >
    <img :style="imgStyle" :src="imgsrc" alt="">
  </div>
</template>

<script>
export default {
  name: 'Album',
  data () {
    let maxW = window.innerWidth * 0.8
    let maxH = window.innerHeight * 0.8
    // max-width: 80% of screen Width
    // max-height: 80% of screen Height
    // width * height : 3 * 4
    var blockW = 0
    var blockH = 0
    if (maxW / 4 > maxH / 3) {
      blockW = maxH / 3 * 4
      blockH = maxH
    } else {
      blockW = maxW
      blockH = maxW / 4 * 3
    }
    return {
      resizeFlag: 0,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      blockW: blockW,
      blockH: blockH,
      imgsrc: require('./../../catpics/cat9.jpeg')
    }
  },
  computed: {
    frameStyle: function () {
      let maxW = this.screenWidth * 0.8
      let maxH = this.screenHeight * 0.8
      // max-width: 80% of screen Width
      // max-height: 80% of screen Height
      // width * height : 3 * 4
      var blockW = 0
      var blockH = 0
      if (maxW / 4 > maxH / 3) {
        blockW = maxH / 3 * 4
        blockH = maxH
      } else {
        blockW = maxW
        blockH = maxW / 4 * 3
      }
      return {
        width: blockW + 'px',
        height: blockH + 'px'
      }
    },
    imgStyle: function () {
      let imgObj = new Image()
      imgObj.src = this.imgsrc
      let newWidth = 0
      let newHeight = 0
      const wdh = imgObj.width / imgObj.height
      let maxW = this.screenWidth * 0.8
      let maxH = this.screenHeight * 0.8
      var blockW = 0
      var blockH = 0
      if (maxW / 4 > maxH / 3) {
        blockW = maxH / 3 * 4
        blockH = maxH
      } else {
        blockW = maxW
        blockH = maxW / 4 * 3
      }
      if (imgObj.width / 4 < imgObj.height / 3) {
        newHeight = blockH
        newWidth = newHeight * wdh
      } else {
        newWidth = blockW
        newHeight = newWidth / wdh
      }
      return {
        width: newWidth + 'px',
        height: newHeight + 'px'
      }
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = window.innerWidth
        window.screenHeight = window.innerHeight
        that.screenWidth = window.screenWidth
        that.screenHeight = window.screenHeight
        that.resizeFlag = (that.resizeFlag < 1000000 ? that.resizeFlag + 1 : 0)
      })()
    }
  },
  watch: {
    resizeFlag () {
      if (!this.timer) {
        this.timer = true
        let that = this
        setTimeout(function () {
          console.log('screenWidth: ' + that.screenWidth + '  screenHeight: ' + that.screenHeight)
          that.timer = false
        }, 400)
      }
    }
  }
}
</script>

<style scoped>
.frame {
  border-style: solid;
  border-width: 1px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  vertical-align: middle;
}

.frame img {
  /* width: 200px; */
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
</style>
