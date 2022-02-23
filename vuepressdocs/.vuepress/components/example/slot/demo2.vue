<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      v-model="model"
      ref="el-form-schema"
      :debug="false"
      type="card"
      label-suffix=":"
      :inline="false"
      :schema="schema"
      label-width="150px"
    >
      <template slot="test" slot-scope="scope">
        <el-form-item
          :prop="scope.prop"
          :rules="{ required: true, message: '必填!' }"
        >
          <el-input
            style="width: 260px"
            v-model.trim="scope.row.slotTest"
            placeholder="slotTest测试"
          >
          </el-input>
        </el-form-item>
      </template>
      <template slot="slot.a" slot-scope="scope">
        <el-form-item
          label="hello slot.a"
          :prop="scope.prop"
          :rules="{ required: true, message: '必填!' }"
        >
          <el-input
            style="width: 120px;"
            v-model.trim="scope.row.slotA"
            placeholder="slotTest测试"
          >
          </el-input>
        </el-form-item>
      </template>
      <template slot="slot.b" slot-scope="scope">
        <el-form-item
          label="hello slot.b"
          :prop="scope.prop"
          :rules="{ required: true, message: '必填!' }"
        >
          <el-input
            style="width: 120px;"
            v-model.trim="scope.row.slotB"
            placeholder="slotTest测试"
          >
          </el-input>
        </el-form-item>
      </template>
      <template slot="slot.c" slot-scope="scope">
        <el-form-item
          label="hello slot.c"
          :prop="scope.prop"
          :rules="{ required: true, message: '必填!' }"
        >
          <el-input
            style="width: 120px;"
            v-model.trim="scope.row.slotC"
            placeholder="slotTest测试"
          >
          </el-input>
        </el-form-item>
      </template>
      <template slot="helloworld" slot-scope="scope">
        <el-form-item
          :prop="scope.prop"
          :rules="{ required: true, message: '必填!' }"
        >
          <el-input
            style="width: 260px"
            v-model="scope.row.helloworld"
            placeholder="helloworld测试"
          />
        </el-form-item>
      </template>
      <template slot="arr.operator" slot-scope="scope">
        <el-form-item label="">
          <el-button :disabled="scope.delDisabled" @click="deleteArrItem(scope)"
            >删除-slot</el-button
          >
          <el-button
            type="primary"
            :disabled="scope.addDisabled"
            @click="addArrItem(scope)"
            >新增-slot</el-button
          >
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form-schema>
  </div>
</template>
<script>
const cascaderOptions = [
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
      }
    ]
  }
];

