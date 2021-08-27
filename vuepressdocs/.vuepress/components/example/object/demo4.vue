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
          items: ['A', 'B', 'C']
        },
        obj: {
          tag: "object",
          label: "${model.radio}",
          required: "$model.radio === 'A'",
          title: "选中值：${model.radio || '-'}",
          type: "fieldset",
          vif: "$model.radio === 'A'",
          labelWidthComponents: "100px",
          components: {
            radio: {
              tag: "el-radio",
              items: [
                { label: "必填", value: true },
                { label: "非必填", value: false }
              ]
            },
            arr: {
              tag: "array",
              required: "$item.radio",
              type: "fieldset",
              vif: "$item.radio",
              inline: true,
              components: {
                input: {
                  tag: "el-input",
                  required: true
                }
              }
            }
          }
        },
        arr: {
          tag: "array",
          label: "${model.radio}",
          required: "$model.radio === 'B'",
          title: "选中值：${model.radio || '-'}",
          type: "fieldset",
          minLimit: 2,
          labelWidthComponents: "0px",
          vif: "$model.radio === 'B'",
          inline: true,
          components: {
            input: {
              tag: "el-input",
              required: true
            }
          }
        },
        table: {
          tag: "table",
          label: "${model.radio}",
          required: "$model.radio === 'C'",
          type: "fieldset",
          labelWidthComponents: "0px",
          vif: "$model.radio === 'C'",
          minLimit: 1,
          maxLimit: 5,
          components: {
            input: {
              tag: "el-input",
              required: true,
              column: { label: "测试" }
            },
            radio: {
              tag: "el-input",
              required: true,
              column: { label: "测试" }
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
