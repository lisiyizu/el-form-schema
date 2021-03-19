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
      <template slot="test" slot-scope="scope" v-if="scope.index === model.arr.length - 1">
        <el-form-item label="">
          <el-button @click="deleteArrItem(scope)">删除</el-button>
          <el-button type="primary" @click="addArrItem(scope)">新增</el-button>
        </el-form-item>
      </template>
    </el-form-schema>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        radio1: {
          tag: "el-radio",
          required: true,
          label: "数组是否必填",
          items: [
            { label: "必填", value: true },
            { label: "非必填", value: false }
          ]
        },
        input: {
          tag: 'el-input',
          label: '输入框'
        },
        arr: {
          tag: "array",
          inline: true,
          label: "数组",
          required: '$model.radio1 && $model.input',
          operator: {
            tag: 'slot',
            slot: 'test'
          },
          components: {
            radio: {
              tag: "el-radio",
              required: true,
              items: [
                { label: "必填", value: true },
                { label: "非必填", value: false }
              ]
            },
            input: {
              tag: "el-input",
              required: '$item.radio'
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
