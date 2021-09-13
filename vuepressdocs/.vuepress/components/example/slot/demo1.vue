<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      :schema="schema"
      ref="efs"
      v-model="model"
      label-width="150px"
    >
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form-schema>
  </div>
</template>
<script>
import { Input, Switch } from "element-ui";
export default {
  data() {
    return {
      schema: {},
      model: {},
      cascaderOptions: []
    };
  },
  methods: {
    initForm() {
      this.schema = {
        radio: {
          tag: 'el-radio',
          required: true,
          default: true,
          items: [{ label: "必填", value: true }, { label: "非必填", value: false }]
        },
        input1: {
          tag: 'el-input',
          rules: { required: "$model.radio", message: "必填项哦！" },
          props: { placeholder: "我是el-input-num" }
        },
        input2: {
          tag: "el-input",
          required: true,
          props: { placeholder: "自定义组件", disabled: "!$model.sel" },
          slot: {
            prepend: {
              tag: 'el-select',
              vmodel: "sel",
              style: { width: "90px" },
              props: { placeholder: "请选择" },
              items: [{ label: "是", value: true }, { label: "否", value: false }]
            }
          }
        },
        cascader: {
          tag: "el-cascader",
          required: true,
          props: {
            props: {
              label: "label",
              value: "value"
            },
            options: []
          }
        },
        timeselect: {
          tag: "el-time-select"
        },
        obj: {
          tag: "object",
          inline: true,
          required: true,
          label: "测试",
          labelTip: '123',
          components: {
            input: { tag: "el-input", required: true },
            timeselect: { tag: "el-date-picker", required: true }
          }
        },
        switch: { tag: Switch, default: false }
      };
    },
    arrayData(num) {
      return new Array(num)
        .fill({})
        .map((item, index) => ({ label: `测试-${index}`, value: index + 1 }));
    },
    submit() {
      this.$refs.efs.validate(valid => {
        alert(valid);
      });
    },
    reset() {
      this.$refs.efs.resetFields();
    }
  },
  mounted() {
    this.initForm();
    setTimeout(() => {
      this.schema.cascader.props.options = [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ];
    }, 3000);
  }
};
</script>
