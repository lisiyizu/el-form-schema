<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      label-width="100px"
    >
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        table: {
          tag: "table",
          title: "自定义表格操作",
          addRowExt: { id: "", disabled: false },
          components: {
            input: {
              tag: "el-input",
              style: { width: "150px" },
              props: { disabled: "$item.disabled" },
              column: { width: "180px", label: "测试1" },
              required: true
            },
            select1: {
              tag: "el-select",
              style: { width: "150px" },
              props: { disabled: "$item.disabled" },
              column: { width: "180px", label: "测试4" },
              required: true,
              items: ["测试1", "测试2"]
            },
            checkbox: {
              tag: "el-checkbox",
              column: { label: "测试5" },
              required: true,
              items: ["a", "b", "c"],
              props: { disabled: "$item.disabled" },
            },
            select3: {
              tag: "el-select",
              style: { width: "150px" },
              column: { width: "", label: "测试6" },
              required: true,
              items: ["测试1", "测试2"],
               props: { disabled: "$item.disabled" },
            },
            action: {
              tag: "action",
              column: { width: "180px", label: "操作" },
              buttons: [{
                tag: "el-button",
                text: "编辑",
                if: "!scope.row.disabled",
                props:  { icon: "el-icon-edit" },
                onClick: (scope) => {
                  scope.row.disabled = true
                }
              },{
                tag: "el-button",
                text: "保存",
                if: "scope.row.disabled",
                props:  { icon: "el-icon-edit", type: "primary" },
                onClick: (scope) => {
                  setTimeout(() => {
                    scope.row.disabled = false
                    scope.$addRow();
                  }, 3000);
                }
              }, {
                tag: "el-button",
                text: "删除",
                disabled: "!scope.row.disabled",
                props:  { icon: "el-icon-delete", type: "danger" },
                onClick: (scope) => {
                  console.log(scope);
                  scope.$delRow();
                }
              }]
            }
          }
        }
      },
      model: {}
    };
  }
};
</script>
