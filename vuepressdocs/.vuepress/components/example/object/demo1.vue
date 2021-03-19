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
        date: {
          tag: "el-date-picker",
          required: true,
          label: "日期",
          inline: true,
          props: { type: "daterange" },
          slot: { after: "-" }
        },
        time: {
          tag: "el-time-select",
          inline: true
        },
        obj: {
          tag: "object",
          inline: true,
          label: "对象",
          required: true,
          components: {
            input: { tag: "el-input", required: true },
            radio: { tag: "el-radio", items: this.arrayData(4) }
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
