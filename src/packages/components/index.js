/* eslint-disable no-unused-vars */
import {
  CUSTOM_TAGS,
  COMPFLEX_COMPONENTS,
  isEmpty,
  slotComponent,
  createTipComponent,
  createElementBySlot,
  evalTemplateString,
  createLabelTipComponent
} from './utils'

export const Component = (createElement, vm, key, item) => {
  let {
    rules = null,
    labelWidth = '',
    name = key,
    keys = {},
    $index = '',
    items = [],
    tag,
    on = {}
  } = item

  // 新增 name 属性（目的：为了做给复杂类型(object|array)用来遍历嵌套 el-form-item 的时候设置 prop 值）
  item.name = key

  // 注意：如果存在 skip: true，并且 key 存在 "a.b.c" 的情况，需要取上一个对象 "a.b"，没有则是设置空
  if (item.skip) {
    item.name = key.includes('.') ? key.substr(0, key.lastIndexOf('.')) : ''
  }

  // 增加
  if (!item.refreshKey) item.refreshKey = key

  // 支持 required: '$model.a'
  if (item.required && typeof item.required === 'string') item.requiredExpression = item.required

  // 支持 rules: { required: '$model.a', message: '必填' }
  if (!Array.isArray(item.rules) && item.rules && (typeof item.rules.required === 'string')) item.requiredExpression = item.rules.required

  const { formValues, model } = vm

  // 获取value
  const value = eval(`formValues.${name}`)

  // 组件default如果是动态, 需要重新设置该组件的value
  if (isEmpty(value) && typeof value !== 'boolean' && !isEmpty(item.default)) {
    if (tag === 'el-select') {
      // 下拉组件，有全部选项，全部值为空且默认值不是全部的问题
      if (!items.map(selItem => selItem[keys.value]).some(itemVal => itemVal === value)) {
        eval(`formValues.${name} = item.default`)
      }
    } else {
      eval(`formValues.${name} = item.default`)
    }
  }

  // 合并事件
  item.on = Object.assign(on, {
    input: function(value) {
      // 解决对象的问题 object: { test: '' }, name = object.test
      eval(`formValues.${name} = value`)
      // 清除页面所有 el-select 组件的选中状态
      vm.$nextTick(() => {
        Array.from(document.querySelectorAll('.el-select > .el-input')).forEach(el => {
          el.className = el.className.replace('is-focus', '')
          el.querySelector('.el-input__inner').blur()
        })
      })
      // on : { changeExt(val,item) { }
      if (['el-select', 'el-radio', 'el-checkbox'].includes(tag) && on.changeExt) {
        const model = items.find(
          item => item[keys ? keys['value'] : 'value'] === value
        )
        on.changeExt.call(vm, value, model)
      }
      // on : { changeUpdateModel(val,item) { }
      if (on.changeUpdateModel) {
        on.changeUpdateModel.call(vm, { $model: vm.formValues, $item: eval(`formValues.${item.name.slice(0, item.name.lastIndexOf('.'))}`), $index: item.$index })
      }
    }
  })

  // 解构字段赋值
  if (item.destruct) {
    item.destruct.forEach((field, index) => {
      field = item.name.includes('.') ? `${item.name.substr(0, item.name.lastIndexOf('.'))}.${field}` : field
      eval(`formValues.${field} = Array.isArray(value) && value.length ? value[index] : ""`)
    })
  }

  // 开启debug模式
  if (
    vm.debug &&
    typeof item.slot === 'object' && !['tab', 'array', 'table'].includes(tag)
  ) {
    item.slot.after = key
  }

  // 编译表达式字符串
  const compileExpressionString = condition => {
    const expCondition = condition
    if (typeof condition === 'boolean' || condition === undefined) {
      // bool值vif
      return condition
    } else if (typeof condition === 'string') {
      // 复杂vif: "test.length>0" || "arr[$index].test"
      try {
        // vif 包含 $index
        if (/\[\$index\]/g.test(condition)) {
          condition = condition.replaceAll('[$index]', `[${$index || 0}]`)
        }
        // 是否包含 arr_$index 的情况
        if (/\w+_\$index/g.test(condition)) {
          key.replace(/(\w+)\[(\d)\]/g, function(findItem, $1, $2) {
            condition = condition.replaceAll(`${$1}_$index`, $2)
            return findItem
          })
        }
        // vif 包含 $item
        if (condition.includes('$item')) {
          item.$item = item.$item || {}
          condition = condition.replace(/(\$item)/g, 'item.$item')
        }
        // vif 包含 $model
        if (condition.includes('$model')) {
          condition = condition.replace(/(\$model)/g, 'formValues')
        }
        // 执行eval
        return eval(condition)
      } catch (e) {
        console.error(e)
        // 阻止多级报错的情况，比如："$model.a.b.c"
        console.error(`表达式字符串：${expCondition}，可能存在问题～`)
      }
    }
  }

  let vifBool = true; let disabledBool = false
  // 解决vif:false的问题
  if (typeof item.vif === 'boolean') {
    vifBool = item.vif
  }
  // 编译 vif 表达式字符串
  if (item.vif && typeof item.vif === 'string') {
    vifBool = !!compileExpressionString(item.vif)
  }
  // 编译 required 表达式字符串
  if (item.requiredExpression && (typeof item.requiredExpression === 'string')) {
    item.required = !!compileExpressionString(item.requiredExpression)
  }
  // 编译 inline 表达式字符串
  if (item.inlineExpression && (typeof item.inlineExpression === 'string')) {
    item.inline = !!compileExpressionString(item.inlineExpression)
  }
  // 编译 props 表达式
  if (item.props) {
    Object.keys(item.props).map(key => {
      if (/\$index|\$item|\$model/g.test(item.props[key])) {
        if (key === 'disabled_exp_prop') {
          disabledBool = !!compileExpressionString(item.props[key])
          item.props[key.replace('_exp_prop', '')] = !!compileExpressionString(item.props[key])
        } else {
          item.props[key.replace('_exp_prop', '')] = compileExpressionString(item.props[key])
        }
      }
    })
  }
  // 编译 attr 表达式
  if (item.attrs) {
    Object.keys(item.attrs).map(key => {
      if (/\$index|\$item|\$model/g.test(item.attrs[key])) {
        if (key === 'disabled_exp_attr') {
          disabledBool = !!compileExpressionString(item.attrs[key])
          item.attrs[key.replace('_exp_attr', '')] = !!compileExpressionString(item.attrs[key])
        } else {
          item.attrs[key.replace('_exp_attr', '')] = compileExpressionString(item.attrs[key])
        }
      }
    })
  }

  // 编译 label_template_string  表达式
  if (item['label_template_string']) {
    evalTemplateString(item, { model, item: item.$item, retNow: false, key: 'label' })
  }
  // 编译 slot_template_string  表达式
  if (item['slot_template_string']) {
    evalTemplateString(item, { model, item: item.$item, retNow: false, key: 'slot' })
  }
  // 编译 slot_after_template_string  表达式
  if (item['slot_after_template_string']) {
    item.slot.after = evalTemplateString(item, { model, item: item.$item, retNow: true, key: 'slot_after' })
  }
  // 编译 slot_prepend_template_string  表达式
  if (item['slot_prepend_template_string']) {
    item.slot.prepend = evalTemplateString(item, { model, item: item.$item, retNow: true, key: 'slot_prepend' })
  }
  // 编译 slot_append_template_string  表达式
  if (item['slot_append_template_string']) {
    item.slot.append = evalTemplateString(item, { model, item: item.$item, retNow: true, key: 'slot_append' })
  }

  // 存储复杂对象的 vif 值
  if (COMPFLEX_COMPONENTS.includes(item.tag)) {
    item.vifBool = vifBool
  }

  // 处理 rules: [数组] 的情况
  if (Array.isArray(item.rules)) {
    if (item.requiredExpression) {
      if (item.rules.some(r => 'required' in r)) {
        item.rules.forEach(ruleItem => {
          if ('required' in ruleItem) ruleItem.required = item.required
        })
      } else {
        item.rules.unshift({ required: item.required, message: '必填' })
      }
    } else {
      item.rules.forEach(ruleItem => {
        if (typeof ruleItem.required === 'string') {
          ruleItem.requiredExpression = ruleItem.required
        }
        if (ruleItem.requiredExpression) {
          ruleItem.required = !!compileExpressionString(ruleItem.requiredExpression)
        }
      })
    }
  }

  // 收集vif = false的隐藏字段（目的：后续为了用来移除验证）
  if (vifBool) {
    vm.validateFieldSet.delete(name)
  } else if (!COMPFLEX_COMPONENTS.includes(item.tag) && item.isInput) {
    // 修复联动 vif = false，清空重置组件（注意：el-input-number 组件默认值0，需要单独处理);
    eval(`formValues.${name} = item.default || (item.tag === 'el-input-number' ? item.props.min || 0 : '')`)
    vm.validateFieldSet.add(name)
    vm.$refs[vm.refName] && vm.$refs[vm.refName].clearValidate(key)
  } else if (COMPFLEX_COMPONENTS.includes(item.tag)) {
    // 支持 object/array/table 复杂联动 vif = false，清空数值
    const props = vm.getValidateProps(key)
    vm.$refs[vm.refName] && vm.$refs[vm.refName].clearValidate(props)
    // object 组件 或者 存在 minLimit 的 array/table 组件
    if (tag === 'object') {
      props.forEach(field => {
        const fieldVal = eval(`formValues.${field}`)
        // 去掉数组，以免造成循环引用
        if (!Array.isArray(fieldVal)) {
          vm.$refs[field] && vm.$refs[field].resetField()
        }
      })
    } else if (value.length > 0) {
      eval(`formValues.${name}.splice(0, ${value.length})`)
    }
  }

  // 修复联动 disabled = true，清空数值
  if (disabledBool && vm.isSearchForm) {
    eval(`formValues.${name} = item.default || ''`)
  }

  // 增加联动 required 验证
  if (typeof item.required === 'boolean' && !item.required) {
    item.rules = item.rules || {}
    rules = rules || {}
    vm.validateFieldSet.add(name)
    item.rules.required = false
    rules.required = false
  } else if (item.rules && typeof item.rules === 'object' && !Array.isArray(item.rules)) {
    if (typeof item.rules.required === 'boolean' && !item.rules.requiredExpression) {
      item.rules.required = vifBool
    }
  } else if (Array.isArray(item.rules)) {
    item.rules.forEach(r => {
      if (typeof r.required === 'boolean' && !r.requiredExpression) {
        r.required = vifBool
      }
    })
  }

  let nodes = []

  if (item.isInput === false && !item.vmodel) {
    item.style.marin = item.style.margin || '0 0 22px 0'
  }

  if (CUSTOM_TAGS[tag]) {
    nodes = [
      createElement('div', {
        style: {
          display: vifBool ? (item.vmodel ? (item.style && item.style.display ? item.style.display : 'inline-flex') : 'flow-root') : 'none',
          ...((item.tag === 'slot' && !item.vmodel && item.inline && vifBool) ? { display: 'inline-flex', alignItems: 'center' } : {})
        },
        class: { 'el-form-item-inline': tag === 'slot', 'is-set-inline': tag === 'slot' && item.inline },
        attrs: tag === 'slot' ? { 'slot-label-width': item.labelWidth } : null
      }, [
        CUSTOM_TAGS[tag].call(vm, createElement, value, item)
      ])
    ]
    if (item.isInput === false || (item.tag === 'slot' && item.slot)) {
      return nodes
    }
  } else {
    nodes = [
      createElementBySlot.call(vm, createElement, item, 'before'),
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
        typeof item.slot === 'object'
          ? Object.keys(item.slot).length === 0
            ? null
            : slotComponent.call(vm, createElement, value, item)
          : item.slot || item.default || value
      ),
      createElementBySlot.call(vm, createElement, item, 'after'),
      createTipComponent(createElement, item)
    ]
  }

  // 复杂类型 required: true 的情况
  if (COMPFLEX_COMPONENTS.includes(item.tag) && typeof item.required === 'boolean') {
    rules = { required: item.required, message: '必填' }
    vm.$watch(`formValues.${key}`, (val) => {
      if (val.length === 1) vm.$refs[key].clearValidate()
    })
  }

  return [
    createElement(
      'el-form-item',
      {
        class: {
          'el-form-item-inline is-set-inline':
            !COMPFLEX_COMPONENTS.includes(item.tag) && item.inline && !vm.inline
        },
        props: {
          rules,
          required: vifBool ? item.required : false,
          prop: key,
          labelWidth: labelWidth || vm.labelWidth,
          label: item.label
        },
        style: {
          display: vifBool && ((item.expand || vm.expandAll && vm.isSearchForm) || !vm.isSearchForm)
            ? !COMPFLEX_COMPONENTS.includes(item.tag) && item.inline
              ? (item.vmodel && item.inline) ? 'inline-block' : 'inline-flex'
              : ''
            : item.vmodel ? '' : 'none',
          alignItems: !['object', 'array', 'table'].includes(item.tag) && item.inline ? 'flex-end' : null,
          marginRight: item.inline && item.slot && item.slot.after ? '0px' : '',
          marginBottom: !vm.inline
            ? item.showValidate
              ? '0px'
              : item.style && item.style.marginBottom ? item.style.marginBottom : item.isMarginBottom
                ? '22px'
                : (item.tag === 'object' && item.type === 'card' && !item.border) ? '-12px' : (item.type === 'divider') ? '0px' : '22px'
            : item.vmodel ? '0px' : ''
        },
        key: item.refreshKey,
        ref: key
      },
      [
        item.label && item.labelTip ? createElement('span', { slot: 'label' }, [
          item.label,
          createLabelTipComponent(createElement, item)
        ]) : null,
        ... nodes
      ]
    ),
    item.isLastInline || item.inlineBlock
      ? createElement('div', { style: { display: 'flex' }})
      : []
  ]
}
