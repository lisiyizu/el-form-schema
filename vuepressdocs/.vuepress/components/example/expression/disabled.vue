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
          label: "输入框"
        },
        region: {
          tag: "el-select",
          inline: true,
          label: "地址",
          items: ["A"],
          slot: { after: " " }
        },
        area: {
          tag: "el-select",
          inline: true,
          items: ["B"],
          slot: { after: " " },
          props: { disabled: "!$model.region" }
        },
        district: {
          tag: "el-select",
          inline: true,
          items: ["C"],
          props: { disabled: "!$model.area" }
        },
        switch: { tag: "el-switch", label: "复选框" },
        daterange: {
          tag: "el-date-picker",
          label: "日期范围",
          inline: true,
          props: { disabled: "!$model.switch", type: "daterange" }
        },
        timeselect: {
          tag: "el-time-select",
          label: "固定时间点",
          inline: true,
          props: {
            disabled: "!$model.daterange.length",
            pickerOptions: {
              start: "08:30",
              step: "00:15",
              end: "22:30"
            }
          }
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
