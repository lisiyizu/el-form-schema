<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="efs"
      :schema="schema"
      v-model="model"
      label-width="80px"
      component-width="280px"
    >
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        bi: {
          tag: "el-radio",
          label: "汇款币种",
          items: [{ label: "人民币", value: "rmb" }, { label: "美元", value: "dollar" }]
        },
        input: {
          tag: "el-input",
          label: "金额",
          slot: {
            prepend: "${model.bi === 'dollar' ? '$' : '￥'}",
            append: "${model.bi === 'dollar' ? '美元' : '人民币'}",
          }
        },
        remark: {
          tag: "span",
          slot: "${model.input}${model.bi}",
          vif: "$model.input",
          label: "备注"
        },
        label: {
          tag: "el-input",
          label: "${model.bi === 'dollar' ? '美元' : '人民币'}",
        }
      },
      model: {}
    }
  }
}
</script>