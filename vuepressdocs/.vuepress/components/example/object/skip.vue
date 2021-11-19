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
        obj1: {
          tag: "object",
          title: "系统设置1",
          type: "card",
          labelWidthComponents: "100px",
          inline: true,
          collapse: false,
          components: {
            sel1: { tag: "el-select", items: ['A','B'], required: true, label: "下拉1" },
            sel2: { tag: "el-select", items: ['A'], required: true, label: "下拉2" }
          }
        },
        obj2: {
          tag: "object",
          title: "系统设置2",
          type: "card",
          labelWidthComponents: "100px",
          inline: false,
          collapse: true,
          components: {
            sel3: { 
              tag: "el-select", 
              items: ['A','B'], 
              required: true, 
              inline: true, 
              label: "下拉3"
            },
            sel4: { 
              tag: "el-select", 
              items: ['A'], 
              required: true, 
              inline: true, 
              label: "下拉4" 
            },
            obj3: {
              tag: "object",
              title: "系统设置2",
              type: "card",
              labelWidthComponents: "100px",
              inline: true,
              skip: true,
              components: {
                sel5: { 
                  tag: "el-select", 
                  items: ['A','B'], 
                  required: true, 
                  label: "下拉5"
                },
                sel6: { 
                  tag: "el-select", 
                  items: ['A'], 
                  required: true, 
                  label: "下拉6" 
                }
              }
            },
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
