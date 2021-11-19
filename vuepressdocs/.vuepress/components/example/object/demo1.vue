<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="efs"
      :schema="schema"
      v-model="model"
      label-width="100px"
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
        date: {
          tag: "el-date-picker",
          required: true,
          label: "日期",
          inline: true,
          props: { type: "daterange" },
          slot: { after: "-" }
        },
        time: {
          tag: "el-time-select",
          inline: true
        },
        obj1: {
          tag: "object",
          label: "对象",
          required: true,
          type: 'card',
          title: "测试",
          labelWidthComponents: '60px',
          components: {
            input: { tag: "el-input", label: "测试", inline: true, required: true, slot: { after: ' ' } },
            radio: { tag: "el-radio", inline: true, items: this.arrayData(4) },
            table: {
              tag: 'table',
              labelWidthComponents: '0px',
              components: {
                input: { tag: "el-input", column: { label: 'input列', width: '300px' }, required: true },
                radio: { tag: "el-radio", column: { label: 'radio列' }, items: this.arrayData(4) }
              }
            }
          }
        },
        o1: {
          tag: "object",
          label: "o1对象",
          type: 'card',
          title: "测试1",
          labelWidthComponents: '60px',
          collapse: true,
          components: {
            o2: {
              tag: "object",
              label: "o2对象",
              type: 'card',
              title: "测试2",
              labelWidthComponents: '60px',
              collapse: true,
              components: {
                arr: {
                  tag: 'array',
                  label: "数组",
                  inline: true,
                  required: true,
                  components: {
                    input: { 
                      tag: "el-input"
                    },
                    time: {
                      tag: "el-time-select",
                      inline: true,
                      required: true,
                    },
                  }
                }
              }
            }
          }
        }
      },
      model: {}
    };
  },
  mounted() {
    this.$nextTick(()=> {
      this.model.o1.o2.arr = [{ input:  "111", time: "21:15" }, { input:  "222", time: "10:30" }];
    })
  },
  methods: {
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
  }
};
</script>
