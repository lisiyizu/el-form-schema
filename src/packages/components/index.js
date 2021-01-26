/* eslint-disable no-unused-vars */
import {
  customTags,
  slotComponent,
  createTipComponent,
  createElementBySlot
} from "./utils";

export const Component = (createElement, vm, key, item) => {

  let {
    rules = null,
    labelWidth = "",
    name = key,
    keys = {},
    $index = "",
    items = [],
    tag,
    on = {}
  } = item;

  // 新增 name 属性（目的：为了做给复杂类型(object|array)用来遍历嵌套 el-form-item 的时候设置 prop 值）
  item.name = key;

  // 支持diabled的表达式
  if (item.props && typeof item.props.disabled === 'string') item.props.disabledExpression = item.props.disabled;
  if (item.attrs && typeof item.attrs.disabled === 'string') item.attrs.disabledExpression = item.attrs.disabled;

  const { formValues, model } = vm;

  // 获取value
  const value = eval(`formValues.${key}`);
  
  // 组件default如果是动态, 需要重新设置该组件的value
  if(!value && item.default) {
    eval(`formValues.${name} = item.default`);
  }

  // 合并事件
  item.on = Object.assign(on, {
    input: function(value) {
      // 解决对象的问题 object: { test: '' }, name = object.test
      eval(`formValues.${name} = value`);
      // on : { changeExt(val,item) { }
      if (["el-select", "el-radio", "el-checkbox"].includes(tag) && on.changeExt) {
        const model = items.find(
          item => item[keys ? keys["value"] : "value"] == value
        );
        on.changeExt.call(vm, value, model);
      }
      // on : { changeUpdateModel(val,item) { }
      if (on.changeUpdateModel) {
        on.changeUpdateModel.call(vm, { $model: vm.formValues, $item: eval(`formValues.${item.name.slice(0,item.name.lastIndexOf("."))}`), $index: item.$index });
      }
    }
  });

  // 开启debug模式
  if (
    vm.debug &&
    typeof item.slot === "object" && !["tab", "array", "table"].includes(tag)
  ) {
    item.slot.after = key;
  }

  // 编译表达式字符串
  const compilerExpressionString = condition => {
    const expCondition = condition;
    if (typeof condition === "boolean" || condition === undefined) {
      // bool值vif
      return condition;
    } else if (typeof condition === "string") {
      // 复杂vif: "test.length>0" || "arr[$index].test"
      try {
        // vif 包含 $index
        if (condition.includes("[$index]") && $index > -1) {
          condition = condition.replace("$index", $index || 0);
        }
        // vif 包含 $item
        if (condition.includes("$item")) {
          item.$item = item.$item || {};
          condition = condition.replace(/(\$item)/g, "item.$item");
        }
        // vif 包含 $model
        if (condition.includes("$model")) {
          condition = condition.replace(/(\$model)/g, "formValues");
        }
        // 执行eval
        return eval(condition);
      } catch (e) {
        console.error(e);
        // 阻止多级报错的情况，比如："$model.a.b.c"
        console.error(`表达式字符串：${expCondition}，可能存在问题～`);
      }
    }
  };

  let vifBool = true;
  // 解决vif:false的问题
  if (typeof item.vif === "boolean") {
    vifBool = item.vif;
  }
  // 编译 vif 表达式字符串
  if (item.vif && typeof item.vif === "string") {
    vifBool = compilerExpressionString(item.vif);
  }
  // 编译 props.disabled 表达式字符串
  if (item.props && (typeof item.props.disabledExpression === "string")) {
    item.props.disabled = compilerExpressionString(item.props.disabledExpression);
  }
  // 编译 attrs.disabled 表达式字符串
  if (item.attrs && (typeof item.attrs.disabledExpression === "string")) {
    item.attrs.disabled = compilerExpressionString(item.attrs.disabledExpression);
  }

  // 收集vif=false的隐藏字段（目的：后续为了用来移除验证）
  vifBool ? vm.validiteFieldSet.delete(name) : vm.validiteFieldSet.add(name);

  // 通过 vifBool 设置 rules 的 required 值
  if (item.rules) rules.required = vifBool;

  let nodes = [];

  if (item.isInput === false && !item.vmodel) {
    item.style.marin = item.style.margin || "0 0 22px 0";
  }

  if (customTags[tag]) {
    nodes = [
      customTags[tag].call(vm, createElement, value, item),
      createTipComponent(createElement, item)
    ];
  } else {
    nodes = [
      createElementBySlot(createElement, item, "before"),
      createElement(
        tag,
        {
          props: {
            value,
            ...Object.freeze(item.props)
          },
          attrs: { ...item.attrs },
          style: { ...item.style },
          class: { ...item.class },
          on: { ...item.on }
        },
        typeof item.slot === "object"
          ? Object.keys(item.slot).length === 0
            ? null
            : slotComponent.call(vm, createElement, value, item)
          : item.slot || item.default || value
      ),
      createElementBySlot(createElement, item, "after"),
      createTipComponent(createElement, item)
    ];
  }

  if (item.isInput === false) {
    return customTags[tag]
      ? customTags[tag].call(vm, createElement, value, item)
      : nodes;
  }

  // 复杂组件
  const COMPFLEX_COMPONENTS = ["object", "array", "table"];
  
  return [
    createElement(
      "el-form-item",
      {
        class: {
          "el-form-item-inline is-set-inline":
            !COMPFLEX_COMPONENTS.includes(item.tag) && item.inline && !vm.inline
        },
        props: {
          rules,
          required: item.required,
          prop: COMPFLEX_COMPONENTS.includes(item.tag) && item.rules && !item.rules.required ? '' : key,
          labelWidth: labelWidth || vm.labelWidth,
          label: item.label
        },
        style: {
          display: vifBool && ((item.expand || vm.expandAll && vm.isSearchForm) || !vm.isSearchForm)
            ? !COMPFLEX_COMPONENTS.includes(item.tag) && item.inline
              ? "inline-flex"
              : ""
            : "none",
          alignItems: !["object", "array", "table"].includes(item.tag) && item.inline ? "flex-end" : null,
          marginRight: item.inline && item.slot && item.slot.after ? "0px" : "",
          marginBottom: !vm.inline
            ? item.showValidate 
              ? "0px"
              : item.style && item.style.marginBottom ? item.style.marginBottom : item.isMarginBottom
              ? "22px"
              : "22px"
            : ""
        },
        ref: key
      },
      nodes
    ),
    item.isLastInline
      ? createElement("div", { style: { display: "flex" } })
      : []
  ];
};
