<template>
  <div id="box">
    <div class="pages" :style="{width: screenWidth * 0.8 + 'px', height: this.screenWidth / 6 * 4 + 'px', left: screenWidth * 0.1 + 'px'}">
      <div class="prepaper" :style="pageStyle">
        <img :src="getImgsrc(0)" alt :style="imgStyle">
      </div>
      <div class="paper" data-left :style="pageStyle" @click="gotoPrevieous">
        <div class="page page-1-back" :style="pageStyle">
          <img :src="getImgsrc(1)" alt :style="imgStyle">
        </div>
        <div class="page page-1" :style="pageStyle">
          <img :src="getImgsrc(2)" alt :style="imgStyle">
        </div>
      </div>
      <div class="paper" data-right :style="pageStyle" @click="gotoNext">
        <div class="page page-2" :style="pageStyle">
          <img :src="getImgsrc(3)" alt :style="imgStyle">
        </div>
        <div class="page page-2-back" :style="pageStyle">
          <img :src="getImgsrc(4)" alt :style="imgStyle">
        </div>
      </div>
      <div class="nxtpaper" :style="pageStyle">
        <img :src="getImgsrc(5)" alt :style="imgStyle">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      boxObj: '',
      leftpageObj: '',
      rightpageObj: '',
      index: 0
    }
  },
  methods: {
    gotoPrevieous () {
      if (this.ready === false) return
      this.ready = false
      this.leftpageObj.style.zIndex = 4
      this.leftpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(180deg)'
      this.leftpageObj.style.transformOrigin = 'right center'
      this.leftpageObj.style.transition = '2s ease-in-out'
      let newIndex = (this.index - 2 + this.items.length) % this.items.length
      this.leftpageObj.addEventListener('webkitTransitionEnd', () => {
        this.leftpageObj.style.transition = 'none'
        this.leftpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(0deg)'
        this.index = newIndex
        this.leftpageObj.style.zIndex = 3
        this.ready = true
        console.log('index: ' + this.index)
      }, false)
    },
    gotoNext () {
      if (this.ready === false) return
      this.ready = false
      this.rightpageObj.style.zIndex = 4
      this.rightpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(-180deg)'
      this.rightpageObj.style.transformOrigin = 'left center'
      this.rightpageObj.style.transition = '2s ease-in-out'
      let newIndex = (this.index + 2) % this.items.length
      this.rightpageObj.addEventListener('webkitTransitionEnd', () => {
        this.rightpageObj.style.transition = 'none'
        this.rightpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(0deg)'
        this.index = newIndex
        this.rightpageObj.style.zIndex = 3
        this.ready = true
        console.log('index: ' + this.index)
      }, false)
    }
  },
  computed: {
    getImgsrc () {
      return function (ind) {
        return this.items[(this.index + ind) % this.items.length].image
      }
    },
    imgStyle: function () {
      return {
        width: this.screenWidth * 0.4 + 'px',
        maxHeight: '100%'
      }
    },
    pageStyle: function () {
      return {
        width: this.screenWidth * 0.4 + 'px',
        height: this.screenWidth * 0.4 / 3 * 4 + 'px'
      }
    }
  },
  mounted () {
    const that = this
    this.boxObj = document.getElementById('box')
    this.leftpageObj = document.querySelector('.paper[data-left]')
    this.rightpageObj = document.querySelector('.paper[data-right]')
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
.box {
  text-align: center;
}

.pages {
  z-index: auto;
  position:absolute;
  display: inline-block;
}

.paper {
  /* display: none; */
  position: absolute;
  right: 0;
  transform-style: preserve-3d;
}

.page {
  background-color: white;
}

.paper[data-left],
.paper[data-right] {
  display: block;
  z-index: 3;
}

.paper[data-left] {
  transform-origin: right center;
}

.paper[data-right] {
  transform-origin: left center;
}

.paper[data-left] {
  right: auto;
  left: 0;
}

.paper[data-right] {
  left: auto;
  right: 0;
}

.prepaper {
  position: absolute;
  right: auto;
  left: 0;
  z-index: 0;
}

.nxtpaper {
  position: absolute;
  left: auto;
  right: 0;
  z-index: 0;
}

.page {
  position: absolute;
  top: 0;
  z-index: auto;
}

.page-1-back, .page-2-back {
  z-index: 2;
}

.page-1-back img {
  transform: scale(-1, 1);
}

.page-2-back img {
  transform: scale(-1, 1);
}

.page-1, .page-2 {
  z-index: 2;
  transform: translateZ(1px);
}

.page-pre, .page-nxt {
  z-index: 1;
}
</style>
