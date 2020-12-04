import { Component } from "./index";

// 初始化自定义组件
const customTags = {};
const requireContext = require.context("./", true, /index\.js$/);
requireContext.keys().map(key => {
  const customTagName = key.replace(/^\.\/(.*)\/(.+)$/g, "$1");
  if (customTagName && key != customTagName) {
    customTags[customTagName] = requireContext(key).default;
  }
});

// 动态 slot 占位组件
const slotComponent = function(createElement, value, data) {
  return Object.keys(data.slot).map(key => {
    const slotItem = data.slot[key];
    if (slotItem instanceof Object) {
      if (slotItem.vmodel) {
        this.$set(data.slot[key], `isInput`, false);
        return createElement("template", { slot: key }, [
          Component(createElement, this, slotItem.vmodel, slotItem)
        ]);
      } else {
        return createElement(
          slotItem.tag,
          {
            slot: key,
            props: slotItem.props,
            attrs: slotItem.props,
            style: slotItem.style,
            on: slotItem.on
          },
          typeof slotItem.slot === "string" ? slotItem.slot : ""
        );
      }
    } else {
      return createElement("template", { slot: key }, slotItem || "");
    }
  });
};

// 创建 tooltip 提示组件
const createTipComponent = (createElement, dataItem) => {
  const tip = Object.assign(
    { content: "", placement: "top", effect: "light" },
    typeof dataItem.tip === "string" ? { content: dataItem.tip } : dataItem.tip
  );

  const tipTag = createElement("el-tooltip", { props: { ...tip } }, [
    createElement("i", {
      class: "el-icon-warning",
      style: { padding: "0 10px", fontSize: "18px" }
    })
  ]);

  return dataItem.tip ? tipTag : null;
};

// 创建组件 slot
const createElementBySlot = (createElement, dataItem, slotKey) => {
  if (dataItem.slot && Object.keys(dataItem.slot).length > 0) {
    const slotItem = dataItem.slot[slotKey] || "";
    if (slotKey === "after")
      Object.assign(slotItem.style || {}, { paddingLeft: "10px" });
    if (typeof slotItem === "object") {
      return createElement(
        slotItem.tag,
        {
          class: slotItem.class,
          props: slotItem.props,
          style: slotItem.style,
          attrs: slotItem.attrs,
          on: slotItem.on
        },
        slotItem.slot
      );
    } else {
      return slotItem
        ? createElement(
            "span",
            slotKey === "after"
              ? { style: { margin: "0 10px", ...slotItem.style } }
              : null,
            slotItem
          )
        : null;
    }
  }
};

// 
const fieldsetComponent = (createElement, dataItem, nodes) => {
  return [
    createElement("fieldset", {
      style: { border: "1px solid #dddddd" }
    }, [
      createElement("legend", {
        style : { 
          color: "#333333",
          left: "30px",
          fontSize: '18px',
          padding: "0 15px"
        }
      }, dataItem.title),
      nodes
    ])
  ]
};

// 简单深度拷贝
const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

export {
  customTags,
  deepClone,
  fieldsetComponent,
  slotComponent,
  createTipComponent,
  createElementBySlot
};
