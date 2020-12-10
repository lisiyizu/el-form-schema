<template>
  <div>
    <p>{{model}}</p>
    <el-form-schema :schema="schema" ref="el-form-schema" v-model="model" :inline="false" label-width="150px">
      <el-form-item>
				<el-button type="primary" @click="submit">提交</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
      <template slot="cascader.slot">
        <el-form-item label="cascader的slot方案" prop="cascader" :rules="{required:true,message:'必填!'}">
          <el-cascader v-model="model.cascader" :options="cascaderOptions"/>
        </el-form-item>
      </template>
    </el-form-schema>
  </div>
</template>
<script>
import { Input, Switch, Cascader } from 'element-ui';
import inputTrim from './components/el-input-trim';
export default  {
  data () {
    return {
      schema: {},
      model: {},
      cascaderOptions: []
    }
  },
  methods: {
    initForm() {
      this.schema = {
        inputTrim: { tag: inputTrim, required: true, attrs: { placeholder: '我是el-input-trim' } },
        input: { tag: Input, required: true, attrs: { placeholder: '自定义组件' } },
        cascader: { tag: 'slot', slot: 'cascader.slot' },
        timeselect: { tag: 'el-time-select' },
        arr: {
          tag: 'object',
          inline: true,
          required: true,
          label: '测试',
          components: {
            input: { tag: 'el-input', required: true },
            timeselect: { tag: 'el-time-select', required: true }
          }
        },
        switch: { tag: Switch }
      }
    },
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
  },
  mounted() {
    this.initForm();
    setTimeout(() => {
      this.cascaderOptions = [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }];
    },5000)
  }
}
</script>