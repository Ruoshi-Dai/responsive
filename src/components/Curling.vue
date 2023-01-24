<template>
  <div id="curling" class="wrapper">
    <div class="page leftpage" :style="{backgroundImage: 'url(' + items[imgind].image + ')'}"></div>
    <div class="page rightpage"
        :style="{backgroundImage: 'url(' + items[(imgind + 1) % items.length].image + ')'}"></div>
    <div class="turn-wrapper"
        :style="turnWrapperStl"
        @mousedown="rightMouseDown($event)"
        @mouseup="rightMouseUp($event)"
        @mousemove="rightMouseMove($event)">
      <div class="turn-page" :style="turnPageStl"></div>
    </div>
    <div class="turn-wrapper2"
        :style="turnWrapper2Stl">
        <div class="turn-page2" :style="turnPage2Stl"></div>
    </div>
    <div class="corner br" @mousedown="brMousedown"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Curling',
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
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      ready: true,
      rightdeg: 0,
      moveEventFlag: false,
      rightOrigin: 0,
      transX: 0,
      transY: 0,
      wrapX: 0,
      transitionT: 0,
      page1: '',
      page2: '',
      wrap1: '',
      wrap2: '',
      imgind: 0
    }
  },
  computed: {
    turnWrapperStl: function () {
      var w = this.screenWidth * 0.4
      var h = this.screenHeight * 0.8
      var boxL = Math.sqrt(w * w + h * h)
      // var boxT = (this.screenHeight - boxL) / 2
      // var y = this.screenHeight * 0.9 - boxT
      return {
        width: boxL + 'px',
        height: boxL + 'px',
        top: 'auto',
        bottom: this.screenHeight * 0.1 + 'px',
        right: this.screenWidth * 0.1 + 'px',
        left: 'auto',
        transform: 'translateX(' + this.wrapX + 'px) rotate(' + this.rightdeg + 'deg)',
        transformOrigin: '100% 100%'
      }
    },
    turnWrapper2Stl: function () {
      var w = this.screenWidth * 0.4
      var h = this.screenHeight * 0.8
      var boxL = Math.sqrt(w * w + h * h)
      // var boxT = (this.screenHeight - boxL) / 2
      // var y = this.screenHeight * 0.9 - boxT
      return {
        width: boxL + 'px',
        height: boxL + 'px',
        top: 'auto',
        bottom: this.screenHeight * 0.1 + 'px',
        left: this.screenWidth * 0.9 + 'px',
        right: 'auto',
        transform: 'translateX(' + this.wrapX + 'px) rotate(' + this.rightdeg + 'deg)',
        transformOrigin: '0% 100%'
      }
    },
    turnPageStl: function () {
      var w = this.screenWidth * 0.4
      var h = this.screenHeight * 0.8
      // var boxL = Math.sqrt(w * w + h * h)
      return {
        width: w + 'px',
        height: h + 'px',
        top: 'auto',
        bottom: '0%',
        left: '100%',
        right: 'auto',
        transform: 'translate(' + this.transX + 'px, ' + this.transY + 'px) rotate(' + this.rightdeg + 'deg)',
        transformOrigin: '0% 100%',
        backgroundImage: 'url(' + this.items[(this.imgind + 2) % this.items.length].image + ')'
      }
    },
    turnPage2Stl: function () {
      var w = this.screenWidth * 0.4
      var h = this.screenHeight * 0.8
      // var boxL = Math.sqrt(w * w + h * h)
      var deg = 0 - this.rightdeg
      var dx = 0 - this.transX
      return {
        width: w + 'px',
        height: h + 'px',
        top: 'auto',
        bottom: '0%',
        right: '100%',
        left: 'auto',
        transform: 'translate(' + dx + 'px, ' + this.transY + 'px) rotate(' + deg + 'deg)',
        transformOrigin: '100% 100%',
        backgroundImage: 'url(' + this.items[(this.imgind + 3) % this.items.length].image + ')'
      }
    }
  },
  methods: {
    computeDeg (that, x0, y0) {
      // TODO: what if x0 = x1 or y0 = y1
      var x1 = that.screenWidth * 0.9
      var y1 = that.screenHeight * 0.9
      if (x0 === x1) x0 = x1 - 1
      if (y0 === y1) y0 = y1 - 1
      var y = (x0 - x1) / (y1 - y0) * ((x1 - x0) / 2) + (y0 + y1) / 2
      var x = Math.sqrt(((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1))) / 2
      var alpha = Math.asin(x / (y1 - y))
      // var x2 = x1 - (y1 - y) * Math.sin(alpha)
      // var y2 = y + (y1 - y) * Math.cos(alpha)
      that.rightOrigin = y - that.screenHeight * 0.1
      that.transX = 0 - x
      that.transY = 0 - x * Math.tan(alpha)
      that.wrapX = 0 - (y1 - y) * Math.tan(alpha)
      that.rightdeg = alpha / Math.PI * 180
      // console.log((x2 - x1) * (x2 - x1) + (y2 - y) * (y2 - y), (y1 - y) * (y1 - y), y2, (x0 - x1) / (y1 - y0) * x2 + (y0 + y1) / 2 - (x0 * x0 - x1 * x1) / (2 * (y1 - y0)))
    },
    brMousedown: function () {
      console.log('Mouse down on br')
    },
    rightMouseDown (e) {
      this.transitionT = 0
      var brX = this.screenWidth * 0.9
      var brY = this.screenHeight * 0.9
      if (e.x <= brX + this.screenWidth * 0.05 && e.x >= brX - this.screenWidth * 0.05 &&
          e.y <= brY + this.screenHeight * 0.05 && e.y >= brY - this.screenHeight * 0.05) {
        console.log('mousedown in corner')
        this.moveEventFlag = true
        this.shadowX = 0 - this.screenWidth * 0.01
        this.shadowY = this.screenHeight * 0.01
        this.shadowV = this.screenHeight * 0.01
        this.$options.methods.computeDeg(this, e.x, e.y)
      } else {
        console.log('mousedown not in corner')
      }
    },
    rightMouseUp (e) {
      console.log('x: ' + e.x + ' y: ' + e.y)
      this.moveEventFlag = false
      if (!this.page1) {
        this.page1 = document.querySelector('.turn-page')
        this.page2 = document.querySelector('.turn-page2')
        this.wrap1 = document.querySelector('.turn-wrapper')
        this.wrap2 = document.querySelector('.turn-wrapper2')
      }
      var alpha = this.rightdeg * Math.PI / 180
      var newtransX1 = 0 - this.screenWidth * 0.4 * Math.cos(alpha)
      var newtransY1 = 0 - this.screenWidth * 0.4 * Math.sin(alpha)
      var old2x = 0 - this.transX
      var old2deg = 0 - this.rightdeg
      var new2x1 = 0 - newtransX1
      var newWrapX = 0 - this.screenWidth * 0.4
      const page1Move = [
        {transform: 'translate(' + this.transX + 'px, ' + this.transY + 'px) rotate(' + this.rightdeg + 'deg)'},
        {transform: 'translate(' + newtransX1 + 'px, ' + newtransY1 + 'px) rotate(' + this.rightdeg + 'deg)'}
      ]
      const page2Move = [
        {transform: 'translate(' + old2x + 'px, ' + this.transY + 'px) rotate(' + old2deg + 'deg)'},
        {transform: 'translate(' + new2x1 + 'px, ' + newtransY1 + 'px) rotate(' + old2deg + 'deg)'}
      ]
      const wrap1Move = [
        {transform: 'translateX(' + this.wrapX + 'px) rotate(' + this.rightdeg + 'deg)'},
        {transform: 'translateX(' + newWrapX + 'px) rotate(' + this.rightdeg + 'deg)'}
      ]
      const wrap2Move = [
        {transform: 'translateX(' + this.wrapX + 'px) rotate(' + this.rightdeg + 'deg)'},
        {transform: 'translateX(' + newWrapX + 'px) rotate(' + this.rightdeg + 'deg)'}
      ]
      const duration1 = {duration: 1000}
      this.page1.animate(page1Move, duration1)
      this.page2.animate(page2Move, duration1)
      this.wrap1.animate(wrap1Move, duration1)
      this.wrap2.animate(wrap2Move, duration1)
      var newtransX2 = 0 - this.screenWidth * 0.4
      var newtransY2 = 0
      var new2x2 = 0 - newtransX2
      const page1Rotate = [
        {transform: 'translate(' + newtransX2 + 'px, ' + newtransY2 + 'px) rotate(' + this.rightdeg + 'deg)', transformOrigin: '100% 100%'},
        {transform: 'translate(' + newtransX2 + 'px, ' + newtransY2 + 'px) rotate(0deg)', transformOrigin: '100% 100%'}
      ]
      const page2Rotate = [
        {transform: 'translate(' + new2x2 + 'px, ' + newtransY2 + 'px) rotate(' + old2deg + 'deg)', transformOrigin: '0% 100%'},
        {transform: 'translate(' + new2x2 + 'px, ' + newtransY2 + 'px) rotate(0deg)', transformOrigin: '0% 100%'}
      ]
      const wrap1Rotate = [
        {transform: 'translateX(' + newWrapX + 'px) rotate(' + this.rightdeg + 'deg)'},
        {transform: 'translateX(' + newWrapX + 'px) rotate(0deg)'}
      ]
      const wrap2Rotate = [
        {transform: 'translateX(' + newWrapX + 'px) rotate(' + this.rightdeg + 'deg)'},
        {transform: 'translateX(' + newWrapX + 'px) rotate(0deg)'}
      ]
      var duration2 = {duration: 1000, delay: 1000}
      var myanimation = this.page1.animate(page1Rotate, duration2)
      this.page2.animate(page2Rotate, duration2)
      this.wrap1.animate(wrap1Rotate, duration2)
      this.wrap2.animate(wrap2Rotate, duration2)
      this.transX = 0
      this.transY = 0
      this.wrapX = 0
      this.rightdeg = 0
      myanimation.onfinish = (event) => {
        this.imgind = (this.imgind + 2) % this.items.length
      }
      // this.imgind = this.imgind + 2
      // console.log('newtransX: ' + this.transX)
    },
    rightMouseMove (e) {
      if (this.moveEventFlag) {
        this.$options.methods.computeDeg(this, e.x, e.y)
      }
    }
  },
  mounted () {
    // console.log(window.innerWidth, window.innerHeight)
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = window.innerWidth
        window.screenHeight = window.innerHeight
        that.screenWidth = window.screenWidth
        that.screenHeight = window.screenHeight
        that.rightX = window.screenWidth * 0.9
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
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.page {
  /* border-style: solid; */
  /* border-width: 1px; */
  width: 40%;
  height: 80%;
  background-size: 100% 100%;
  display: inline-block;
  position: absolute;
  top: 10%;
  bottom: auto;
  z-index: 1;
}

.leftpage {
  left: 10%;
  right: auto;
}

.rightpage {
  left: auto;
  right: 10%;
}

.rightback {
  right: auto;
  left: 90%;
}

.corner {
  border-style: solid;
  border-width: 1px;
  width: 5%;
  height: 5%;
  position: absolute;
}

.br{
  left: auto;
  right: 10%;
  top: auto;
  bottom: 10%;
}

.turn-wrapper {
  position: absolute;
  z-index: 2;
  /* transform: rotate(30deg); */
  /* transform-origin: 100% 70%; */
  border-color: blue;
  /* background-color: rgba(100, 100, 100, 0.5); */
  overflow: hidden;
}

.turn-wrapper2 {
  position: absolute;
  z-index: 2;
  border-color: blue;
  /* background-color: rgba(238, 151, 151, 0.5); */
  overflow: hidden;
}

.turn-page {
  position: absolute;
  background-size: 100% 100%;
  /* left: 100%;
  right: auto;
  width: 100%;
  height: 100%; */
  /* border-style: solid;
  border-color: red; */
  z-index: 3;
}

.turn-page2 {
  position: absolute;
  background-size: 100% 100%;
  /* right: 100%;
  left: auto;
  width: 100%;
  height: 100%; */
  /* border-style: solid; */
  /* border-color: red; */
  /* z-index: 3; */
}
</style>
