<template>
  <div>
    <h1
      :style="{
        fontSize: screenWidth/50 + 'px',
      }">
      1. Button:
    </h1>
    <div class="wrapper">
      <cube-button
      id = "button1"
      class="c-button"
      :style="{
        height: minWH/5 + 'px',
        width: minWH/5 + 'px',
        fontSize: minWH/25 + 'px',
        }"
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
    <h1
      :style="{
        fontSize: screenWidth/50 + 'px',
      }">
      2. Checkbox:
    </h1>
    <div>
      <cube-checkbox
        v-model="checked1"
        :style="{
          width: screenWidth/4 + 'px',
          fontSize: screenWidth/60 + 'px',
        }">
        Checkbox 1
      </cube-checkbox>
      <cube-checkbox
        v-model="checked2"
        :style="{
          width: screenWidth/4 + 'px',
          fontSize: screenWidth/60 + 'px',
        }">
        Checkbox 2
      </cube-checkbox>
      <cube-checkbox
        v-model="checked3"
        :style="{
          width: screenWidth/4 + 'px',
          fontSize: screenWidth/60 + 'px',
        }">
        Checkbox 3
      </cube-checkbox>
    </div>
    <h1
      :style="{
        fontSize: screenWidth/50 + 'px',
      }">
      3. Textarea:
    </h1>
    <div class="textareaEX">
      <cube-textarea
        v-model="txt1"
        :style="{
          width: screenWidth/3 + 'px',
          height: screenWidth/15 + 'px',
          fontSize: screenWidth/70 + 'px',
        }"></cube-textarea>
      <span
        class="textBox"
        :style="{
          width: screenWidth/3 -20 + 'px',
          height: screenWidth/15 - 20 + 'px',
          fontSize: screenWidth/70 + 'px',
        }">
        {{ txt1 }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      minWH: Math.min(window.innerHeight, window.innerWidth),
      screenWidth: window.innerWidth,
      msg: 'Hello World',
      buttonMsg: 'Hide',
      value: '',
      Switch: true,
      checked1: false,
      checked2: false,
      checked3: false,
      txt1: ''
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
        that.screenWidth = window.screenWidth
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
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          console.log('screenWidth: ' + that.screenWidth)
          that.timer = false
        }, 400)
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color:blueviolet;
  font-weight: bolder;
  text-align: left;
  margin-left: 5%;
  margin-top: 5%;
}

.wrapper {
  margin-top: 2%;
  display: flex;
}

.c-button {
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-left: 6%;
  margin-right: 5%;
}

.txt{
  text-align: left;
  padding-top: 5%;
}

.hide {
  visibility: hidden;
}

.show {
  visibility: visible;
}

.cube-checkbox {
  background-color: #fbf2fb;
  display: inline-block;
  margin-top: 23px;
  padding-left: 2%;
  padding-right: 2%;
}

.textareaEX {
  margin-bottom: 5%;
  display: flex;
}

.cube-textarea-wrapper {
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
}

.textBox {
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 5%;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
