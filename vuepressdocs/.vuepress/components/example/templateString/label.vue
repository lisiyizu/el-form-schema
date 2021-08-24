<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="false"
      label-width="120px"
    ></el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        radio: {
          tag: "el-radio",
          label: "字母",
          default: "A",
          items: ['A', 'B']
        },
        select1: {
          tag: "el-select",
          label: "${model.radio}", // label 模版字符串
          vif: "$model.radio",
          items: ["hello", 'world']
        }
      },
      model: {}
    };
  }
};
</script>
