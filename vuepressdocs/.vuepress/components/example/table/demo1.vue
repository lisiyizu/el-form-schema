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
        input: {
          tag: "el-input",
          required: true,
          label: "输入框"
        },
        table: {
          tag: "table",
          title: "Table-表单列表",
          slot: { add: "新增数据", delete: "删除数据" },
          operator: { column: { width: "120px" } },
          showValidate: true,
          components: {
            input: {
              tag: "el-input",
              style: { width: "150px" },
              column: { width: "180px", label: "测试1" },
              required: true
            },
            select1: {
              tag: "el-select",
              style: { width: "150px" },
              column: { width: "180px", label: "测试4" },
              required: true,
              items: ["测试1", "测试2"]
            },
            checkbox: {
              tag: "el-checkbox",
              column: { label: "测试5" },
              required: true,
              items: ["a", "b", "c"]
            },
            select3: {
              tag: "el-select",
              style: { width: "150px" },
              column: { width: "", label: "测试6" },
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
