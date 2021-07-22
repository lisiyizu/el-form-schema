<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="false"
      label-width="200px"
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

        select1: {
          tag: "el-select",
          label: "下拉框1",
          keys: { label: 'name', value: 'id' },
          items: "$config.bar"
        },
        select2: {
          tag: "el-select",
          label: "下拉框自定义scopedSlots🌟",
          keys: { label: 'label', value: 'id'},
          items:  [{
            word: 'A',
            label: "蛋壳公寓🌟",
            id: 1,
          }, {
            word: 'B',
            label: "原油宝🌟",
            id: 2,
          }, {
            word: 'C',
            label: "优胜教育🌟",
            id: 3,
          }],
          scopedSlots: (h, option) => {
            return {
              default: () => [
                h(
                  "div",
                  {
                    style: { float: "left" },
                  },
                  option.word
                ),
                h(
                  "div",
                  {
                    style: { float: "right", color: "#999999" },
                  },
                  option.label
                ),
              ],
            };
          },
        },
        radio: {
          tag: "el-radio",
          label: "单选框",
          keys: { label: 'name', value: 'id' },
          items: "$config.foo"
        },
        bool: {
          tag: "el-radio",
          label: "bool单选",
          items: [
            { label: "是", value: true },
            { label: "否", value: false }
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
