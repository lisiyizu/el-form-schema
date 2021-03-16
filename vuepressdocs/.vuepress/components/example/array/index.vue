<template>
  <div>
    <p>{{model}}</p>
    <el-form-schema ref="el-form-schema" :schema="schema" v-model="model" label-width="100px" component-width="200px">
      <el-form-item>
				<el-button type="primary" @click="submit">提交</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
    </el-form-schema>
  </div>
</template>
<script>
export default  {
  data () {
    return {
      schema: {
        arr1: {
          tag: 'array',
          label: '数组',
          required: true,
          type: "card",
          labelWidthComponents: '100px',
          slot: {
            add: 'Add',
            delete: 'Delete'
          },
          components: {
            radio: { 
              tag: 'el-radio', 
              required: true,
              label: '是否必填',
              items: [{ label:'显示', value: true }, { label: '隐藏', value: false }]   
            },
            input: { 
              tag: 'el-input', 
              label: '输入框',
              required: '$item.radio'
            },
            arr2: {
              tag: 'array',
              inline: true,
              components: {
                radio: {
                  tag: 'el-radio',
                  items: [{ label:'显示(下拉框)', value: true }, { label: '隐藏(下拉框)', value: false }]
                },
                select: {
                  tag: 'el-select',
                  items: ['A','B','C'],
                  required: true,
                  vif: 'arr1_$index === 0 && $item.radio'
                }
              }
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
    },
    submit () {
			this.$refs['el-form-schema'].validate(valid => {
				alert(valid);
			});
    },
    reset() {
      this.$refs['el-form-schema'].resetFields();
    }
  }
}
</script>