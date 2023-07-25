<template>
  <div id="curling"
    class="wrapper"
    @mousemove="moveOutSide($event)"
    @touchmove="touchMoveHandler($event)"
    @touchend="touchEndHandler($event)">
    <div class="corner"
      @mousedown="mouseDownHandler($event)"
      @touchstart="touchStartHandler($event)"></div>
    <div v-if="!isMobile" v-html="htmlCode[ind]" class="page leftpage"></div>
    <div class="page rightpage" v-html="htmlCode[isMobile?ind:(ind+1)%htmlCode.length]" :style="rightPageStl"></div>
    <div class="turn-wrapper"
      :style="turnWrapperStl"
      @mousedown="mouseDownHandler($event)"
      @mouseup="mouseUpHandler($event)"
      @mousemove="mouseMoveHandler($event)"
      @touchstart="touchStartHandler($event)"
      @touchmove="touchMoveHandler($event)"
      @touchend="touchEndHandler($event)">
      <div
        class="turn-page"
        v-html="isMobile?'':htmlCode[(ind+2)%htmlCode.length]"
        :style="turnPageStl"></div>
    </div>
    <div class="turn-wrapper2"
      :style="turnWrapper2Stl">
      <div class="turn-page2" v-html="htmlCode[(isMobile?ind+1:ind+3)%htmlCode.length]" :style="turnPage2Stl"></div>
    </div>
  </div>
</template>

