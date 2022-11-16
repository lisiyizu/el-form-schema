import { Component } from './index'
import TextComponent from './text'
import ArrayComponent from './array'
import ObjectComponent from './object'
import TableComponent from './table'
import CardComponent from './card'
import SlotComponent from './slot'
import ElRadioComponent from './el-radio'
import ElCheckboxComponent from './el-checkbox'
import ElSelectComponent from './el-select'
// import DescriptionComponent from './description'

// 复杂组件
const COMPFLEX_COMPONENTS = ['description', 'object', 'array', 'table']

// 初始化自定义组件
const CUSTOM_TAGS = {
  // 'description': DescriptionComponent,
  'text': TextComponent,
  'array': ArrayComponent,
  'object': ObjectComponent,
  'table': TableComponent,
  'card': CardComponent,
  'slot': SlotComponent,
  'el-radio': ElRadioComponent,
  'el-checkbox': ElCheckboxComponent,
  'el-select': ElSelectComponent
}

// 动态 slot 占位组件
const slotComponent = function(createElement, value, data) {
  return Object.keys(data.slot).map(key => {
    const slotItem = data.slot[key]
    if (slotItem instanceof Object && !['before', 'after'].includes(key)) {
      if (slotItem.vmodel) {
        return createElement('template', { slot: key }, [
          Component(createElement, this, slotItem.vmodel, slotItem)
        ])
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
          typeof slotItem.slot === 'string' ? slotItem.slot : ''
        )
      }
    } else {
      return createElement('template', { slot: key }, slotItem || '')
    }
  })
}

// 创建 tooltip 提示组件
const createTipComponent = (createElement, dataItem) => {
  const tip = Object.assign(
    { content: '', placement: 'top', effect: 'light' },
    typeof dataItem.tip === 'string' ? { content: dataItem.tip } : dataItem.tip
  )

  const tipTag = createElement('el-tooltip', { props: { ...tip }}, [
    createElement('i', {
      class: 'el-icon-warning',
      style: { padding: '0 6px', fontSize: '15px' }
    })
  ])

  return dataItem.tip ? tipTag : null
}

// 创建 tooltip 提示组件
const createLabelTipComponent = function(createElement, dataItem) {
  const labelTip = Object.assign(
    { content: '', placement: 'top', effect: 'light' },
    typeof dataItem.labelTip === 'string' ? { content: dataItem.labelTip } : dataItem.labelTip
  )

  const labelTipTag = createElement('el-tooltip', { props: { ...labelTip }}, [
    createElement('i', {
      class: 'el-icon-warning',
      style: { padding: '0 2px', fontSize: '13px' }
    })
  ])

  return dataItem.labelTip ? labelTipTag : null
}

// 创建组件 slot
const createElementBySlot = function(createElement, dataItem, slotKey) {
  if (dataItem.slot && Object.keys(dataItem.slot).length > 0) {
    const slotItem = dataItem.slot[slotKey] || ''
    if (slotKey === 'after') Object.assign(slotItem.style || {}, { paddingLeft: '10px' })
    if (typeof slotItem === 'object' && slotItem.vmodel) {
      return Component(createElement, this, slotItem.vmodel, slotItem)
    } else if (typeof slotItem === 'object') {
      return createElement(
        slotItem.tag,
        {
          props: slotItem.props,
          attrs: slotItem.props,
          style: slotItem.style,
          class: slotItem.class,
          on: slotItem.on
        },
        typeof slotItem.slot === 'string' ? slotItem.slot : ''
      )
    } else {
      return slotItem
        ? createElement(
          'span',
          slotKey === 'after'
            ? { style: { margin: '0 10px', ...slotItem.style }}
            : null,
          slotItem
        )
        : null
    }
  }
}

// eval 解析模版字符串
const evalTemplateString = function(component, { model = {}, item = {}, index, key, retNow = false }) {
  const expTpl = `${key}_template_string`
  if (component[expTpl]) {
    if (!retNow) {
      component[key] = eval('`' + component[expTpl] + '`') || ''
    } else {
      return eval('`' + component[expTpl] + '`') || ''
    }
  } else {
    return component[key]
  }
}

// 验证规则
const validatorRules = (rules) => {
  if (Array.isArray(rules)) {
    rules.forEach(item => {
      if (item.pattern) {
        item.validator = (rule, value, callback) => {
          if (value && item.pattern.test(value)) {
            callback()
          } else if (!value && !item.required) {
            callback()
          } else {
            callback(new Error(item.message))
          }
        }
      }
    })
  }
  return rules
}

