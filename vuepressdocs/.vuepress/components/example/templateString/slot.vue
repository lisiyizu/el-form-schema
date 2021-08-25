<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      v-model="model"
      :inline="false"
      label-width="120px"
    ></el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        radio: {
          tag: "el-radio",
          label: "单选框",
          default: "A",
          items: ['A', 'B']
        },
        sel: {
          tag: "el-select",
          vif: "$model.radio",
          items: ["hello", 'world'],
          label: "下拉框",
          slot: { after: '说明${model.radio}' } // slot 模版字符串
        },
        span: {
          tag: "span",
          label: "span标签",
          slot: "${model.sel||'-'}"  // slot 模版字符串
        },
        obj: {
          tag: "object",
          label: "对象（object）",
          components: {
            sel: {
              tag: "el-select",
              items: ['A','B','C','D'],
              required: true,
              slot: { after: "测试：${model.radio}" },
            },
            info: {
              tag: "span",
              inline: false,
              style: { marginTop: '-10px', marginBottom: '0px', display: 'block' },
              slot: "最后修改人：${item.operator || '-'}（最后修改时间：${item.updateTime || '-'}）",
            }
          },
        },
        arr: {
          tag: "array",
          label: "数组（array）",
          type: 'card',
          title: "测试-${index}",
          labelWidthComponents: "100px",
          components: {
            sel: {
              tag: "el-select",
              items: ['A','B','C','D'],
              required: true,
              slot: { after: "测试：${model.radio}" },
            },
            info: {
              tag: "span",
              inline: false,
              style: { marginTop: '-10px', display: 'block' },
              slot: "最后修改人：${item.operator || '-'}（最后修改时间：${item.updateTime || '-'}）",
            }
          },
        },
      },
      model: {}
    };
  },
  mounted() {
    setTimeout(() => {
      Object.assign(this.model.obj, { sel: 'A', operator: '123', updateTime: '456' });
      this.model.arr.push({ sel: 'A', operator: '111', updateTime: '222' });
      this.model.arr.push({ sel: 'B', operator: '333', updateTime: '444' });
    }, 1000)
  }
};
</script>
