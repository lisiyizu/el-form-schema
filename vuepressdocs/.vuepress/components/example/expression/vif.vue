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
        input1: { tag: 'el-input', label: '输入框' },
        region: { tag: 'el-select', label: '地址', items: ["A"] },
        area: { tag: 'el-select',  vif: '$model.region', items: ["B"], slot: { after: ' ' } },
        district: { tag: 'el-select', vif: '$model.area',  items: ["C"], slot: { after: ' ' } },
        switch: { tag: 'el-switch', default: false, label: '复选框' },
        daterange: { tag: 'el-date-picker', vif: '$model.switch', label: '日期范围', inline: true, props: { type: 'date' } },
        timeselect: { 
          tag: 'el-time-select', 
          label: '固定时间点', 
          vif: '$model.daterange',
          inline: true, 
          props: { 
            pickerOptions: {
              start: '08:30',
              step: '00:15',
              end: '22:30'
            }
          } 
        }
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