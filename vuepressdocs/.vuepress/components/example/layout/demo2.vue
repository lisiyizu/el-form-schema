<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="true"
      :is-search-form="true"
      :use-enter-search="false"
      :expand-number="2"
      label-width="auto"
      component-width="220px"
      @submit="submit"
      @reset="reset"
    >
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        input1: {
          tag: "el-input",
          label: "输入框"
        },
        radio: {
          tag: "el-radio",
          label: "单选框",
          items: ["蛋壳公寓", "优胜教育"]
        },
        select: {
          tag: "el-select",
          default: 1,
          label: "下拉框",
          keys: { label: "name", value: "id" },
          items: [
            { id: 1, name: "蛋壳公寓" },
            { id: 2, name: "优胜教育" }
          ]
        },
        date: {
          tag: "el-date-picker",
          label: "日期",
          props: { type: "date" }
        },
        daterange: {
          tag: "el-date-picker",
          label: "日期范围",
          props: { type: "daterange" }
        }
      },
      model: {}
    };
  },
  methods: {
    submit() {
      console.log("submit");
    },
    reset() {
      console.log("reset");
    }
  }
};
</script>
