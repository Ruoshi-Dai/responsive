<template>
  <div class="wrapper">
    <cube-button
    id = "button1"
    value = "true"
    class="c-button"
    :style="{
      height: minWH/5 + 'px',
      width: minWH/5 + 'px',
      fontSize: minWH/25 + 'px'
      }"
    :inline="true"
    @click="hide">
      {{ buttonMsg }}
    </cube-button>
    <span
      id="text1"
      class="txt"
      :style="{fontSize: minWH/35 + 'px'}">
      左方按钮的边长为频幕短边长度的五分之一。
    </span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      minWH: Math.min(window.innerHeight, window.innerWidth),
      msg: 'Hello World',
      buttonMsg: 'Hide',
      value: ''
    }
  },
  methods: {
    hide: function (event) {
      var hideBtn = document.getElementById('button1')
      var text1 = document.getElementById('text1')
      if (hideBtn.value === 'true') {
        text1.className = 'hide'
        hideBtn.value = 'false'
      } else {
        text1.className = 'show'
        hideBtn.value = 'true'
      }
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight
        window.screenWidth = window.innerWidth
        that.minWH = Math.min(window.screenHeight, window.screenWidth)
      })()
    }
  },
  watch: {
    minWH (val) {
      if (!this.timer) {
        this.minWH = val
        this.timer = true
        let that = this
        setTimeout(function () {
          console.log('screen Size changed, min of width and height is ' + that.minWH)
          that.timer = false
        }, 400)
      }
    }
  }
}
</script>

<style scoped>
.c-button {
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.txt{
  line-height: 10%;
}

.hide {
  visibility: hidden;
}

.show {
  visibility: visible;
}
</style>
