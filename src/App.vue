<!--
 * @Author: your name
 * @Date: 2020-11-10 10:17:52
 * @Description: In User Settings Edit
-->
<template>
  <div id="app">
    <component :is="componentName"></component>
  </div>
</template>

<script>
import Example from './components/Example'
import Layout from './components/Layout'
import Test1 from './components/Test1'
import Test2 from './components/Test2'
import Test3 from './components/Test3'
import Test4 from './components/Test4'
import Test5 from './components/Test5'
import Showcase from './components/Showcase'
export default {
  name: 'app',
  components: {
    Example,
    Layout,
    Test1,
    Test2,
    Test3,
    Test4,
    Test5,
    Showcase
  },
  data: ()=> ({
     componentName: "Layout"
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
