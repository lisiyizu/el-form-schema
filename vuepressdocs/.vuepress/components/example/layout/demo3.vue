<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      label-width="auto"
      component-width="200px"
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
          inline: true,
          label: "输入框"
        },
        select: {
          tag: "el-select",
          inline: true,
          label: "下拉框",
          items: ["蛋壳公寓", "原油宝", "优胜教育"]
        },
        date: {
          tag: "el-date-picker",
          inline: true,
          label: "日期",
          props: { type: "date" }
        },
        radio: { tag: "el-radio", label: "单选", items: this.arrayData(5) },
        check: {
          tag: "el-checkbox",
          label: "复选(全部)",
          all: 0,
          items: [{ label: "全部", value: 0 }, ...this.arrayData(2)]
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
