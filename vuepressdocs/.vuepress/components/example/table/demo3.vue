<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      label-width="100px"
    >
      <template slot="table.switch" slot-scope="scope">
        <el-form-item :prop="scope.prop" style="margin-bottom:2px">
          <el-switch
            v-model="scope.row.switch"
            active-color="#13ce66"
            inactive-color="#dddddd"
          ></el-switch>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        time: {
          tag: "el-date-picker",
          label: "有效期",
          props: { type: "daterange" },
          inline: true,
          required: true,
          slot: { after: "-" }
        },
        input: {
          tag: "el-time-select",
          required: true,
          inline: true
        },
        table: {
          tag: "table",
          title: "Table-表单列表",
          showIndex: true,
          minLimit: 2,
          maxLimit: 5,
          components: {
            switch: {
              tag: "slot",
              default: false,
              column: { width: "100px", label: "slot字段" },
              slot: "table.switch"
            },
            obj: {
              tag: "object",
              inline: true,
              column: { width: "410px", label: "有效期" },
              components: {
                date: {
                  tag: "el-date-picker",
                  style: { width: "180px" },
                  props: { type: "date" }
                },
                time: {
                  tag: "el-time-select",
                  style: { width: "180px" }
                }
              }
            },
            num: {
              tag: "el-input-number",
              style: { width: "180px" },
              column: { width: "200px", label: "测试5" },
              required: true
            },
            select: {
              tag: "el-select",
              style: { width: "180px" },
              column: { width: "200px", label: "测试6" },
              required: true,
              items: ["测试1", "测试2"]
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
    }
  }
};
</script>
