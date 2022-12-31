<template>
  <div>
    <div class="wrapper">
      <cube-button
      id = "button1"
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
        The sides of the left button is 1/5 of the shorter side of the screen.
      </span>
    </div>
    <div>
      <cube-switch v-model="Switch">Switch</cube-switch>
    </div>
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
      value: '',
      Switch: true
    }
  },
  methods: {
    hide: function (event) {
      var text1 = document.getElementById('text1')
      if (this.buttonMsg === 'Hide') {
        text1.className = 'hide'
        this.buttonMsg = 'Show'
      } else {
        text1.className = 'show'
        this.buttonMsg = 'Hide'
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

cube-switch {
  border-style: solid;
  background-color: aqua;
}
</style>
