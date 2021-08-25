/* eslint-disable no-unused-vars */
import {
  isEmpty,
  customTags,
  slotComponent,
  createTipComponent,
  createElementBySlot,
  evalTemplateString,
  createLabelTipComponent
} from "./utils";

// 复杂组件
const COMPFLEX_COMPONENTS = ["object", "array", "table"];

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

  const { formValues, model } = vm;

  // 获取value
  const value = eval(`formValues.${key}`);
  
  // 组件default如果是动态, 需要重新设置该组件的value
  if(isEmpty(value) && typeof value !== 'boolean' && !isEmpty(item.default)) {
    eval(`formValues.${name} = item.default`);
  }

  // 合并事件
  item.on = Object.assign(on, {
    input: function(value) {
      // 解决对象的问题 object: { test: '' }, name = object.test
      eval(`formValues.${name} = value`);
      // 清除页面所有 el-select 组件的选中状态
      vm.$nextTick(()=>{
        Array.from(document.querySelectorAll('.el-select > .el-input')).forEach(el=>{
          el.className = el.className.replace('is-focus', '');
          el.querySelector('.el-input__inner').blur();
        });
      })
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
  const compileExpressionString = condition => {
    const expCondition = condition;
    if (typeof condition === "boolean" || condition === undefined) {
      // bool值vif
      return condition;
    } else if (typeof condition === "string") {
      // 复杂vif: "test.length>0" || "arr[$index].test"
      try {
        // vif 包含 $index
        if (/\[\$index\]/g.test(condition)) {
          condition = condition.replaceAll('[$index]', `[${$index || 0}]`);
        } 
        // 是否包含 arr_$index 的情况
        if (/\w+_\$index/g.test(condition)) {
          key.replace(/(\w+)\[(\d)\]/g,function(findItem, $1, $2) {
            condition = condition.replaceAll(`${$1}_$index`, $2);
            return findItem;
          })
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

  let vifBool = true, disabledBool = false;
  // 解决vif:false的问题
  if (typeof item.vif === "boolean") {
    vifBool = item.vif;
  }
  // 编译 vif 表达式字符串
  if (item.vif && typeof item.vif === "string") {
    vifBool = !!compileExpressionString(item.vif);
  }
  // 编译 required 表达式字符串
  if (item.requiredExpression && (typeof item.requiredExpression === "string")) {
    item.required = !!compileExpressionString(item.requiredExpression);
  }
  // 编译 inline 表达式字符串
  if (item.inlineExpression && (typeof item.inlineExpression === "string")) {
    item.inline = !!compileExpressionString(item.inlineExpression);
  }
  // 编译 props 表达式
  if(item.props) {
    Object.keys(item.props).map(key => {
      if(/\$index|\$item|\$model/g.test(item.props[key])) {
        if(key === 'disabled_exp_prop') {
          disabledBool = !!compileExpressionString(item.props[key]);
          item.props[key.replace('_exp_prop', '')] =  !!compileExpressionString(item.props[key]);
        } else {
          item.props[key.replace('_exp_prop', '')] =  compileExpressionString(item.props[key]);
        }
      }
    });
  }
  // 编译 attr 表达式
  if (item.attrs) {
    Object.keys(item.attrs).map(key => {
      if(/\$index|\$item|\$model/g.test(item.attrs[key])) {
        if(key === 'disabled_exp_attr') {
          disabledBool = !!compileExpressionString(item.attrs[key]);
          item.attrs[key.replace('_exp_attr', '')] =  !!compileExpressionString(item.attrs[key]);
        } else {
          item.attrs[key.replace('_exp_attr', '')] =  compileExpressionString(item.attrs[key]);
        }
      }
    });
  }

  // 编译 label_template_string  表达式  
  if(item['label_template_string']) {
    evalTemplateString(item, { model, item: item.$item, retNow: false, key: 'label'});
  }
  // 编译 slot_template_string  表达式  
  if(item['slot_template_string']) {
    evalTemplateString(item, { model, item: item.$item, retNow: false, key: 'slot'});
  }
  // 编译 slot_after_template_string  表达式  
  if(item['slot_after_template_string']) {
    item.slot.after = evalTemplateString(item, { model, item: item.$item, retNow: true, key: 'slot_after'})
  }

  // 收集vif=false的隐藏字段（目的：后续为了用来移除验证）
  if(vifBool) {
    vm.validiteFieldSet.delete(name);
  } else if (!COMPFLEX_COMPONENTS.includes(item.tag)) {
    // 修复联动 vif=false，清空数值
    eval(`formValues.${name} = item.default || ''`);
    vm.validiteFieldSet.add(name);
  }
  
  // 修复联动 disabled = true，清空数值
  if(disabledBool && vm.isSearchForm) {
    eval(`formValues.${name} = item.default || ''`);
  }

  // 增加联动 required 验证
  if(typeof item.required  === 'boolean' && !item.required) {
    item.rules = item.rules || {};
    rules = rules || {};
    vm.validiteFieldSet.add(name);
    item.rules.required = false;
    rules.required = false;
  } else if (item.rules) {
    item.rules.required = vifBool;
  }

  let nodes = [];

  if (item.isInput === false && !item.vmodel) {
    item.style.marin = item.style.margin || "0 0 22px 0";
  }

  if (customTags[tag]) {
    nodes = [
      createElement('div', {
          style: { display: vifBool ? 'contents' : 'none' }, 
          class: { 'el-form-item-inline': tag === 'slot', "is-set-inline": tag === 'slot' && item.inline },
          attrs: tag === 'slot' ? { 'slot-label-width': item.labelWidth } : null
        }, [
        customTags[tag].call(vm, createElement, value, item)
      ])
    ];
    if (item.isInput === false || tag === 'slot') {
      return nodes;
    }
  } else {
    nodes = [
      createElementBySlot.call(vm, createElement, item, "before"),
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
      createElementBySlot.call(vm, createElement, item, "after"),
      createTipComponent(createElement, item)
    ];
  }
  
  // 复杂类型 required: true 的情况
  if(COMPFLEX_COMPONENTS.includes(item.tag) && typeof item.required === 'boolean') {
    rules = { required: item.required, message: '必填' };
    vm.$watch(`formValues.${key}`, (val) => {
      if (val.length === 1) vm.$refs[key].clearValidate();
    });
  } 
  
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
          prop: key,
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
              : (item.tag === 'object' && item.type === 'card' && !item.border) ?  "-12px" : (item.type === 'divider') ? '0px' : "22px"
            : ""
        },
        ref: key
      },
      [
        item.label &&  item.labelTip ? createElement('span', { slot: 'label' }, [
          item.label,
          createLabelTipComponent(createElement, item)
        ]) : null,
        ... nodes
      ]
    ),
    item.isLastInline || item.inlineBlock
      ? createElement("div", { style: { display: "flex" } })
      : []
  ];
};
