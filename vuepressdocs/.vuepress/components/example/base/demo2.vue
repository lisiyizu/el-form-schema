<template>
  <div>
    <p>{{model}}</p>
    <el-form-schema :schema="schema" v-model="model" :inline="false" label-width="120px"></el-form-schema>
  </div>
</template>
<script>
import { Input, Switch } from 'element-ui';
import inputTrim from './components/el-input-trim';
export default  {
  data () {
    return {
      schema: {
        inputTrim: { tag: inputTrim, required: true, attrs: { placeholder: '我是el-input-trim' } },
        input: { tag: Input, attrs: { placeholder: '自定义组件' } },
        switch: { tag: Switch }
      },
      model: {}
    }
  }
}
</script>