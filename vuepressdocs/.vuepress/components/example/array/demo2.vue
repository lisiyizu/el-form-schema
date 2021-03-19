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
        input: {
          tag: "el-input",
          required: true,
          label: "输入框"
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
              items: [
                { label: "必填", value: true },
                { label: "非必填", value: false }
              ]
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
                  items: ["蛋壳公寓", "原油宝", "优胜教育"]
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
