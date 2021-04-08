<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      :api-config="getApiConfig"
      v-model="model"
      label-width="150px"
      component-width="200px"
    >
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        radio: {
          tag: "el-radio",
          required: true,
          label: "select是否显示清除",
          keys: {label: 'name', value: 'val'},
          items: "$config.foo"
        },
        select1: {
          label: '测试1',
          tag: 'el-select',
          items: [{ label: '测试$model', value: 1 }],
          props: { clearable: '$model.radio' }
        },
        select2: {
          label: '测试2',
          tag: 'el-select',
          items: [{ label: '测试$model', value: 1 }],
          props: { clearable: '$model.radio' }
        }
      },
      model: {}
    };
  },
  methods: {
    submit() {
      this.$refs["el-form-schema"].validate(valid => {
        alert(valid);
      });
    },
    reset() {
      this.$refs["el-form-schema"].resetFields();
    },
    async getApiConfig() {
      const foo = await new Promise(r => {
        setTimeout(() => r([{ val: true, name: '是' }, { val: false, name: '否' }]), 1000);
      });
      return { foo };
    }
  }
};
</script>