//
const fieldsetComponent = (createElement, dataItem, nodes) => {
  return [
    createElement('fieldset', {
      style: { border: '1px solid #dddddd' }
    }, [
      createElement('legend', {
        style: {
          color: '#333333',
          left: '30px',
          fontSize: '18px',
          padding: '0 15px'
        }
      }, dataItem.title),
      nodes
    ])
  ]
}

// 优化解决 a.arr[0].c 的等复杂情况
const getObjectByPath = (obj, path) => {
  const pathArr = path.split('.').map(item => {
    return (item.includes('[')) ? item.replace(']', '').split('[') : item
  }).flat(true)
  return pathArr.reduce((prev, next) => {
    return prev ? prev[next] : undefined
  }, obj)
}

// 简单深度拷贝
const deepClone = obj => {
  if (obj === null) return null
  const clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  }
  return clone
}

// 比较是否相等
const isEqual = function(source, target) {
  if (Object.keys(source).length != Object.keys(target).length) {
    return false
  } else {
    return Object.is(JSON.stringify(source), JSON.stringify(target))
  }
}

// 是否为空
const isEmpty = function(val) {
  return val === null || val === undefined || val === ''
}

// 生成唯一键
const genUnique = function() {
  return Math.random().toString(36).substring(2)
}

// 创建操作按钮
const createActionButtons = function({ h, action, component, scope }) {
  const { formValues } = this
  const $model = formValues
  return action.buttons.map(item => {
    const ifBool = item.if ? eval(item.if) : true
    const disabledBool = item.disabled ? eval(item.disabled) : false
    return ifBool ? h(
      item.tag,
      {
        props: { ...item.props, disabled: this.disabled || disabledBool },
        on: {
          click: () => {
            item.onClick({
              ...scope,
              $addRow: () => {
                eval(
                  `formValues.${component.name}.push(JSON.parse(JSON.stringify(component.keys)))`
                )
              },
              $delRow: () => {
                eval(`formValues.${component.name}.splice(scope.$index, 1)`)
              }
            })
          }
        }
      },
      item.text
    ) : null
  })
}

// array/table 新增操作
const addRow = function(data, formValues) {
  if (data.on && data.on.add) {
    eval(
      `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
    )
    const list = eval(`formValues.${data.name}`)
    data.on.add({
      row: list[list.length - 1],
      $index: list.length - 1,
      $length: list.length
    })
  } else {
    eval(
      `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
    )
  }
}

// array 删除操作
const delRowForArray = function(data, formValues, item, index) {
  if (data.on && typeof data.on.delete === 'function') {
    data.on.delete({
      row: item,
      $index: index,
      $length: formValues.length
    }, done => {
      if (done) {
        eval(`(formValues.${data.name}).splice(${index}, 1)`)
      }
    })
  } else {
    eval(`(formValues.${data.name}).splice(${index}, 1)`)
  }
}

// table 删除行操作
const delRowForTable = function(data, scope, formValues) {
  if (data.on && typeof data.on.delete === 'function') {
    data.on.delete(scope, done => {
      if (done) {
        eval(`formValues.${data.name}.splice(scope.$index, 1)`)
      }
    })
  } else {
    eval(`formValues.${data.name}.splice(scope.$index, 1)`)
  }
}

// 获取(el-select/el-radio/el-checkbox)数据
const getOptionList = function(data) {
  const { formValues } = this
  const { $item } = data
  return Array.isArray(data.items) ? data.items.map(item => {
    const vifBool = item.vif ? eval(item.vif.replace(/\$model/g, 'formValues')) : true
    return (typeof item === 'string') ? { label: item, value: item } : vifBool ? item : null
  }).filter(Boolean) : typeof data.items === 'object' ? Object.keys(data.items).reduce((prev, next) => {
    prev.push({ label: data.items[next], value: next })
    return prev
  }, []) : []
}

export {
  COMPFLEX_COMPONENTS,
  CUSTOM_TAGS,
  genUnique,
  deepClone,
  getObjectByPath,
  fieldsetComponent,
  slotComponent,
  createTipComponent,
  createLabelTipComponent,
  evalTemplateString,
  createElementBySlot,
  createActionButtons,
  isEqual,
  isEmpty,
  addRow,
  delRowForArray,
  delRowForTable,
  getOptionList,
  validatorRules
}
