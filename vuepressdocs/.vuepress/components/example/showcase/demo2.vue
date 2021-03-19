<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      label-width="100px"
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
        input1: {
          tag: "el-input",
          required: true,
          label: "输入框"
        },
        select: {
          tag: "el-select",
          label: "下拉框",
          slot: { after: " " },
          inline: true,
          required: true,
          items: []
        },
        radio: {
          tag: "el-radio",
          label: "单选框",
          inline: true,
          slot: { after: " " },
          required: true,
          items: []
        },
        obj: {
          tag: "object",
          label: "对象测试-obj",
          inline: true,
          components: {
            input: {
              tag: "el-input",
              required: true,
              props: { disabled: "!$model.select" },
              slot: { prepend: "测试" }
            },
            date: {
              tag: "el-date-picker",
              props: { disabled: "!$item.input", type: "date" },
              required: true
            },
            radio: {
              tag: "el-radio",
              required: true,
              props: { disabled: "!$item.date" },
              items: this.arrayData(2)
            }
          }
        },
        arr: {
          tag: "array",
          inline: true,
          label: "数组测试",
          required: true,
          components: {
            input: { tag: "el-input", required: true }
          }
        },
        table2: {
          tag: "table",
          label: "table测试",
          operator: { props: { fixed: "right" } },
          components: {
            input: {
              tag: "el-input",
              column: { label: "测试1" },
              style: { width: "100" },
              required: true
            },
            switch: { tag: "el-switch", column: { label: "测试2" } },
            select1: {
              tag: "el-select",
              column: { label: "测试3" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            },
            select2: {
              tag: "el-select",
              column: { label: "测试4" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            },
            select3: {
              tag: "el-select",
              column: { label: "测试5" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            }
          }
        },
        list: {
          tag: "array",
          label: "数组测试",
          required: true,
          slot: { add: "新增测试", delete: "删除测试" },
          type: "card",
          minLimit: 1,
          maxLimit: 3,
          labelWidthComponents: "80px",
          components: {
            input: { tag: "el-input", label: "输入框", required: true },
            obj: {
              tag: "object",
              label: "对象测试",
              inline: true,
              components: {
                input: {
                  tag: "el-input",
                  required: true,
                  props: { disabled: "!$model.list[$index].input" },
                  slot: { prepend: "测试" }
                },
                date: {
                  tag: "el-date-picker",
                  props: { disabled: "!$item.input", type: "date" },
                  required: true
                },
                radio: {
                  tag: "el-radio",
                  required: true,
                  props: { disabled: "!$item.date" },
                  items: this.arrayData(2)
                }
              }
            },
            arr2: {
              tag: "array",
              inline: true,
              label: "测试",
              slot: { add: "Add", delete: "Delete" },
              components: {
                input: {
                  tag: "el-input",
                  required: true,
                  slot: { append: "测试" }
                },
                radio: {
                  tag: "el-select",
                  required: true,
                  items: this.arrayData(3)
                }
              }
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
        .map((item, index) => ({
          label: `测试-${index + 1}`,
          value: index + 1
        }));
    },
    submit() {
      this.$refs["el-form-schema"].validate(valid => {
        alert(valid);
      });
    },
    reset() {
      this.$refs["el-form-schema"].resetFields();
    }
  },
  mounted() {
    setTimeout(() => {
      this.schema.select.items = this.arrayData(10);
      this.schema.radio.items = this.arrayData(2);
    });
  }
};
</script>
