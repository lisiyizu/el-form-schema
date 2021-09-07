<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      :api-config="getApiConfig"
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
          components: {
            input: {
              tag: "el-input",
              required: true,
              labelWidth: "60px",
              label: "测试"
            },
            table: {
              tag: "table",
              labelWidthComponents: "0px",
              minLimit: 2,
              components: {
                input: {
                  tag: "el-input",
                  required: true,
                  column: { label: "测试" }
                },
                select: {
                  tag: "el-select",
                  required: true,
                  default: 1,
                  keys: { label: 'name', value: 'id' },
                  items: "$config.foo",
                  column: { label: "测试" }
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
          labelWidthComponents: "0px",
          vif: "$model.radio === 'B'",
          inline: true,
          minLimit: 2,
          components: {
            select: {
              tag: "el-select",
              required: true,
              keys: { label: 'name', value: 'id' },
              items: "$config.foo"
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
          minLimit: 2,
          components: {
            input: {
              tag: "el-input",
              required: true,
              column: { label: "测试" }
            },
            select: {
              tag: "el-select",
              required: true,
              keys: { label: 'name', value: 'id' },
              items: "$config.foo",
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
    },
     async getApiConfig() {
      const foo = await new Promise(r => {
        setTimeout(() => r([{ id: 1, name: 'foo1' }, { id: 2, name: 'foo2' }]), 3000);
      });
      return { foo };
    }
  }
};
</script>
