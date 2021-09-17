<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      label-width="150px"
    >
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        sel: {
          tag: 'el-select',
          label: "下拉框",
          items: []
        },
        radio: {
          tag: 'el-radio',
          label: "单选框",
          items: []
        },
        checkbox: {
          tag: 'el-checkbox',
          label: "复选框",
          items: []
        },
      },
      model: {}
    };
  },
  mounted() {
    setTimeout(() => {
      // 第一种赋值
      this.schema.sel.items = [{ 
        label:"测试", 
        value: 1 
      }];
      // 第二种赋值：对象数组
      this.schema.radio.items = [
        "A", 
        "B", 
        "C"
      ];
      // 第三种赋值：字符串数组
      this.schema.checkbox.items = {
         0: "测试1", 
         1: '测试2' 
      };
    }, 3000);
  }
};
</script>
