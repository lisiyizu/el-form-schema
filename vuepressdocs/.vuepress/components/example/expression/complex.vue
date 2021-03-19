<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      label-width="100px"
      component-width="200px"
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
        obj: {
          tag: "object",
          label: "对象",
          inline: true,
          components: {
            switch: {
              tag: "el-switch",
              props: {
                activeText: "启用table输入框",
                inactiveText: "禁用table输入框"
              },
              style: { width: "270px" }
            },
            date: { tag: "el-date-picker", required: true },
            select: {
              tag: "el-select",
              props: { disabled: "!$item.date" },
              required: true,
              items: ["A", "B"]
            }
          }
        },
        switch: {
          tag: "el-switch",
          required: true
        },
        arr: {
          tag: "array",
          inline: true,
          label: "数组",
          required: true,
          minLimit: 1,
          maxLimit: 3,
          slot: {
            add: "Add",
            delete: "Delete"
          },
          components: {
            input: {
              tag: "el-input",
              props: { disabled: "!$model.switch" },
              required: true
            },
            select: {
              tag: "el-select",
              props: { disabled: "!$model.switch || !$item.input" },
              required: true,
              items: ["A", "B"]
            }
          }
        },
        table: {
          tag: "table",
          label: "列表",
          minLimit: 1,
          maxLimit: 3,
          operator: { props: { fixed: "right" } },
          components: {
            input: {
              tag: "el-input",
              column: { label: "测试1" },
              props: { disabled: "!$model.obj.switch" },
              style: { width: "100" },
              required: true
            },
            switch: {
              tag: "el-switch",
              column: { width: "80px", align: "right", label: "测试2" },
              style: { width: "100" }
            },
            select1: {
              tag: "el-select",
              props: { disabled: "!$item.switch" },
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
    },
    submit() {
      this.$refs["el-form-schema"].validate(valid => {
        alert(valid);
      });
    },
    reset() {
      this.$refs["el-form-schema"].resetFields();
    }
  }
};
</script>
