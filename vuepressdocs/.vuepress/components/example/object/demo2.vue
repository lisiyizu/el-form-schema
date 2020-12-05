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
        time: { tag: 'el-time-select', label: ' ', inline: true},
        obj: {
          tag: 'object',
          label: '对象',
          title: '我是对象',
          required: true,
          type: 'card',
          labelWidthComponents: '100px',
          components: {
            input: { tag: 'el-input', required: true, label: '输入框' },
            radio: { tag: 'el-radio', items: this.arrayData(14) },
            checkbox: { tag: 'el-checkbox', items: this.arrayData(10) },
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