import { Component } from "./index";
import TextComponent from './text';
import ArrayComponent from './array';
import ObjectComponent from './object';
import TableComponent from './table';
import CardComponent from './card';
import SlotComponent from './slot';
import ElRadioComponent from './el-radio';
import ElCheckboxComponent from './el-checkbox';
import ElSelectComponent from './el-select';

// 初始化自定义组件
const customTags = {
  'text': TextComponent,
  'array': ArrayComponent,
  'object': ObjectComponent,
  'table': TableComponent,
  'card': CardComponent,
  'slot': SlotComponent,
  'el-radio': ElRadioComponent,
  'el-checkbox': ElCheckboxComponent,
  'el-select': ElSelectComponent
};

// 动态 slot 占位组件
const slotComponent = function(createElement, value, data) {
  return Object.keys(data.slot).map(key => {
    const slotItem = data.slot[key];
    if (slotItem instanceof Object && !['before', 'after'].includes(key)) {
      if (slotItem.vmodel) {
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
            class: slotItem.class,
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
const createTipComponent = function(createElement, dataItem) {
  const tip = Object.assign(
    { content: "", placement: "top", effect: "light" },
    typeof dataItem.tip === "string" ? { content: dataItem.tip } : dataItem.tip
  );

  const tipTag = createElement("el-tooltip", { props: { ...tip } }, [
    createElement("i", {
      class: "el-icon-warning",
      style: { padding: "0 4px", fontSize: "14px" }
    })
  ]);

  return dataItem.tip ? tipTag : null
};

// 创建 tooltip 提示组件
const createLabelTipComponent = function(createElement, dataItem) {
  const labelTip = Object.assign(
    { content: "", placement: "top", effect: "light" },
    typeof dataItem.labelTip === "string" ? { content: dataItem.labelTip } : dataItem.labelTip
  );

  const labelTipTag = createElement("el-tooltip", { props: { ...labelTip } }, [
    createElement("i", {
      class: "el-icon-warning",
      style: { padding: "0 0 0 2px", fontSize: "14px" }
    })
  ]);

  return dataItem.labelTip ? labelTipTag : null;
};

// 创建组件 slot
const createElementBySlot = function(createElement, dataItem, slotKey) {
  if (dataItem.slot && Object.keys(dataItem.slot).length > 0) {
    const slotItem = dataItem.slot[slotKey] || "";
    if (slotKey === "after")
      Object.assign(slotItem.style || {}, { paddingLeft: "10px" });
    if (typeof slotItem === "object") {
      if(!['before', 'after'].includes(slotKey)) {
        return Component(createElement, this, slotItem.vmodel, slotItem);
      } else {
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
      }
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
const fieldsetComponent = function(createElement, dataItem, nodes) {
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

// 优化解决 a.arr[0].c 的等复杂情况
const getObjectByPath = (obj, path) => {
  const pathArr = path.split('.').map(item => {
      return (item.includes('[')) ? item.replace(']','').split('[') : item;
  }).flat(true);
  return pathArr.reduce((prev, next) => {
    return prev ? prev[next] : undefined;  
  }, obj);
}

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

// 比较是否相等
const isEqual = function(source, target) {
  if (Object.keys(source).length != Object.keys(target).length) {
    return false
  } else {
    return Object.is(JSON.stringify(source), JSON.stringify(target));
  }
}

// 是否为空
const isEmpty = function(val) {
  return val === null || val === undefined || val === "";
}

export {
  isEqual,
  isEmpty,
  customTags,
  deepClone,
  getObjectByPath,
  fieldsetComponent,
  slotComponent,
  createTipComponent,
  createElementBySlot,
  createLabelTipComponent
};
