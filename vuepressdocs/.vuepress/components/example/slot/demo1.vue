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
        input1: {
          tag: "el-input",
          label: "输入框",
          slot: {
            prepend: "测试",
            prepend: {
              tag: "el-select",
              default: "A",
              vmodel: "inputSelectModel",
              style: { width: "100px" },
              items: ["A", "B", "C"]
            }
          }
        },
        date: {
          tag: "el-date-picker",
          label: "时间",
          props: { type: "date" },
          inline: true,
          slot: { after: "-" }
        },
        time: {
          tag: "el-time-select",
          inline: true,
          tip: "hello world!"
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
    }
  }
};
</script>
