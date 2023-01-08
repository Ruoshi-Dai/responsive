<template>
  <div id="box">
    <ul class="pages"
        :style="{width: screenWidth + 'px', height: screenHeight * 0.8 + 'px'}">
      <li class="paper" data-left
          :style="{width: screenWidth * 0.5 + 'px', height: screenHeight * 0.8 + 'px'}"
          @click="gotoPrevieous">
        <div class="page page-1-back" id="p1b">
          <img :src="getImgsrc(0)" alt :style="{width: screenWidth * 0.5 + 'px', maxHeight: screenHeight * 0.8 + 'px'}">
        </div>
        <div class="page page-1" id="p1">
          <img :src="getImgsrc(1)" alt :style="{width: screenWidth * 0.5 + 'px', maxHeight: screenHeight * 0.8 + 'px'}">
        </div>
      </li>
      <li class="paper" data-right
          :style="{width: screenWidth * 0.5 + 'px', height:screenHeight * 0.8 + 'px'}"
          @click="gotoNext">
        <div class="page page-2" id="p2">
          <img :src="getImgsrc(2)" alt :style="{width: screenWidth * 0.5 + 'px', maxHeight: screenHeight * 0.8 + 'px'}">
        </div>
        <div class="page page-2-back" id="p2b">
          <img :src="getImgsrc(3)" alt :style="{width: screenWidth * 0.5 + 'px', maxHeight: screenHeight * 0.8 + 'px'}">
        </div>
      </li>
    </ul>
  </div>
  <!-- <div id="box">
    <ul class="pages" :style="{width: screenWidth + 'px', height:screenHeight * 0.8 + 'px'}">
      <li class="paper" data-left
          :style="{width: screenWidth * 0.5 + 'px', height:screenHeight * 0.8 + 'px'}"
          @click="gotoPrevieous">
        <div class="page page-1-back"></div>
        <div class="page page-1"></div>
      </li>
      <li class="paper" data-right
          :style="{width: screenWidth * 0.5 + 'px', height:screenHeight * 0.8 + 'px'}"
          @click="gotoNext">
          <div class="page page-2"></div>
          <div class="page page-2-back"></div>
      </li>
    </ul>
    <div class="test"></div>
  </div> -->
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
      p1bObj: '',
      p1Obj: '',
      p2Obj: '',
      p2bObj: '',
      index: 0
    }
  },
  methods: {
    gotoPrevieous () {
      if (this.ready === false) return
      this.ready = false
      this.p1Obj.style.zIndex = 4
      this.p1bObj.style.zIndex = 3
      console.log('p1b zindex: ' + this.p1Obj.style.zIndex)
      console.log('p2 zindex: ' + this.p2Obj.style.zIndex)
      this.leftpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(180deg)'
      this.leftpageObj.style.transformOrigin = 'right center'
      this.leftpageObj.style.transition = '2s ease-in-out'
      let newIndex = (this.index - 2 + this.items.length) % this.items.length
      this.leftpageObj.addEventListener('webkitTransitionEnd', () => {
        this.leftpageObj.style.transition = 'none'
        this.leftpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(0deg)'
        this.index = newIndex
        // this.p1bObj.style.zIndex = 1
        // this.p1Obj.style.zIndex = 2
        this.ready = true
        console.log('index: ' + this.index)
      }, false)
    },
    gotoNext () {
      if (this.ready === false) return
      this.ready = false
      this.p2Obj.style.zIndex = 4
      this.p2bObj.style.zIndex = 3
      this.rightpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(-180deg)'
      this.rightpageObj.style.transformOrigin = 'left center'
      this.rightpageObj.style.transition = '2s ease-in-out'
      let newIndex = (this.index + 2) % this.items.length
      this.rightpageObj.addEventListener('webkitTransitionEnd', () => {
        this.rightpageObj.style.transition = 'none'
        this.rightpageObj.style.WebkitTransform = 'perspective(1000px) rotateY(0deg)'
        this.index = newIndex
        this.p2bObj.style.zIndex = 1
        this.p2Obj.style.zIndex = 2
        this.ready = true
        console.log('index: ' + this.index)
      }, false)
    }
  },
  computed: {
    getImgsrc () {
      return function (ind) {
        // console.log('index: ' + this.index + ' length: ' + this.items.length)
        return this.items[(this.index + ind) % this.items.length].image
      }
    }
  },
  mounted () {
    const that = this
    this.boxObj = document.getElementById('box')
    this.leftpageObj = document.querySelector('.paper[data-left]')
    this.rightpageObj = document.querySelector('.paper[data-right]')
    this.p1bObj = document.getElementById('p1b')
    this.p1Obj = document.getElementById('p1')
    this.p2Obj = document.getElementById('p2')
    this.p2bObj = document.getElementById('p2b')
    this.p1bObj.style.zIndex = 1
    this.p1Obj.style.zIndex = 2
    this.p2Obj.style.zIndex = 2
    this.p2bObj.style.zIndex = 1
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
@keyframes flip-to-left {
  from {
    transform: perspective(1000px) rotateY(0);
  }
  to {
    transform: perspective(1000px) rotateY(-180deg);
  }
}

@keyframes flip-to-right {
  from {
    transform: perspective(1000px) rotateY(0);
  }
  to {
    transform: perspective(1000px) rotateY(180deg);
  }
}

/* .paper[data-right] {
  transform-origin: left center;
  animation: flip-to-left 2s ease-in-out;
} */

/* .paper[data-left] {
  transform-origin: right center;
  animation: flip-to-right 2s ease-in-out;
} */

.paper {
  /* display: none; */
  position: absolute;
  right: 0;
  transform-style: preserve-3d;
  z-index: auto;
}

.paper[data-left],
.paper[data-right] {
  display: block;
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

/* .paper[data-right] + .paper {
  display: block;
} */

.page {
  position: absolute;
  top: 0;
  z-index: auto;
}

.page-1-back, .page-2-back {
  z-index: 1;
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
</style>
