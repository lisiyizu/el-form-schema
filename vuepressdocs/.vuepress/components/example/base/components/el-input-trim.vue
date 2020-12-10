<template>
  <el-input v-model.trim="vmodel" v-bind="$attrs"></el-input>
</template>
<script>
  export default {
    props: {
      value: {
        type: String
      }
    },
    computed: {
      vmodel: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>