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
          required: true,
          label: "选择1111",
          items: ['A', 'B']
        },
        arr1: {
          tag: "array",
          label: "数组",
          title: "测试-$index",
          required: true,
          type: "card",
          labelWidthComponents: "100px",
          slot: {
            add: "Add",
            delete: "Delete"
          },
          addRowExt: {
            disabled: false,
            id: "",
          },
          on: {
            delete(scope) {
              console.log(scope);
              scope.row.disabled = true;
            }
          },
          components: {
            radio1: {
              tag: "el-radio",
              required: true,
              label: "是否必填",
              items: [
                { label: "显示", value: true },
                { label: "隐藏", value: false }
              ]
            },
            input: {
              tag: "el-input",
              label: "输入框",
              required: "$item.radio1",
              props: { disabled: "$item.disabled" },
            },
            arr2: {
              tag: "array",
              inline: true,
              components: {
                radio2: {
                  tag: "el-radio",
                  items: [
                    { label: "显示(下拉框)", value: true },
                    { label: "隐藏(下拉框)", value: false }
                  ]
                },
                select: {
                  tag: "el-select",
                  items: ["A", "B", "C"],
                  required: true,
                  vif: "arr1_$index === 0 && $item.radio2"
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
    }
  }
};
</script>
