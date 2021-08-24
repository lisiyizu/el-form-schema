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
        radio: {
          tag: "el-radio",
          label: "字母",
          default: 'A',
          items: ['A', 'B']
        },
        arr: {
          tag: "array",
          label: "${model.radio}",
          required: true,
          title: "选中值：${model.radio || '-'}-${index+1}",
          type: "card",
          class: "arrClass",
          labelWidthComponents: "100px",
          components: {
            radio: {
              tag: "el-radio",
              required: true,
              items: [
                { label: "必填", value: true },
                { label: "非必填", value: false }
              ]
            }
          }
        },
        obj: {
          tag: "object",
          label: "${model.radio}",
          required: true,
          title: "选中值：${model.radio || '-'}",
          type: "card",
          class: "objClass",
          labelWidthComponents: "100px",
          components: {
            radio: {
              tag: "el-radio",
              required: true,
              items: [
                { label: "必填", value: true },
                { label: "非必填", value: false }
              ]
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
