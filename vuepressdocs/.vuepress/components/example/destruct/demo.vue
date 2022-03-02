<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="false"
      ref="efs"
      label-width="120px"
      :api-config="getApiConfig"
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
          label: "日期时间范围",
          props: { type: "datetimerange" },
          destruct: ["startDate", "endDate"],
          required: true
        },
        obj: {
          tag: "object",
          label: "对象",
          inline: true,
          labelWidthComponents: '60px',
          components: {
            input: { tag: "el-input", inline: true, required: true },
            date: { 
              tag: "el-date-picker", 
              inline: true,  
              props: { type: "datetimerange" },
              required: true,
              destruct: ["startDate", "endDate"],
            },
          }
        },
        arr: {
          tag: "array",
          label: "对象",
          inline: true,
          labelWidthComponents: '60px',
          components: {
            input: { tag: "el-input", inline: true, required: true },
            date: { 
              tag: "el-date-picker", 
              inline: true,  
              props: { type: "datetimerange" },
              required: true,
              destructField: ["startDate", "endDate"],
            },
          }
        },
      },
      model: {
        date: [ "2022-03-01 00:00:00", "2022-03-11 23:59:59" ],
        obj: {
          input: "123",
          date: [ "2022-03-01 00:00:00", "2022-03-11 23:59:59" ],
        },
        arr: [{
          input: "123",
          date: [ "2022-03-01 00:00:00", "2022-03-11 23:59:59" ],
        }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.efs.validate(async(valid, model) => {
        console.log(valid, model);
      });
    },
    reset() {
      this.$refs.efs.resetFields();
    }
  }
};
</script>
