<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      :api-config="getApiConfig"
      v-model="model"
      label-width="100px"
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
        cargoInformation: {
          tag: "object",
          title: "运输信息",
          type: "card",
          inline: false,
          components: {
            loading: {
              tag: "object",
              title: "装货信息",
              type: "card",
              labelWidthComponents: "140px",
              inline: true,
              components: {
                shipUnit: {
                  tag: "el-input",
                  label: "测试1",
                  required: true,
                  props: { clearable: false }
                },
                shipContacts: {
                  tag: "el-input",
                  label: "测试2",
                  required: true,
                  props: { clearable: false },
                },
                shipContactPhone: {
                  tag: "el-input",
                  label: "测试3",
                  props: { clearable: false },
                },
                areaCascade: {
                  tag: "el-select",
                  label: "测试4",
                  style: { width: "510px" },
                  rules: [{ required: true, message: "请选择居住区域", trigger: "change" }],
                },
                shipSpecificAddress: {
                  tag: "el-input",
                  label: "测试5",
                  style: { width: "510px" },
                  rules: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
                },
                submit: {
                  tag: "el-button",
                  label: " ",
                  slot: "保存至常用发货地址",
                  style: { width: "140px" },
                  on: {
                    click: () => {},
                  },
                },
              },
            },
            dischargeList: {
              tag: "array",
              title: "卸货信息",
              type: "card",
              labelWidthComponents: "140px",
              minLimit: 1,
              required: true,
              inline: true,
              slot: {
                add: "增加子订单",
                delete: "删除",
              },
              components: {
                receiptUnit: {
                  tag: "el-input",
                  label: "测试1",
                  required: true,
                  props: { clearable: false }
                },
                receiptContacts: {
                  tag: "el-input",
                  label: "测试2",
                  required: true,
                  props: { clearable: false }
                },
                receiptContactPhone: {
                  tag: "el-input",
                  label: "测试3",
                  required: true,
                  props: { clearable: false },
                },
                areaCascade: {
                  tag: "el-select",
                  label: "测试4",
                  style: { width: "510px" },
                  rules: [{ required: true, message: "请选择居住区域", trigger: "change" }],
                },
                receiptSpecificAddress: {
                  tag: "el-input",
                  label: "测试5",
                  style: { width: "510px" },
                  rules: [{ required: true, message: "请输入详细地址", trigger: "blur" }],
                },
                requireReceiptTime: {
                  tag: "el-date-picker",
                  label: "测试6",
                  props: { type: "datetime" },
                },
              },
            },
            cargoList: {
              tag: "object",
              title: "货物信息",
              type: "card",
              labelWidthComponents: "140px",
              inline: false,
              components: {
                totalVolume: {
                  tag: "el-input",
                  label: "测试1",
                  inline: true,
                  required: true,
                },
                totalWeight: {
                  tag: "el-input",
                  label: "测试2",
                  inline: true,
                  required: true,
                },
                totalNumber: {
                  tag: "el-input",
                  label: "测试3",
                  inline: true,
                },
                cargoTypeCode: {
                  tag: "el-select",
                  label: "货物类型",
                  items: "$config.cargoTypes",
                  keys: { label: "name", value: "id" },
                  inline: true,
                },
                cargoInfo: {
                  tag: "table",
                  showIndex: true,
                  labelWidthComponents: "5px",
                  minLimit: 1,
                  style: { width: "100%" },
                  on: {
                    delete: (scope, cb) => {
                      console.log(scope);
                      cb(true);
                    },
                  },
                  components: {
                    cargoTypeCode: {
                      tag: "el-select",
                      style: { width: "100%" },
                      column: { minWidth: "140px", label: "货物类型" },
                      items: "$config.cargoTypes",
                      keys: { label: "name", value: "id" },
                      required: true,
                    },
                    number: {
                      tag: "el-input",
                      style: { width: "100%" },
                      column: { minWidth: "140px", label: "件数" },
                    },
                    volume: {
                      tag: "el-input",
                      style: { width: "100%" },
                      column: { minWidth: "140px", label: "体积（m3）" },
                    },
                    weight: {
                      tag: "el-input",
                      style: { width: "100%" },
                      column: { minWidth: "140px", label: "重量(吨)" },
                    },
                    remark: {
                      tag: "el-input",
                      style: { width: "100%" },
                      column: { minWidth: "200px", label: "备注" },
                    },
                  },
                },
              },
            },
          },
        },
        basicInfo: {
          tag: "object",
          title: "基础信息",
          type: "card",
          labelWidthComponents: "140px",
          inline: true,
          components: {
            cargoOwnerId: {
              tag: "el-select",
              label: "测试1",
              required: true,
              items: ["A", "B", "C"]
            },
            bill: {
              tag: "el-select",
              label: "测试2"
            },
            paperReceipt: {
              tag: "el-select",
              label: "测试3"
            },
            transportRequirements: {
              tag: "el-input",
              label: "测试4",
            },
            remark: {
              tag: "el-input",
              label: "备注",
            },
          },
        },
        carAndDriver: {
          tag: "object",
          title: "车辆类型/司机",
          type: "card",
          labelWidthComponents: "140px",
          inline: true,
          components: {
            carType: {
              tag: "el-select",
              label: "测试1"
            },
            driverId: {
              tag: "el-select",
              label: "测试2",
            },
            electronicContract: {
              tag: "el-switch",
              label: "测试3《电子合同》",
              labelWidth: "238px",
              default: true,
              inlineBlock: true,
            },
          },
        },
        fare: {
          tag: "object",
          title: "订单费用",
          type: "card",
          labelWidthComponents: "140px",
          inline: true,
          components: {
            fareCode: {
              tag: "text",
              label: "测试1",
              default: "总托运费",
            },
            univalent: {
              tag: "el-input",
              label: "测试2(元)",
              required: true,
            },
            remark: {
              tag: "el-input",
              label: "测试3",
            },
            totalFare: {
              label: "测试4",
              tag: "text",
              default: "0",
            },
          },
        },
        insuranceObj: {
          tag: "object",
          title: "运输保障服务",
          type: "card",
          class: "insuranceObj",
          labelWidthComponents: "140px",
          inline: true,
          components: {
            insuranceSwitch: {
              tag: "el-switch",
              label: "测试1",
              default: true,
              inlineBlock: true,
            },
            insuranceAmount: {
              tag: "el-input",
              vif: "$item.insuranceSwitch",
              label: "测试2",
            },
            insuranceProportion: {
              tag: "el-input",
              vif: "$item.insuranceSwitch",
              label: "测试3",
            },
            insuranceFare: {
              tag: "el-input",
              vif: "$item.insuranceSwitch",
              label: "测试4(元)",
            },
            insuranceCompany: {
              tag: "el-input",
              label: "测试5",
              vif: "$item.insuranceSwitch",
              inlineBlock: true,
            },
          },
        },
      },
      model: {}
    };
  },
  methods: {
    async getApiConfig() {
      const cargoTypes = await new Promise(r => {
        setTimeout(() => r([{ id: 1, name: '测试测试' }]), 1000);
      });
      return { cargoTypes };
    },
    arrayData(num) {
      return new Array(num).fill({}).map((item, index) => ({
        label: `测试-${index + 1}`,
        value: index + 1
      }));
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