<script>
export default {
  // variables declaration
  data () {
    return {
      // file name
      name: 'CurlingV2',
      // used to compose html files' names
      nameList: [
        'Cat', 'American Shorthair', 'British Shorthair', 'Chartreux', 'Ragdoll', 'Siamese cat', 'Persian cat', 'Russian Blue'
      ],
      // used to compose html files' names
      urlPrefix: '../../static/',
      // used to compose html files' paths
      urlSuffix: ' - Wikipedia.html',
      // plain html codes to be inserted
      htmlCode: [],
      // screen width
      screenWidth: window.innerWidth,
      // screen height
      screenHeight: window.innerHeight,
      // degree calculated when turning the page
      rightdeg: 0,
      // flag for whether start the turning process
      moveEventFlag: false,
      // variables used for calculating the position when turning pages
      transX: 0,
      transY: 0,
      wrapX: 0,
      // variables used for memory wrappers and pages components when turning pages
      page1: '',
      page2: '',
      wrap1: '',
      wrap2: '',
      corner: '',
      // page index
      ind: 0,
      // flag for whether the device is a mobile device
      isMobile: navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    }
  },
  computed: {
    // functions for responsive style setting
    rightPageStl: function () {
      if (this.isMobile) {
        return {
          width: '80%'
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
        backgroundColor: this.isMobile ? 'white' : ''
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
        transformOrigin: '100% 100%'
      }
    }
  },
  created () {
    this.readHtmlFiles()
  },
  methods: {
    // load html files to variable htmlCode
    readHtmlFiles () {
      for (let i = 0; i < this.nameList.length; ++i) {
        const filename = this.urlPrefix + this.nameList[i] + (this.isMobile ? ' - mobile' : '') + this.urlSuffix
        const file = this.loadFile(filename)
        const modifiedfile = this.modifystring(file)
        this.htmlCode.push(modifiedfile)
      }
    },
    loadFile (name) {
      const xhr = new XMLHttpRequest()
      const okStatus = document.location.protocol === 'file:' ? 0 : 200
      xhr.open('GET', name, false)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
      return xhr.status === okStatus ? xhr.responseText : null
    },
    modifystring (data) {
      // only for wiki pages, don't include this function if use other html files
      const stylepattern = /<link rel="stylesheet".*?>/g
      const matches = data.match(stylepattern)
      const hrefpattern = /href=".*?"/
      var styledata = data
      for (let i = 0; i < matches.length; ++i) {
        const hrefstring = matches[i].match(hrefpattern)[0]
        const filename = '../../static' + hrefstring.substring(7, hrefstring.length - 1)
        const file = this.loadFile(filename)
        styledata = styledata.replace(matches[i], '<style>' + file + '</style>')
      }
      const imgpattern = /<img .*?src="\.\/.*?>/g
      const imgmatches = styledata.match(imgpattern)
      var imgdata = styledata
      for (let i = 0; i < imgmatches.length; ++i) {
        const originulr = imgmatches[i]
        const srcmatch = originulr.match(/src="./)
        const newurl = originulr.replace(srcmatch, 'src="../../static')
        imgdata = imgdata.replace(imgmatches[i], newurl)
      }
      return imgdata
    },
    computeDeg (that, x0, y0) {
      // compute the degrees when turning pages
      var x1 = that.screenWidth * 0.9
      var y1 = that.screenHeight * 0.9
      if (x0 === x1) x0 = x1 - 1
      if (y0 === y1) y0 = y1 - 1
      var y = (x0 - x1) / (y1 - y0) * ((x1 - x0) / 2) + (y0 + y1) / 2
      var x = Math.sqrt(((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1))) / 2
      var alpha = Math.asin(x / (y1 - y))
      that.transX = 0 - x
      that.transY = 0 - x * Math.tan(alpha)
      that.wrapX = 0 - (y1 - y) * Math.tan(alpha)
      that.rightdeg = alpha / Math.PI * 180
    },
    turningAnimationPhase1 (that) {
      // The first phase of the turning process after the mouse up
      // Start from the mouse up position, move along the direction from right lowest corner to the mouse up position
      // Stop when the lower right corner of the turn-page is at the lower left corner of the right page
      if (that.moveEventFlag === true) {
        // Set variables according to the mouse-up position
        var alpha = that.rightdeg * Math.PI / 180
        var newtransX1 = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4) * Math.cos(alpha)
        var newtransY1 = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4) * Math.sin(alpha)
        var old2x = 0 - that.transX
        var old2deg = 0 - that.rightdeg
        var new2x1 = 0 - newtransX1
        var newWrapX = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4)
        // apply the variables to the styles of those components
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
        // set the animations and active them
        const duration1 = {duration: 1000}
        that.page1.animate(page1Move, duration1)
        that.page2.animate(page2Move, duration1)
        that.wrap1.animate(wrap1Move, duration1)
        that.wrap2.animate(wrap2Move, duration1)
      }
    },
    turningAnimationPhase2 (that) {
      // the second phase of the turning pages after mouse up
      // In this phase wrapper and turn-page are only doing the rotation
      if (that.moveEventFlag === true) {
        // set the flag to end to indicate the turning ends
        // Set the values of animation variables according to turn-page position
        that.moveEventFlag = false
        var old2deg = 0 - that.rightdeg
        var newWrapX = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4)
        var newtransX2 = 0 - that.screenWidth * (that.isMobile ? 0.8 : 0.4)
        var newtransY2 = 0
        var new2x2 = 0 - newtransX2
        // set those values to the styles of related components
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
        // set the animations and active them
        var duration2 = {duration: 1000, delay: 1000}
        that.page1.animate(page1Rotate, duration2)
        var myanimation = that.page2.animate(page2Rotate, duration2)
        that.wrap1.animate(wrap1Rotate, duration2)
        that.wrap2.animate(wrap2Rotate, duration2)
        // reset all the components' positions and increase the page index on finish
        myanimation.onfinish = (event) => {
          that.transX = 0
          that.transY = 0
          that.wrapX = 0
          that.rightdeg = 0
          that.ind = (that.ind + (that.isMobile ? 1 : 2)) % that.nameList.length
          that.wrap1.style.zIndex = 0
          that.corner.style.zIndex = 4
        }
      }
    },
    outofRange (that, e) {
      // only for mobile devices -- check if the touch position is out of the page range
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
      // only for non mobile devices -- check if the mouse position is out of the page range
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
      if (!this.page1) {
        // memory the pages and wrappers before move them
        this.page1 = document.querySelector('.turn-page')
        this.page2 = document.querySelector('.turn-page2')
        this.wrap1 = document.querySelector('.turn-wrapper')
        this.wrap2 = document.querySelector('.turn-wrapper2')
        this.corner = document.querySelector('.corner')
      }

      // move the corner to lower layers
      this.wrap1.style.zIndex = 2
      this.corner.style.zIndex = 0

      // set the components' position and degrees according to current mouse position
      var brX = this.screenWidth * 0.9
      var brY = this.screenHeight * 0.9
      if (e.x <= brX && e.x >= brX - this.screenWidth * 0.1 &&
          e.y <= brY && e.y >= brY - this.screenHeight * 0.1) {
        this.moveEventFlag = true
        this.$options.methods.computeDeg(this, e.x, e.y)
      } else {
        console.log(this.isMobile ? 'touch start not in corner' : 'mousedown not in corner')
      }
    },
    mouseUpHandler (e) {
      // call two phases turning functions
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
        // set the components' position and degrees according to current mouse position
        this.$options.methods.computeDeg(this, e.x, e.y)
      }
    },
    touchStartHandler (e) {
      // similar to mouseDownHandler
      if (!this.isMobile) return
      if (!this.page1) {
        this.page1 = document.querySelector('.turn-page')
        this.page2 = document.querySelector('.turn-page2')
        this.wrap1 = document.querySelector('.turn-wrapper')
        this.wrap2 = document.querySelector('.turn-wrapper2')
        this.corner = document.querySelector('.corner')
      }
      this.wrap1.style.zIndex = 2
      this.corner.style.zIndex = 0
      var brX = this.screenWidth * 0.9
      var brY = this.screenHeight * 0.9
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      console.log(e.x, e.y)
      if (x <= brX && x >= brX - this.screenWidth * 0.2 &&
          y <= brY && y >= brY - this.screenHeight * 0.2) {
        console.log(this.isMobile ? 'touch start in corner' : 'mousedown in corner')
        this.moveEventFlag = true
        this.$options.methods.computeDeg(this, x, y)
      } else {
        console.log(this.isMobile ? 'touch start not in corner' : 'mousedown not in corner')
      }
    },
    touchMoveHandler (e) {
      // similar to mouseMoveHandler
      console.log('touch move')
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
      // similar to mouseUpHandler
      if (!this.isMobile) return
      this.$options.methods.turningAnimationPhase1(this)
      this.$options.methods.turningAnimationPhase2(this)
    }
  },

  // Monitor window size in real time
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
    if (this.isMobile) {
      window.addEventListener('touchstart', {})
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
  z-index: 1;
}

.page {
  width: 40%;
  height: 80%;
  background-size: 100% 100%;
  display: inline-block;
  position: absolute;
  top: 10%;
  bottom: auto;
  z-index: 1;
  overflow: scroll;
}

.leftpage {
  left: 10%;
  right: auto;
}

.rightpage {
  left: auto;
  right: 10%;
}

.turn-wrapper {
  position: absolute;
  z-index: 0;
  overflow: hidden;
}

.turn-wrapper2 {
  position: absolute;
  z-index: 2;
  overflow: hidden;
}

.turn-page {
  position: absolute;
  background-size: 100% 100%;
  z-index: 3;
  overflow: scroll;
}

.turn-page2 {
  position: absolute;
  overflow: scroll;
}

.corner {
  position: absolute;
  width: 10%;
  height: 10%;
  right: 10%;
  left: auto;
  bottom: 10%;
  top: auto;
  z-index: 4;
  border-style: none;
  overflow: scroll;
}
</style>
