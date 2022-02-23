<template>
  <div>
    <el-button type="primary" @click="add">新增</el-button>
    <el-dialog
      :title="`${form.type==='add'?'新增':'编辑'}`"
      :visible.sync="dialogVisible"
      width="900px"
      @closed="closedDialog">
      {{form}}
      <el-form-schema 
        ref="efs"
        :schema="schema" 
        v-model="form" 
        :inline="false" 
        label-width="100px"
      >
        <el-form-item>
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form-schema>
    </el-dialog>
   
  </div>
</template>
<script>
export default  {
  data () {
    return {
      dialogVisible: false,
      schema: {
        id: {
          tag: 'text', 
          label: 'ID',
          vif: "$model.type === 'edit'"
        },
        a: { 
          tag: 'el-select', 
          inline: true,  
          label: '联动类型', 
          required: true,
          items: [{
            label: "条件1",
            value: 1,
          },{
            label: "条件2",
            value: 2,
          }], 
        },
        b: {
          tag: "el-input",
          label: "hello",
          required: true,
          vif: "$model.a === 1"
        },
        c: {
          tag: "el-input",
          label: "world",
          required: true,
          vif: "$model.a === 2"
        },
        d: { 
          tag: 'el-date-picker', 
          label: '日期范围',
          required: true,
          vif: "$model.a === 2"
        },
      },
      form: { 
        type: "",
      }
    }
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.form.type = "add";
    },
    closedDialog() {
      this.$refs.efs.resetFields();
      console.log('closedDialog', this.form);
    },
    submit() {
      this.$refs.efs.validate((valid, model)=>{
        console.log(valid, model);
        if (valid) {
          alert("提交");
        }
      })
    }
  }
}
</script>