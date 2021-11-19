<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      label-width="120px"
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
        arr: {
          tag: "array",
          label: "数组",
          inline: true,
          addRowExt: { id: "", disabled: true },
          components: {
            sel: {
              tag: "el-select",
              required: true,
              props: { disabled: "$item.disabled" },
              items: [
                { label: "必填", value: true },
                { label: "非必填", value: false }
              ]
            },
            input: {
              tag: "el-input",
              required: '$item.sel',
              props: { disabled: "$item.disabled" },
            },
            action: {
              tag: "action",
              column: { width: "180px", label: "操作" },
              buttons: [{
                tag: "el-button",
                text: "编辑",
                if: "scope.row.disabled",
                props:  { icon: "el-icon-edit" },
                onClick: (scope) => {
                  scope.row.disabled = false
                }
              },{
                tag: "el-button",
                text: "保存",
                if: "!scope.row.disabled",
                props:  { icon: "el-icon-edit", type: "primary" },
                onClick: (scope) => {
                  scope.row.disabled = true
                }
              }, {
                tag: "el-button",
                disabled: "!scope.row.disabled",
                props: { icon: "el-icon-delete", type: "danger", circle: true },
                onClick: (scope) => {
                  scope.$delRow();
                }
              }, {
                tag: "el-button",
                disabled: "!scope.row.disabled",
                props: { icon: "el-icon-plus", circle: true },
                onClick: (scope) => {
                  scope.$addRow();
                }
              }]
            }
          }
        }
      },
      model: {}
    };
  },
  methods: {
    deleteArrItem({ get, prop, keys, row, index }) {
      get(prop).splice(index, 1);
    },
    addArrItem({ get, prop, keys, row, index }) {
      // el-form-schema 是内部扩展支持的自定义方法
      this.$refs["el-form-schema"].validateFieldPromise(`${prop}[${index}]`).then(valid => {
        if(valid)  get(prop).push(keys);
      });
    },
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
