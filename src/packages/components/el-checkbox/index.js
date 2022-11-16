import { createElementBySlot, createTipComponent, getOptionList } from '../utils'

export default function(createElement, value, data) {
  const vm = this

  const {
    all = '',
    on = {},
    attrs = {},
    props = {},
    style = {},
    name = '',
    keys = null,
    render = { before: null, after: null }
  } = data

  const items = getOptionList.call(this, data)

  data.checkAll = data.checkAll || []
  data.checkAllDisabled = data.checkAllDisabled || false
  if (!this.inline) style.width = ''

  if (value.length > 0) {
    if (
      value.includes(all) ||
      (all && all !== undefined && value.length === items.length - 1)
    ) {
      const ids = items.map(m => (keys ? m[keys['value']] : m['value']))
      data.checkAll = ids
      value = JSON.parse(JSON.stringify(ids))
    }
  }

  const nodes = [
    createElementBySlot.call(this, createElement, data, 'before'),
    data.type === 'bool' ? createElement(
      'el-checkbox',
      {
        style: { display: data.inline ? 'inline-flex' : '', ...style },
        props: {
          value,
          ...attrs,
          ...props
        },
        on: {
          ...on
        }
      }) : createElement(
      'el-checkbox-group',
      {
        style: { display: data.inline ? 'inline-flex' : '', ...style },
        props: {
          value,
          ...attrs,
          ...props
        },
        on: {
          ...on,
          input(val) {
            // 包含全部选中的逻辑
            if ((all + '').length > 0) {
              const option = []
              items.filter(m => {
                const allValue = keys ? m[keys['value']] : m['value']
                if (allValue === all) {
                  option.push(m)
                }
              })
              if (option.length > 0) {
                if (
                  (val.includes(all) && !data.checkAll.includes(all)) ||
                  (!val.includes(all) &&
                    !data.checkAll.includes(all) &&
                    items.length - 1 === val.length)
                ) {
                  val = []
                  items.forEach((item, index) => {
                    if (data.checkAllDisabled) {
                      item.disabled = index !== 0
                    }
                    val.push(keys ? item[keys['value']] : item['value'])
                  })
                } else if (!val.includes(all) && data.checkAll.includes(all)) {
                  val = []
                  items.forEach(item => {
                    item.disabled = false
                  })
                } else if (val.includes(all)) {
                  val.splice(val.indexOf(all), 1)
                }
                data.checkAll = val
              }
            }
            eval(`vm.formValues.${name} = val`)
          }
        }
      },
      (items || []).map(option => {
        return createElement(
          data.type === 'button' ? 'el-checkbox-button' : 'el-checkbox',
          {
            props: {
              key: option.value,
              disabled: option.disabled,
              label: keys ? option[keys['value']] : option['value']
            },
            style: {
              color: option.color || ''
            }
          },
          keys ? option[keys['label']] : option['label']
        )
      }),
      typeof render.after === 'function'
        ? render.after.call(vm, createElement)
        : []
    ),
    createElementBySlot.call(this, createElement, data, 'after'),
    createTipComponent(createElement, data)
  ]

  return nodes
}
