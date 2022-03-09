import { createElementBySlot, createTipComponent, getOptionList } from '../utils'

export default function(createElement, value, data) {
  const {
    on = {},
    attrs = {},
    props = {},
    style = {},
    keys = null,
    scopedSlots = null
  } = data

  const items = getOptionList(data)

  const createOption = (list) => {
    return (list || []).map(option => createElement(
      'el-option',
      {
        style: { minWidth: style.width },
        props: {
          key: option.value,
          disabled: option.disabled,
          label: keys ? option[keys['label']] : option['label'],
          value: keys ? option[keys['value']] : option['value']
        },
        scopedSlots: typeof scopedSlots === 'function' ? scopedSlots(createElement, option) : null
      },
      null
    ))
  }

  const nodes = [
    createElementBySlot.call(this, createElement, data, 'before'),
    createElement(
      'el-select',
      {
        props: {
          value,
          placeholder: props.placeholder || '请选择',
          ...attrs,
          ...props
        },
        style: { ...style },
        on: { ...on }
      },
      data.group ? items.map(option => createElement(
        'el-option-group', {
          props: {
            label: option[data.group.label || 'label']
          }
        }, createOption(option[data.group.children || 'options'])
      )) : createOption(items)
    ),
    createElementBySlot.call(this, createElement, data, 'after'),
    createTipComponent(createElement, data)
  ]

  return nodes
}
