<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      v-model="model"
      :schema="schema"
      :inline="false"
      label-width="120px"
      :api-config="getApiConfig"
    ></el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        text: {
          tag: "text",
          label: "文字",
          labelTip: "hello world!",
          default: "测试"
        },
        input1: {
          tag: "el-input",
          label: "输入框",
          labelTip: "hello world!"
        },
        radio: {
          tag: "el-radio",
          label: "单选框",
          labelTip: "hello world!",
          keys: { label: 'name', value: 'id' },
          props: { disabled: '!$model.input1' },
          items: "$config.foo"
        },
        select1: {
          tag: "el-select",
          label: "下拉框1",
          tip: "hello world!",
          keys: { label: 'name', value: 'id' },
          items: "$config.bar"
        }
      },
      model: {}
    };
  },
  methods: {
    arrayData(num) {
      return new Array(num)
        .fill({})
        .map((item, index) => ({ label: `测试-${index}`, value: index + 1 }));
    },
    async getApiConfig() {
      const foo = await new Promise(r => {
        setTimeout(() => 
          r([{ id: 1, name: '动态数据1' }, { id: 2, name: '动态数据2' }])
        , 500);
      });
      const bar = await new Promise(r => {
        setTimeout(() => 
          r([{ id: 1, name: 'bar1' }, { id: 2, name: 'bar2' }])
        , 500);
      });
      return { foo, bar };
    }
  }
};
</script>
