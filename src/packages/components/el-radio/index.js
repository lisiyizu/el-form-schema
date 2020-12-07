import { createElementBySlot } from "../utils";

export default function(createElement, value, data) {
  const {
    on = {},
    attrs = {},
    props = {},
    style = {},
    items = [],
    keys = null
  } = data;

  if (!this.inline) style.width = "";

  let nodes = [
    createElementBySlot(createElement, data, "before"),
    createElement(
      "el-radio-group",
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
          "el-radio",
          {
            style: { lineHeight: "32px" },
            props: {
              key: option.value,
              disabled: option.disabled,
              label: keys ? option[keys["value"]] : option["value"]
            }
          },
          [keys ? option[keys["label"]] : option["label"]]
        );
      })
    ),
    createElementBySlot(createElement, data, "after")
  ];
  return nodes;
}
