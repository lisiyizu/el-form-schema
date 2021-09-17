<template>
  <div>
    <el-button type="primary" @click="showDialog">新增</el-button>
    <el-dialog
      title="测试"
      :visible.sync="dialogVisible"
      >
      {{efsForm}}
      <el-form-schema :schema="efsSchema" v-model="efsForm">
      </el-form-schema>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialogVisible: false,
    efsSchema: {
      type: {
        tag: "el-radio",
        // label: "测试",
        items: [{label: "类型1", value:1}, {label: "类型2", value:2}]
      },
      obj1: {
        tag: "object",
        type: "card",
        title: "测试1",
        vif: "$model.type === 1",
        labelWidthComponents: "70px",
        inline: true,
        components: {
          num: {
            tag: "el-input-number",
            label: "数量1",
            props: { min: 40 }
          },
          input: {
            tag: "el-input",
            label: "输入框"
          }
        }
      },
      obj2: {
        tag: "object",
        type: "card",
        title: "测试2",
        vif: "$model.type === 2",
        labelWidthComponents: "100px",
        components: {
          num: {
            tag: "el-input-number",
            label: "数量2",
            default: 10,
          },
          input: {
            tag: "el-input",
            label: "输入框"
          }
        }
      }
    },
    efsForm: {}
  }),
  methods: {
    showDialog() {
      this.dialogVisible =  true;
    },
    closeDialog() {
      this.$refs.efs
    }
  }
}
</script>