<template>
  <div>
    <el-button type="primary" @click="add">新增</el-button>
    <el-button type="warning" @click="edit">编辑</el-button>
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
        input: {
          tag: 'el-input', 
          label: '输入框', 
          required: true,
          props: { disabled: "$model.type !== 'add'" }  
        },
        province: { 
          tag: 'el-select', 
          inline: true,  
          label: '联动类型', 
          items: ["A"], 
          required: true,
          props: { disabled: "$model.type !== 'add'", clearable: true  },
          slot: { after: ' ' } 
        },
        city: { 
          tag: 'el-select', 
          inline: true, 
          items: ["B", "O", "P"], 
          slot: { after: ' ' },
          required: true,
          default: "O",
          props: { disabled: "$model.type !== 'add'  || !$model.province", clearable: true }  
        },
        county: { 
          tag: 'el-select', 
          inline: true, 
          items: ["C"],
          required: true,
          props: { disabled: "$model.type !== 'add' || !$model.city" }  
        },
        daterange: { 
          tag: 'el-date-picker', 
          label: '日期范围',
          required: true,
        },
      },
      form: { 
        type: "",
        input: "hello",
        // province: "A",
        // city: "B",
        // county: "C",
        // daterange: "2020-02-08"
      }
    }
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.form.type = "add";
      this.$nextTick(()=> {
        this.form.city = "P";
      })
      Object.assign(this.form, {
        // input: "world",
        province: "A",
        county: "C",
        daterange: "2020-09-10"
      })
      
    },
    edit() {
      this.dialogVisible = true;
      this.form.type = "edit";
      Object.assign(this.form, {
        id: 1,
        input: "hello world!",
        province: "A",
        city: "B",
        county: "C",
        daterange: "2020-09-10"
      })
    },
    closedDialog() {
      this.$refs.efs.resetFields();
      console.log('closedDialog', this.form);
    },
    submit() {
      this.$refs.efs.validate((valid)=>{
        if (valid) {
          alert("提交");
        }
      })
    }
  }
}
</script>