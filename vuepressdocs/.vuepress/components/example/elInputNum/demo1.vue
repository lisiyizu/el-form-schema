<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      label-width="150px"
      ref="efs"
    >
    <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form-schema>
  </div>
</template>
<script>
// rules 数组时，支持 pattern
export default {
  data() {
    return {
      schema: {
        inputNum1: {
          tag: "el-input-num",
          label: "限制整数",
          props: {
            stepStrictly: true,
          }
        },
        inputNum2: {
          tag: "el-input-num",
          label: "浮点数（保留2位）",
          props: {
            precision: 2,
            min: 10, 
            max: 100
          }
        },
      },
      model: {}
    }
  },
  methods: {
    submit() {
      this.$refs.efs.validate(valid => {
        alert(valid);
      });
    },
    reset() {
      this.$refs.efs.resetFields();
    }
  }
};
</script>
