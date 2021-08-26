import { createElementBySlot, createTipComponent } from "../utils";

export default function(createElement, value, data) {
  const {
    on = {},
    attrs = {},
    props = {},
    style = {},
    items = [],
    keys = null,
    scopedSlots = null
  } = data;

  let nodes = [
    createElementBySlot(createElement, data, "before"),
    createElement(
      "el-select",
      {
        props: {
          value,
          placeholder: props.placeholder || "请选择",
          ...attrs,
          ...props
        },
        style: { ...style },
        on: { ...on }
      },
      (items || []).map(option => {
        return createElement(
          "el-option",
          {
            style: { minWidth: style.width },
            props: {
              key: option.value,
              disabled: option.disabled,
              label: keys ? option[keys["label"]] : option["label"],
              value: keys ? option[keys["value"]] : option["value"]
            },
            scopedSlots: typeof scopedSlots === 'function' ? scopedSlots(createElement, option) : null
          },
          null
        );
      })
    ),
    createElementBySlot(createElement, data, "after"),
    createTipComponent(createElement, data),
  ];

  return nodes;
}
