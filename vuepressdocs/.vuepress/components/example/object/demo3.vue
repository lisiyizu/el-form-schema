<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      component-width="200px"
    >
      <el-form-item label-width="100px">
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
        systemSetting1: {
          tag: "object",
          title: "系统设置",
          type: "card",
          border: false,
          labelWidthComponents: "100px",
          inline: true,
          components: {
            sel1: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel2: { tag: "el-select", items: ['A'], required: true, inlineBlock: true,  label: "输入框" },
            sel3: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel4: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
          }
        },
        systemSetting2: {
          tag: "object",
          title: "系统设置",
          type: "card",
          border: false,
          labelWidthComponents: "100px",
          inline: true,
          endDivider: true,
          components: {
            sel1: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel2: { tag: "el-select", items: ['A'], required: true, inlineBlock: true,  label: "输入框" },
            sel3: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel4: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
          }
        },
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
