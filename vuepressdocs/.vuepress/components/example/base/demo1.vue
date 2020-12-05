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
        input2: { tag: 'el-input', label: '输入框', slot: { append: '测试' } },
        input3: { tag: 'el-input', label: '输入框', slot: { prepend: '测试' }, },
        radio: { tag: 'el-radio', label: '单选框', items: this.arrayData(5) },
        select: { tag: 'el-select', label: '下拉框', items: ["蛋壳公寓", "原油宝", "优胜教育"] },
        checkbox: { tag: 'el-checkbox', label: '复选框', items: ["a", "b", "c"] },
        cascader: { tag: 'el-cascader', label: '级联选择器', props: { options: [], filterable: true } },
        swtich: { tag: 'el-switch', label: '复选框' },
        slider: { tag: 'el-slider', label: '滑块', props: { step: 10, showStops: true } },
        date: { tag: 'el-date-picker', label: '日期', props: { type: 'date' } },
        daterange: { tag: 'el-date-picker', label: '日期范围', props: { type: 'daterange' } },
        timeselect: { 
          tag: 'el-time-select', 
          label: '固定时间点', 
          props: { 
            pickerOptions: {
              start: '08:30',
              step: '00:15',
              end: '22:30'
            }
          } 
        },
        timepicker: { tag: 'el-time-picker', label: '时间选择器', props: { placeholder: '请选择时间' } },
        color: { tag: 'el-color-picker', label: '颜色选择器' },
        upload: {
          tag: 'el-upload', 
          label: '上传组件',
          props: { 
            listType: "picture-card",
            action: "https://jsonplaceholder.typicode.com/posts/" 
          },
          slot: {
            default: { tag: 'i', class: 'el-icon-plus' }
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