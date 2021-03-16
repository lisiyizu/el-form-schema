<template>
  <div>
    <p>{{model}}</p>
    <el-form-schema :schema="schema" v-model="model" :inline="false" label-width="120px"></el-form-schema>
  </div>
</template>
<script>
export default  {
  data () {
    return {
      schema: {
        radio: {
          tag: 'el-radio', 
          inline: true, 
          label: '是否必填', 
          items: [{ label:'必填', value: true }, { label: '非必填', value: false }]      
        },
        input: { 
          tag: 'el-input', 
          inline: true, 
          label: '输入框', 
          rules: { 
            required: '$model.radio', 
            message: '必填'
          }
        },
        select: { 
          tag: 'el-select', 
          inline: true,  
          label: '下拉框', 
          props: { disabled: '!$model.input' },
          items: ['测试'],
          required: '$model.input' 
        },
      },
      model: {}
    }
  },
  methods: {
    arrayData(num) {
      return new Array(num).fill({}).map((item, index) => ({ label: `测试-${index}`, value: index+1 }))
    }
  }
}
</script>