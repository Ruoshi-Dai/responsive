<template>
  <div id="curling"
    class="wrapper"
    @mousemove="moveOutSide($event)"
    @touchmove="moveOutSide($event)">
    <div v-if="!isMobile" class="page leftpage" :style="{backgroundImage: 'url(' + items[imgind].image + ')'}"></div>
    <div class="page rightpage" :style="rightPageStl"></div>
    <div class="turn-wrapper"
        :style="turnWrapperStl"
        @mousedown="mouseDownHandler($event)"
        @mouseup="mouseUpHandler($event)"
        @mousemove="mouseMoveHandler($event)"
        @touchstart="touchStartHandler($event)"
        @touchmove="touchMoveHandler($event)"
        @touchend="touchEndHandler($event)">
      <div class="turn-page" :style="turnPageStl"></div>
    </div>
    <div class="turn-wrapper2"
        :style="turnWrapper2Stl">
        <div class="turn-page2" :style="turnPage2Stl"></div>
    </div>
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
      page1: '',
      page2: '',
      wrap1: '',
      wrap2: '',
      imgind: 0,
      isMobile: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    }
  },
  computed: {
    rightPageStl: function () {
      if (this.isMobile) {
        return {
          width: '80%',
          backgroundImage: 'url(' + this.items[this.imgind % this.items.length].image + ')'
        }
      } else {
        return {
          backgroundImage: 'url(' + this.items[(this.imgind + 1) % this.items.length].image + ')'
        }
      }
    },
    turnWrapperStl: function () {
      var w = this.isMobile ? this.screenWidth * 0.8 : this.screenWidth * 0.4
      var h = this.screenHeight * 0.8
      var boxL = Math.sqrt(w * w + h * h)
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
      var w = this.isMobile ? this.screenWidth * 0.8 : this.screenWidth * 0.4
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
      var w = this.isMobile ? this.screenWidth * 0.8 : this.screenWidth * 0.4
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
        backgroundColor: this.isMobile ? 'white' : '',
        backgroundImage: this.isMobile ? '' : 'url(' + this.items[(this.imgind + 2) % this.items.length].image + ')'
        // backgroundColor: 'white'
      }
    },
    turnPage2Stl: function () {
      var w = this.isMobile ? this.screenWidth * 0.8 : this.screenWidth * 0.4
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
        backgroundImage: 'url(' + this.items[(this.isMobile ? this.imgind + 1 : this.imgind + 3) % this.items.length].image + ')'
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
    turningAnimationPhase1 (that) {
      if (that.moveEventFlag === true) {
        // console.log('x: ' + e.x + ' y: ' + e.y)
        if (!that.page1) {
          that.page1 = document.querySelector('.turn-page')
          that.page2 = document.querySelector('.turn-page2')
          that.wrap1 = document.querySelector('.turn-wrapper')
          that.wrap2 = document.querySelector('.turn-wrapper2')
        }
        var alpha = that.rightdeg * Math.PI / 180
        var newtransX1 = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4) * Math.cos(alpha)
        var newtransY1 = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4) * Math.sin(alpha)
        var old2x = 0 - that.transX
        var old2deg = 0 - that.rightdeg
        var new2x1 = 0 - newtransX1
        var newWrapX = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4)
        const page1Move = [
          {transform: 'translate(' + that.transX + 'px, ' + that.transY + 'px) rotate(' + that.rightdeg + 'deg)'},
          {transform: 'translate(' + newtransX1 + 'px, ' + newtransY1 + 'px) rotate(' + that.rightdeg + 'deg)'}
        ]
        const page2Move = [
          {transform: 'translate(' + old2x + 'px, ' + that.transY + 'px) rotate(' + old2deg + 'deg)'},
          {transform: 'translate(' + new2x1 + 'px, ' + newtransY1 + 'px) rotate(' + old2deg + 'deg)'}
        ]
        const wrap1Move = [
          {transform: 'translateX(' + that.wrapX + 'px) rotate(' + that.rightdeg + 'deg)'},
          {transform: 'translateX(' + newWrapX + 'px) rotate(' + that.rightdeg + 'deg)'}
        ]
        const wrap2Move = [
          {transform: 'translateX(' + that.wrapX + 'px) rotate(' + that.rightdeg + 'deg)'},
          {transform: 'translateX(' + newWrapX + 'px) rotate(' + that.rightdeg + 'deg)'}
        ]
        const duration1 = {duration: 1000}
        that.page1.animate(page1Move, duration1)
        that.page2.animate(page2Move, duration1)
        that.wrap1.animate(wrap1Move, duration1)
        that.wrap2.animate(wrap2Move, duration1)
      }
    },
    turningAnimationPhase2 (that) {
      if (that.moveEventFlag === true) {
        that.moveEventFlag = false
        if (!that.page1) {
          that.page1 = document.querySelector('.turn-page')
          that.page2 = document.querySelector('.turn-page2')
          that.wrap1 = document.querySelector('.turn-wrapper')
          that.wrap2 = document.querySelector('.turn-wrapper2')
        }
        var old2deg = 0 - that.rightdeg
        var newWrapX = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4)
        var newtransX2 = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4)
        var newtransY2 = 0
        var new2x2 = 0 - newtransX2
        console.log('rightdegree: ' + that.rightdeg)
        const page1Rotate = [
          {transform: 'translate(' + newtransX2 + 'px, ' + newtransY2 + 'px) rotate(' + that.rightdeg + 'deg)', transformOrigin: '100% 100%'},
          {transform: 'translate(' + newtransX2 + 'px, ' + newtransY2 + 'px) rotate(0deg)', transformOrigin: '100% 100%'}
        ]
        const page2Rotate = [
          {transform: 'translate(' + new2x2 + 'px, ' + newtransY2 + 'px) rotate(' + old2deg + 'deg)', transformOrigin: '0% 100%'},
          {transform: 'translate(' + new2x2 + 'px, ' + newtransY2 + 'px) rotate(0deg)', transformOrigin: '0% 100%'}
        ]
        const wrap1Rotate = [
          {transform: 'translateX(' + newWrapX + 'px) rotate(' + that.rightdeg + 'deg)'},
          {transform: 'translateX(' + newWrapX + 'px) rotate(0deg)'}
        ]
        const wrap2Rotate = [
          {transform: 'translateX(' + newWrapX + 'px) rotate(' + that.rightdeg + 'deg)'},
          {transform: 'translateX(' + newWrapX + 'px) rotate(0deg)'}
        ]
        var duration2 = {duration: 1000, delay: 1000}
        var myanimation = that.page1.animate(page1Rotate, duration2)
        that.page2.animate(page2Rotate, duration2)
        that.wrap1.animate(wrap1Rotate, duration2)
        that.wrap2.animate(wrap2Rotate, duration2)
        myanimation.onfinish = (event) => {
          that.transX = 0
          that.transY = 0
          that.wrapX = 0
          that.rightdeg = 0
          that.imgind = (that.imgind + (that.isMobile ? 1 : 2)) % that.items.length
        }
      }
    },
    outofRange (that, e) {
      var x1 = that.screenWidth * 0.9
      var y1 = that.screenHeight * 0.9
      var x0, y0, x
      if (that.isMobile) {
        x0 = e.touches[0].clientX
        y0 = e.touches[0].clientY
        x = (y1 - y0) / (x0 - x1) * ((y1 - y0) / 2) + (x0 + x1) / 2
        if (x <= that.screenWidth * 0.1) {
          return true
        }
      } else {
        x0 = e.x
        y0 = e.y
        x = (y1 - y0) / (x0 - x1) * ((y1 - y0) / 2) + (x0 + x1) / 2
        if (x <= that.screenWidth * 0.5) {
          return true
        }
      }
      return false
    },
    moveOutSide (e) {
      if (this.moveEventFlag) {
        console.log('move outside')
        var x = this.isMobile ? e.touches[0].clientX : e.x
        var y = this.isMobile ? e.touches[0].clientY : e.y
        if (x >= this.screenWidth * 0.9 || x <= this.screenWidth * 0.1 ||
          y >= this.screenHeight * 0.9 || y <= this.screenHeight * 0.1) {
          this.$options.methods.turningAnimationPhase1(this)
          this.$options.methods.turningAnimationPhase2(this)
        }
      }
    },
    mouseDownHandler (e) {
      if (this.isMobile) return
      var brX = this.screenWidth * 0.9
      var brY = this.screenHeight * 0.9
      console.log(e.x, e.y)
      if (e.x <= brX && e.x >= brX - this.screenWidth * 0.1 &&
          e.y <= brY && e.y >= brY - this.screenHeight * 0.1) {
        console.log(this.isMobile ? 'touch start in corner' : 'mousedown in corner')
        this.moveEventFlag = true
        this.$options.methods.computeDeg(this, e.x, e.y)
      } else {
        console.log(this.isMobile ? 'touch start not in corner' : 'mousedown not in corner')
      }
    },
    mouseUpHandler (e) {
      if (this.isMobile) return
      this.$options.methods.turningAnimationPhase1(this)
      this.$options.methods.turningAnimationPhase2(this)
    },
    mouseMoveHandler (e) {
      if (this.isMobile) return
      if (this.moveEventFlag) {
        if (this.$options.methods.outofRange(this, e)) {
          this.$options.methods.turningAnimationPhase2(this)
          return
        }
        this.$options.methods.computeDeg(this, e.x, e.y)
      }
    },
    touchStartHandler (e) {
      // console.log('touch start at', e.touches[0].clientX, e.touches[0].clientY)
      if (!this.isMobile) return
      var brX = this.screenWidth * 0.9
      var brY = this.screenHeight * 0.9
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      console.log(e.x, e.y)
      if (x <= brX && x >= brX - this.screenWidth * 0.1 &&
          y <= brY && y >= brY - this.screenHeight * 0.1) {
        console.log(this.isMobile ? 'touch start in corner' : 'mousedown in corner')
        this.moveEventFlag = true
        this.$options.methods.computeDeg(this, x, y)
      } else {
        console.log(this.isMobile ? 'touch start not in corner' : 'mousedown not in corner')
      }
    },
    touchMoveHandler (e) {
      if (!this.isMobile) return
      if (this.moveEventFlag) {
        if (this.$options.methods.outofRange(this, e)) {
          this.$options.methods.turningAnimationPhase2(this)
          return
        }
        this.$options.methods.computeDeg(this, e.touches[0].clientX, e.touches[0].clientY)
      }
    },
    touchEndHandler (e) {
      if (!this.isMobile) return
      this.$options.methods.turningAnimationPhase1(this)
      this.$options.methods.turningAnimationPhase2(this)
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