export default {
  data() {
    return {
      model: {},
      schema: {
        card1: { tag: "card", title: "基础组件" },
        input: {
          tag: "el-input",
          label: "输入框",
          props: { prefixIcon: "el-icon-search" },
          slot: { append: "测试" }
        },
        obj110: {
          tag: "object",
          label: "对象测试-obj",
          inline: true,
          components: {
            input: {
              tag: "el-input",
              required: true,
              slot: { prepend: "测试" }
            },
            date: {
              tag: "el-date-picker",
              props: { type: "date" },
              required: true
            },
            radio: { tag: "el-radio", required: true, items: this.arrayData(2) }
          }
        },
        input1: {
          tag: "el-input",
          label: "单行组合",
          slot: { after: "-" },
          inline: true,
          required: true
        },
        input3: {
          tag: "el-input",
          inline: true,
          slot: { append: "123" },
          required: true
        },
        // input4: {
        //   tag: "el-input-number",
        //   label: "计数器",
        //   props: { min: 1, max: 100 },
        //   // tip: "测试123123"
        // },
        input5: {
          tag: "el-input",
          label: "input + select",
          required: true,
          slot: {
            after: "测试",
            prepend: {
              tag: "el-select",
              default: 1,
              style: { width: "100px" },
              vmodel: "test",
              items: []
            }
          }
        },
        radio1: {
          tag: "el-radio",
          label: "测试",
          inline: true,
          slot: { after: " " },
          required: true,
          items: ["测试1", "测试2"]
        },
        select2: {
          tag: "el-select",
          label: "测试",
          inline: true,
          required: true,
          slot: { after: " " },
          items: ["测试1", "测试2"]
        },
        checkbox3: {
          tag: "el-checkbox",
          label: "测试",
          inline: true,
          isLastInline: true,
          required: true,
          items: ["测试1", "测试2"]
        },
        date: { tag: "el-date-picker", label: "日期", props: { type: "date" } },
        daterange: {
          tag: "el-date-picker",
          label: "日期区间",
          required: true,
          props: { type: "daterange" }
        },
        select: {
          tag: "el-select",
          label: "下拉单选",
          keys: { label: "name", value: "id" },
          items: [
            { id: 1, name: "测试1" },
            { id: 2, name: "测试2" }
          ]
        },
        multiselect: {
          tag: "el-select",
          label: "下拉多选",
          props: { multiple: true },
          keys: { label: "name", value: "id" },
          items: [
            { id: 1, name: "测试1" },
            { id: 2, name: "测试2" }
          ]
        },
        cascader: {
          tag: "el-cascader",
          label: "级联选择器",
          props: { options: cascaderOptions }
        },
        switch: { tag: "el-switch", label: "开关" },
        ainput: { tag: "el-input", label: "11" },
        card2: { tag: "card", title: "复杂组件" },
        table: {
          tag: "table",
          label: "列表测试-table",
          minLimit: 3,
          maxLimit: 8,
          showIndex: true,
          props: { showHeader: false },
          operator: { props: { fixed: "right" } },
          components: {
            input: {
              tag: "el-input",
              column: { width: "180px", align: "right", label: "测试1" },
              style: { width: "100" },
              required: true
            },
            switch: {
              tag: "el-switch",
              column: { width: "80px", align: "right", label: "测试2" },
              style: { width: "100" }
            },
            obj: {
              tag: "object",
              inline: true,
              column: { width: "520px", label: "测试3" },
              components: {
                date: {
                  tag: "el-date-picker",
                  props: { type: "date" },
                  style: { width: "100" },
                  required: true,
                  slot: { after: "-" }
                },
                select: {
                  tag: "el-select",
                  required: true,
                  style: { width: "100" },
                  items: ["测试1", "测试2"]
                }
              }
            },
            select1: {
              tag: "el-select",
              column: { width: "180px", label: "测试4" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            },
            select2: {
              tag: "el-select",
              column: { width: "160px", label: "测试5" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            },
            select3: {
              tag: "el-select",
              column: { width: "160px", label: "测试6" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            }
          }
        },
        table2: {
          tag: "table",
          label: "列表测试-table",
          operator: { props: { fixed: "right" } },
          components: {
            input: {
              tag: "el-input",
              column: { label: "测试1" },
              style: { width: "100" },
              required: true
            },
            switch: {
              tag: "el-switch",
              column: { width: "80px", align: "right", label: "测试2" },
              style: { width: "100" }
            },
            select1: {
              tag: "el-select",
              column: { label: "测试3" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            },
            select2: {
              tag: "el-select",
              column: { label: "测试4" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            },
            select3: {
              tag: "el-select",
              column: { label: "测试5" },
              style: { width: "100" },
              required: true,
              items: ["测试1", "测试2"]
            }
          }
        },
        obj: {
          tag: "object",
          label: "对象测试-obj",
          title: "测试",
          labelWidthComponents: "100px",
          type: "fieldset",
          components: {
            input: {
              tag: "el-input",
              inline: true,
              label: "123",
              slot: { prepend: "测试" }
            },
            date: {
              tag: "el-date-picker",
              label: "123",
              inline: true,
              props: { type: "date" },
              required: true
            },
            select: {
              tag: "el-select",
              label: "123",
              inline: true,
              items: this.arrayData(2)
            },
            radio: {
              tag: "el-radio",
              required: true,
              inline: true,
              items: this.arrayData(2)
            },
            slotTest: { 
              tag: "slot", 
              slot: "test", 
              inline: true 
            },
            checkbox: {
              tag: "el-checkbox",
              required: true,
              inline: true,
              items: this.arrayData(2)
            },
            arr: {
              tag: "array",
              label: "数组测试-arr",
              inline: true,
              labelWidthComponents: "100px",
              minLimit: 1,
              maxLimit: 3,
              operator: { slot: "arr.operator" },
              components: {
                select: {
                  tag: "el-select",
                  required: true,
                  items: this.arrayData(2)
                }
              }
            }
          }
        },
        arr: {
          tag: "array",
          label: "数组测试-arr",
          title: "方案$index",
          labelWidthComponents: "120px",
          slot: { add: "新增测试", delete: "删除测试" },
          type: "card",
          minLimit: 1,
          maxLimit: 3,
          components: {
            slotA: {
              tag: 'slot',
              slot: 'slot.a',
              inline: true
            },
            slotB: {
              tag: 'slot',
              slot: 'slot.b', 
              inline: true
            },
            slotC: {
              tag: 'slot',
              slot: 'slot.c',
              inline: true
            },
            input1: { 
              tag: "el-input", 
              label: "测试input1",
              inline: true
            },
            input2: { 
              tag: "el-input", 
              label: "测试input2", 
              inline: true
            },
            obj2: {
              tag: "object",
              label: "对象测试-obj2",
              inline: true,
              components: {
                input: { tag: "el-input", slot: { prepend: "测试" } }
              }
            },
            f: {
              tag: "el-checkbox",
              label: "下拉框",
              required: true,
              inline: true,
              items: this.arrayData(3)
            },
            arr2: {
              tag: "array",
              inline: true,
              minLimit: 1,
              maxLimit: 3,
              slot: { add: "新增测试", delete: "删除测试" },
              components: {
                radio: {
                  tag: "el-select",
                  required: true,
                  style: { width: "100px" },
                  items: this.arrayData(3)
                },
                input: {
                  tag: "el-input",
                  style: { width: "100px" },
                  required: true
                }
              }
            },
            g: {
              tag: "el-checkbox",
              label: "下拉框",
              required: true,
              items: this.arrayData(3)
            }
          }
        }
      }
    };
  },
  methods: {
    deleteArrItem({ get, prop, keys, row, index }) {
      console.log(prop, keys, row, index);
      get(prop).splice(index, 1);
    },
    addArrItem({ get, prop, keys, row, index }) {
      console.log(prop, keys, row, index);
      this.$refs["el-form-schema"].validateFieldPromise(`${prop}[${index}]`).then(valid => {
        if(valid)  get(prop).push(keys);
      });
    },
    arrayData(count) {
      return Array(count)
        .fill({})
        .map((item, index) => ({
          label: `测试-${index + 1}`,
          value: index + 1
        }));
    },
    submit() {
      this.$refs["el-form-schema"].validate(val => {
        if (val) {
          this.$message.success("提交完毕!");
        } else {
          this.$message.warning("请先完成必填项~");
        }
      });
    },
    reset() {
      this.$refs["el-form-schema"].resetFields();
      Object.assign(this.model, {});
    }
  },
  mounted() {
    setTimeout(() => {
      this.schema.input5.slot.prepend.items = this.arrayData(5);
    }, 2000);
  }
};
</script>
