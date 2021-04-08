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
          label: "地址",
          items: ["A", "湖南"],
          props: { clearable: true }
        },
        area: {
          tag: "el-select",
          vif: '$model.region === "湖南"',
          items: ["C", "长沙市"],
          slot: { after: " " }
        },
        district: {
          tag: "el-select",
          vif: '$model.area === "长沙市"',
          items: ["E", "岳麓区"],
          slot: { after: " " }
        },
        switch: { tag: "el-switch", default: false, label: "复选框" },
        date: {
          tag: "el-date-picker",
          vif: "$model.switch",
          label: "日期范围",
          inline: true,
          props: { type: "date" }
        },
        timeselect: {
          tag: "el-time-select",
          label: "固定时间点",
          vif: "$model.date",
          inline: true,
          props: {
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
