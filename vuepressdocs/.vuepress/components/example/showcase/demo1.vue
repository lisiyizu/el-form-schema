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
        checkbox: {
          tag: "el-checkbox",
          label: "复选框",
          inline: true,
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
        input2: {
          tag: "el-input",
          required: true,
          label: "输入框",
          tip: "测试测试！",
          slot: {
            prepend: {
              tag: "el-select",
              style: { width: "100px" },
              vmodel: "inputSel",
              items: this.arrayData(2)
            }
          }
        },
        arr: {
          tag: "array",
          inline: true,
          label: "数组",
          required: true,
          components: {
            input: { tag: "el-input", required: true }
          }
        }
      },
      model: {}
    };
  },
  methods: {
    arrayData(num) {
      return new Array(num).fill({}).map((item, index) => ({
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
      this.schema.checkbox.items = this.arrayData(3);
    });
  }
};
</script>
