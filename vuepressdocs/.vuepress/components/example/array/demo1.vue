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
        input: { tag: 'el-input', required: true, label: '输入框' },
        arr: {
          tag: 'array',
          inline: true,
          label: '数组',
          required: true,
          slot: {
            add: 'Add',
            delete: 'Delete'
          },
          components: {
              input: { tag: 'el-input', required: true },
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