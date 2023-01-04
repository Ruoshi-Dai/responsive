<template>
  <div class="canvas" :style="{width: screenWidth + 'px', height: screenHeight + 'px', lineHeight: screenHeight + 'px'}">
    <div class="frame"
      :style="frameStyle"
    >
      <!-- <img :style="imgStyle" :src="imgsrc" alt=""> -->
      <cube-slide ref="slide"
                  :data="items"
                  :style="frameStyle"
                  :auto-play="false"
                  :initial-index="$route.params.index"
                  @change="onChange">
        <cube-slide-item v-for="(item, index) in items" :key="index">
          <a>
            <img :src="item.image" :style="imgStyle">
          </a>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PicViewer',
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
      imgsrc: require('./../../catpics/cat0.jpeg'),
      items: [
        {
          image: require('./../../catpics/cat0.jpeg')
        },
        {
          image: require('./../../catpics/cat1.jpeg')
        },
        {
          image: require('./../../catpics/cat2.jpeg')
        },
        {
          image: require('./../../catpics/cat3.jpeg')
        },
        {
          image: require('./../../catpics/cat4.jpeg')
        },
        {
          image: require('./../../catpics/cat5.jpeg')
        },
        {
          image: require('./../../catpics/cat6.jpeg')
        },
        {
          image: require('./../../catpics/cat7.jpeg')
        },
        {
          image: require('./../../catpics/cat8.jpeg')
        },
        {
          image: require('./../../catpics/cat9.jpeg')
        }
      ],
      imgwdh: [],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      slideindex: this.$route.params.index
    }
  },
  methods: {
    onChange (current) {
      this.slideindex = current
    },
    getimgwdh () {
      for (let i = 0; i < this.items.length; ++i) {
        let img = new Image()
        img.src = this.items[i].image
        this.imgwdh.push(img.width / img.height)
      }
    }
  },
  created () {
    this.getimgwdh()
  },
  computed: {
    frameStyle: function () {
      return {
        width: this.screenWidth + 'px',
        height: this.screenHeight + 'px',
        lineHeight: this.screenHeight + 'px'
      }
    },
    imgStyle: function () {
      // console.log("in imgStyle with index " + this.slideindex)
      let wdh = this.imgwdh[this.slideindex]
      let newheight = 0
      let newwidth = 0
      if (this.screenWidth / this.screenHeight > wdh) {
        newheight = this.screenHeight
        newwidth = newheight * wdh
      } else {
        newwidth = this.screenWidth
        newheight = newwidth / wdh
      }
      return {
        width: newwidth + 'px',
        height: newheight + 'px'
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
.canvas {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  /* background-color: bisque; */
}

.frame {
  background-color: azure;
  /* border-style: solid;
  border-width: 1px; */
  margin: 0 auto;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
}

.cube-slide-item {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  width: 100%;
  height: 100%;
}

.cube-slide-item img {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
}

</style>
