import { Component } from "../index";
import CardComponent from "../card";
import { createElementBySlot, deepClone, evalTemplateString } from "../utils";

export default function(createElement, value, data) {
  // eslint-disable-next-line no-unused-vars
  const { formValues, model } = this;
  const listValues = eval(`formValues.${data.name}`);
  data.slot = data.slot || {};
  data.operator =  data.operator || {};
  data.style = data.style || { marginBottom: listValues.length ? '0x' : '' }; 
  if(!data.type && listValues.length) {
    data.style.marginBottom = "0px";
  } else {
    data.style.marginBottom = '';
  }
  if (listValues && listValues.length) {
    const componentCount = Object.keys(data.components).length;
    data.list = listValues.map((item, index) => {
      return Object.keys(data.components).map((key, kIndex) => {
        data.components[key].labelWidth = data.labelWidthComponents || "0px";
        data.components[key].$index = index;
        data.components[key].$isLast = componentCount === kIndex + 1;
        data.components[key].$item = item;
        const componentDataCopy = deepClone(data.components[key]);
        return Component(
          createElement,
          this,
          // 这里一定要用 [${index}] ( 原因：eval('data.0.name') 会报错）
          `${data.name}[${index}].${key}`,
          componentDataCopy
        );
      });
    });
  } else if (!data.default) {
    data.list = [];
  }

  // 数组最小限制
  if (data.minLimit > 0 && listValues.length === 0) {
    for (let i = 1; i <= data.minLimit; i++) {
      eval(
        `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
      );
    }
  }

  // 删除按钮
  const deleteButton = item => {
    return [
      createElement(
        "el-button",
        {
          style: {
            marginRight: !data.inline ? "10px" : "",
            marginLeft: data.inline ? "10px" : ""
          },
          props: {
            icon: "el-icon-delete-solid",
            disabled: listValues.length === data.minLimit
          },
          on: {
            click: () => {
              const arrIndex = data.list.findIndex(m => m === item);
              eval(`(formValues.${data.name}).splice(${arrIndex}, 1)`);
            }
          }
        },
        typeof data.slot.delete === "string" ? data.slot.delete : "删除"
      )
    ];
  };

  // 新增按钮
  const addButton = () => {
    return [
      createElement(
        "el-button",
        {
          props: {
            type: "primary",
            icon: "el-icon-plus",
            disabled: listValues.length === data.maxLimit
          },
          style: {
            marginLeft: data.list.length === 0 || !data.inline ? "0px" : "20px"
          },
          on: {
            click: () => {
              eval(
                `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
              );
            }
          }
        },
        typeof data.slot.add === "string" ? data.slot.add : "新增"
      )
    ];
  };
  
  const createComponent = (component, type, index) => {
    return (component.tag && component.tag === "slot") || (component.slot && type === 'operator')
      ? this.$scopedSlots[component.slot]({
          delDisabled: listValues.length === data.minLimit,
          addDisabled: listValues.length === data.maxLimit,
          keys: JSON.parse(JSON.stringify(data.keys)),
          prop: data.name,
          row: listValues[index],
          index: index,
          get (prop) {
            return eval(`formValues.${prop}`)
          }
        })
      : [
          createElement(
            component.tag,
            {
              props: component.props,
              style: component.style,
              class: component.class,
              on: {
                click: () => {
                  if (type === "add") {
                    eval(
                      `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
                    );
                  } else if (type === 'delete') {
                    eval(`(formValues.${data.name}).splice(index, 1)`);
                  }
                }
              }
            },
            component.default || (component.slot && component.slot.default)
          )
        ];
  };

  //
  const isTypeOfCard = () => data.type === "card";

  // 卡片组件
  const wrapperCardComponent = (list, index) => {
    return createElement(
      "div",
      {
        style: {
          borderTop: index === 0 ? "1px solid #dddddd" : "",
          borderBottom: "1px solid #dddddd",
          borderLeft: "1px solid #dddddd",
          borderRight: "1px solid #dddddd",
          padding: "10px"
        }
      },
      [
        CardComponent(createElement, value, {
          slot: {
            right: createComponent(
              {
                tag: "el-link",
                props: {
                  icon: "el-icon-delete-solid",
                  underline: false,
                  disabled: listValues.length === data.minLimit
                },
                slot: {
                  default:
                    typeof data.slot.delete === "string"
                      ? data.slot.delete
                      : "删除"
                }
              },
              "delete",
              index
            )
          },
          title: (evalTemplateString(data, { model, item: listValues[index], index }) || '标题').replace(/\$index/gi, $index + 1)
        }),
        list
      ]
    );
  };

  const getUUID = index => {
    if (listValues.length > 0) {
      const item = listValues[index];
      if (!item.uuid_key) {
        this.$set(
          listValues[index],
          "uuid_key",
              Math.random()
              .toString(36)
              .substring(2)
        );
      }
      return item.uuid_key;
    }
  };

  let nodes = [
    data.list.map((listComponent, index) =>
      createElement(
        "div",
        {
          class: { "el-form--inline": data.inline },
          key: getUUID(index)
        },
        [
          isTypeOfCard()
            ? wrapperCardComponent(listComponent, index)
            : listComponent,
          isTypeOfCard()
            ? []
            : createElement(
                "el-form-item",
                {
                  props: {
                    labelWidth: data.inline
                      ? ""
                      : data.labelWidthComponents || "0px"
                  },
                  style: { margin: !data.inline ? "22px 0" : "" }
                },
                isTypeOfCard()
                  ? []
                  : data.operator.slot
                    ? createComponent(data.operator, "operator", index) : [
                      data.list.length > 1 || !data.default
                        ? typeof data.slot.delete === "object" ? createComponent(data.slot.delete, "delete", index) : deleteButton(listComponent) : [],
                      typeof data.slot.add === "object" ? createComponent(data.slot.add, "add", index) : addButton()
                    ]
              )
        ]
      )
    ),
    isTypeOfCard()
      ? createElement(
          "div",
          {
            style: {
              background: "#f9f9f9",
              padding: "5px 0 5px 20px",
              borderTop: data.list.length === 0 ? "1px solid #dddddd" : "",
              borderBottom: "1px solid #dddddd",
              borderLeft: "1px solid #dddddd",
              borderRight: "1px solid #dddddd"
            }
          },
          [
            createElement(
              "el-link",
              {
                props: {
                  icon: "el-icon-plus",
                  underline: false,
                  disabled: listValues.length === data.maxLimit
                },
                on: {
                  click: () => {
                    eval(
                      `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
                    );
                  }
                }
              },
              typeof data.slot.add === "string" ? data.slot.add : "新增"
            ),
            data.maxLimit > 0
              ? createElement(
                  "span",
                  { style: { color: "#f56c6c" } },
                  `（注意：当前限制最多${data.maxLimit}条数据）`
                )
              : null
          ]
        )
      : createElement(
          "div",
          {
            props: { labelWidth: "0px" }
          },
          [
            typeof data.slot.add !== "object"
              ? data.list.length === 0
                ? addButton()
                : []
              : data.list.length === 0
              ? createComponent(data.slot.add, "add", 0)
              : []
          ]
        )
  ];

  return [
    createElementBySlot(createElement, data, "before"),
    createElement(
      "div",
      {
        style: { ...data.style },
        class: { [data.class||'']: true }
      },
      nodes
    ),
    createElementBySlot(createElement, data, "after")
  ];
}
