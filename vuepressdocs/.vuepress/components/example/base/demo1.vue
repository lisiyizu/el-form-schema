  <template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="false"
      ref="efs"
      label-width="120px"
      :api-config="getApiConfig"
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
        text: {
          tag: "text",
          label: "文字",
          default: "hello world!"
        },
        input1: {
          tag: "el-input-num",
          label: "数字组件",
          tip: "限制只能输入数字"
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
          label: "${model.input1}-${model.input2}",
          keys: { label: 'name', value: 'id' },
          items: "$config.foo"
        },
        radioButton: {
          tag: "el-radio",
          label: "复选框",
          type: "button",
          items: ["蛋壳公寓", "原油宝", "优胜教育"],
          initValue: "蛋壳公寓"
        },
        bool: {
          tag: "el-checkbox",
          label: "bool单选",
          items: [
            { label: "", value: true },
            { label: "否", value: false }
          ]
        },
        select1: {
          tag: "el-select",
          label: "下拉框1",
          keys: { label: 'name', value: 'id' },
          items: "$config.bar",
          slot: {
            after: {
              tag: "el-input",
              vmodel: "test",
              style: { width: "100px" }
            }
          }
        },
        select2: {
          tag: "el-select",
          label: "下拉框2 (int)",
          keys: {label: 'label', value: 'id'},
          default: -1,
          items:  [{
            label:"全部",
            id: 0,
          }, {
            label: "蛋壳公寓", 
            id: 1,
          }, {
            label: "优胜教育",
            id: -1
          }]
        },
        select3: {
          tag: "el-select",
          label: "下拉分组🌟",
          group: { label: 'label', children: 'options' },
          slot: { after: "注意设置：group: { label: 'label', children: 'options' }" },
          default: "Shanghai",
          items:  [{
            label: '热门城市',
            options: [{
              value: 'Shanghai',
              label: '上海'
            }, {
              value: 'Beijing',
              label: '北京'
            }]
          }]
        },
        checkBool: {
          tag: "el-checkbox",
          label: "是否阅读",
          type: "bool"
        },
        checkbox: {
          tag: "el-checkbox",
          label: "复选框",
          items: ["蛋壳公寓", "原油宝", "优胜教育"]
        },
        checkboxButton: {
          tag: "el-checkbox",
          label: "复选框",
          type: "button",
          items: ["蛋壳公寓", "原油宝", "优胜教育"],
          initValue: ["蛋壳公寓"]
        },
        cascader: {
          tag: "el-cascader",
          label: "级联选择器",
          props: { options: [], filterable: true }
        },
        swtich: { 
          tag: "el-switch", 
          label: "复选框",
          default: true,
        },
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
        input1: "hello world!",
        select1: 1,
        test: "123456"
      }
    };
  },
  methods: {
    submit() {
      this.$refs.efs.validate(valid => {
        alert(valid);
      });
    },
    reset() {
      this.$refs.efs.resetFields();
    },
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
