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
          required: true,
          label: "测试",
          keys: {label: 'name', value: 'id'},
          items: "$config.foo"
        },
        arr1: {
          tag: "array",
          label: "数组",
          required: true,
          title: "测试-$index",
          type: "card",
          labelWidthComponents: "100px",
          components: {
            radio: {
              tag: "el-radio",
              required: true,
              keys: { label: 'name', value: 'id' },
              items: "$config.obj"
            },
            arr2: {
              tag: "array",
              inline: true,
              labelWidthComponents: "70px",
              components: {
                input: {
                  tag: "el-input",
                  required: "arr1_$index === 0 && arr2_$index === 0",
                  label: "输入框"
                },
                select: {
                  tag: "el-select",
                  required: "$model.arr1[arr1_$index].radio",
                  label: "下拉框",
                  keys: { label: 'name', value: 'id' },
                  items: "$config.test"
                }
              }
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
      const test = await new Promise(r => {
        setTimeout(() => r([{ id: 1, name: 'hello test' }]), 500);
      });
      const obj = await new Promise(r => {
        setTimeout(() => r([{ id: 2, name: 'hello obj' }]), 1000);
      });
      const foo = await new Promise(r => {
        setTimeout(() => r([{ id: 1, name: 'foo1' }, { id: 2, name: 'foo2' }]), 1000);
      });
      return { test, obj, foo };
    }
  }
};
</script>
