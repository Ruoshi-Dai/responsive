<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <h2><cube-button> Test </cube-button></h2>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style scoped>
h1 {
    color: blueviolet;
}
</style>
