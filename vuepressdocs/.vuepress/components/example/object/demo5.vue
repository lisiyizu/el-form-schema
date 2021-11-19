<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      component-width="200px"
    >
      <template slot="hello" slot-scope="scope" >
        <el-form-item :prop="scope.prop" label="测试" label-width="100px" :rules="{ required: true, message: '必填' }" >
          <el-input v-model="scope.row.sel1" placeholder="测试" style="width:200px" />
        </el-form-item>
      </template>
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
          type: "divider",
          labelWidthComponents: "100px",
          inline: true,
          components: {
            sel1: { tag: "slot", slot: 'hello' },
            sel2: { tag: "el-select", items: ['A'], required: true, inlineBlock: true,  label: "输入框" },
            sel3: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel4: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
          }
        },
        systemSetting2: {
          tag: "object",
          title: "系统设置",
          type: "divider",
          labelWidthComponents: "100px",
          inline: false,
          endDivider: true,
          components: {
            sel1: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel2: { tag: "el-select", items: ['A'], required: true, inlineBlock: true,  label: "输入框" },
            sel3: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
            sel4: { tag: "el-select", items: ['A'], required: true, label: "输入框" },
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
