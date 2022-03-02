<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="false"
      ref="efs"
      label-width="120px"
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
        radio: {
          tag: "el-radio",
          label: "输入框",
          items:  [{ label: "必填", value: 1 }, { label: "非必填", value: 0 }]
        },
        input: {
          tag: "el-input",
          label: "输入框",
          slot: { prepend: "测试" },
          vif: "$model.radio === 1",
          rules: [{
            required: "$model.radio === 1",
            message: "必填"
          }, {
            pattern: /^([1-9]\d*)$/,
            message: "必须是正数字"
          }]
        },
        a: { 
          tag: 'el-select', 
          inline: true,  
          label: '联动类型', 
          required: true,
          items: [{
            label: "条件1",
            value: 1,
          },{
            label: "条件2",
            value: 2,
          }], 
        },
        b: {
          tag: "el-input",
          label: "hello",
          required: true,
          vif: "$model.a === 1"
        },
        c: {
          tag: "el-select",
          label: "world",
          required: true,
          items: [{ label: "必填", value: true }, { label: "非必填", value: false }],
          vif: "$model.a === 2"
        },
        d: { 
          tag: 'el-input', 
          label: '正整数',
          rules: [{
            required: "$model.c",
            message: "必填"
          }, {
            pattern: /(^[1-9]\d*$)/,
            message: "必须是正整数",
          }],
          vif: "$model.a === 2"
        },
        e: { 
          tag: 'el-input', 
          label: '正整数',
          required: true,
          vif: "$model.a === 2"
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
