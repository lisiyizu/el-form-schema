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
        arr: {
          tag: "array",
          inline: true,
          label: "数组",
          required: true,
          components: {
            input: { tag: "el-input", required: true },
            select: {
              tag: "el-select",
              slot: { after: " " },
              inline: true,
              required: true,
              items: []
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
    // 组件 items 赋值
    setTimeout(() => {
      this.schema.select.items = this.arrayData(1);
      this.schema.radio.items = this.arrayData(2);
      this.schema.checkbox.items = this.arrayData(3);
      this.schema.arr.components.select.items = this.arrayData(10);
    }, 500);
    // model 数据赋值
    setTimeout(() => {
      Object.assign(this.model, {
        select: 1,
        radio: 2,
        checkbox: [1],
        obj: {
          input: "hello world!",
          date: "2020-12-08",
          radio: 1
        },
        arr: [
          {
            input: "测试1",
            select: 1
          },
          {
            input: "测试2",
            select: 2
          }
        ]
      });
    }, 1000);
  }
};
</script>
