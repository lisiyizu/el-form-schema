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
          showIndex: true,
          props: { showHeader: false },
          components: {
            input: {
              tag: "el-input",
              style: { width: "150px" },
              column: { width: "180px", label: "测试1" },
              required: true
            },
            obj: {
              tag: "object",
              inline: true,
              column: { width: "410px", label: "有效期" },
              components: {
                date: {
                  tag: "el-date-picker",
                  style: { width: "180px" },
                  props: { type: "date" }
                },
                time: {
                  tag: "el-time-select",
                  style: { width: "180px" }
                }
              }
            },
            checkbox: {
              tag: "el-input-number",
              style: { width: "180px" },
              column: { width: "200px", label: "测试5" },
              required: true
            },
            select3: {
              tag: "el-select",
              style: { width: "180px" },
              column: { width: "200px", label: "测试6" },
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
