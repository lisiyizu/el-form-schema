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
        text: {
          tag: "text",
          label: "文字",
          default: "hello world!"
        },
        input1: {
          tag: "el-input",
          label: "输入框"
        },
        input2: {
          tag: "el-input",
          label: "输入框",
          slot: { append: "测试" }
        },
        input3: {
          tag: "el-input",
          label: "输入框",
          slot: { prepend: "测试" }
        },
        radio: {
          tag: "el-radio",
          label: "单选框",
          items: this.arrayData(5)
        },
        bool: {
          tag: "el-radio",
          label: "bool单选",
          items: [
            { label: "是", value: true },
            { label: "否", value: false }
          ]
        },
        select1: {
          tag: "el-select",
          label: "下拉框1",
          items: ["蛋壳公寓", "原油宝", "优胜教育"]
        },
        select2: {
          tag: "el-select",
          label: "下拉框2",
          keys: { label: "name", value: "id" },
          items: [
            { id: 1, name: "蛋壳公寓" },
            { id: 2, name: "原油宝" },
            { id: 3, name: "优胜教育" }
          ]
        },
        checkbox: {
          tag: "el-checkbox",
          label: "复选框",
          items: ["蛋壳公寓", "原油宝", "优胜教育"]
        },
        cascader: {
          tag: "el-cascader",
          label: "级联选择器",
          props: { options: [], filterable: true }
        },
        swtich: { tag: "el-switch", label: "复选框" },
        slider: {
          tag: "el-slider",
          label: "滑块",
          props: { step: 10, showStops: true }
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
        },
        datetimerange: {
          tag: "el-date-picker",
          label: "日期时间范围",
          props: { type: "datetimerange" }
        },
        timeselect: {
          tag: "el-time-select",
          label: "固定时间点",
          props: {
            pickerOptions: {
              start: "08:30",
              step: "00:15",
              end: "22:30"
            }
          }
        },
        timepicker: {
          tag: "el-time-picker",
          label: "时间选择器",
          props: { placeholder: "请选择时间" }
        },
        color: {
          tag: "el-color-picker",
          label: "颜色选择器"
        },
        upload: {
          tag: "el-upload",
          label: "上传组件",
          props: {
            listType: "picture-card",
            action: "https://jsonplaceholder.typicode.com/posts/"
          },
          slot: {
            default: { tag: "i", class: "el-icon-plus" }
          }
        }
      },
      model: {
        bool: true
      }
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
