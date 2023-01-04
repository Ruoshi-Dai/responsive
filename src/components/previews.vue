<template>
  <div class="frame" :style="rowStyle">
    <div v-for="(img, index) in images" :key="index" v-if="index % 4 == 0" class="div2">
      <div :style="imgStyle" class="imgClass" @click="onClick(index)">
        <img :src="img.image">
      </div>
      <div v-if="index + 1 < images.length" :style="imgStyle" class="imgClass" @click="onClick(index + 1)">
        <img :src="images[index + 1].image">
      </div>
      <div v-if="index + 2 < images.length" :style="imgStyle" class="imgClass" @click="onClick(index + 2)">
        <img :src="images[index + 2].image">
      </div>
      <div v-if="index + 3 < images.length" :style="imgStyle" class="imgClass" @click="onClick(index + 3)">
        <img :src="images[index + 3].image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preveies',
  data () {
    return {
      resizeFlag: 0,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      images: [
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
      ]
    }
  },
  methods: {
    onClick: function (index) {
      console.log('click on pic ' + index)
      this.$router.push({
        name: 'PicViewer',
        params: {
          index: index
        }
      })
    }
  },
  computed: {
    rowStyle: function () {
      return {
        width: this.screenWidth + 'px'
      }
    },
    imgStyle: function () {
      return {
        width: this.screenWidth / 4 - 5 + 'px'
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
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 0ch;
}

.div2 {
  vertical-align: middle;
  text-align: left;
}

.imgClass {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
}

.imgClass img {
  width: 100%;
}
</style>
