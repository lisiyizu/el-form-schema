import { Component } from '../index'
import { createElementBySlot, deepClone, addRow,  delRowForTable, createActionButtons, genUnique } from '../utils'


export default function(createElement, value, data) {
  // eslint-disable-next-line no-unused-vars
  const { formValues } = this
  const listValues = eval(`formValues.${data.name}`)
  data.slot = data.slot || {}
  data.style = data.style || { marginBottom: !data.showValidate ? '' : '22px' }
  data.operator = data.operator || {}
  const operatorColumnProps = Object.assign(
    {
      label: '操作',
      width: '100px'
    },
    data.operator.column || {}
  )
  const lastCom = data.components[Object.keys(data.components).pop()]
  const createTableColumns = () => {
    return Object.keys(data.components)
      .map((key) => {
        if (data.components[key].tag === 'action') return null
        return createElement('el-table-column', {
          props: data.components[key].column || {},
          scopedSlots: {
            default: scope => {
              data.components[key].labelWidth = data.components[key].labelWidth || data.labelWidthComponents || '0px'
              data.components[key].showValidate = !data.showValidate
              data.components[key].$index = scope.$index
              data.components[key].$item = scope.row
              const componentDataCopy = deepClone(data.components[key])
              delete componentDataCopy.label
              return [
                Component(
                  createElement,
                  this,
                  // 这里一定要用 [${index}] ( 原因：eval('data.0.name') 会报错）
                  `${data.name}[${scope.$index}].${key}`,
                  componentDataCopy
                )
              ]
            },
            header: scope => {
              return [
                createElement('span', { style: { color: '#f56c6c' }}, data.components[key].required ? '*' : ''),
                createElement('span', scope.column.label)
              ]
            }
          }
        })
      }).concat(createElement('el-table-column', {
        props: (lastCom.tag === 'action') ? lastCom.column : operatorColumnProps,
        scopedSlots: {
          default: scope => {
            return data.operator.slot
              ? this.$scopedSlots[data.operator.slot]({
                delDisabled: listValues.length === data.minLimit,
                addDisabled: listValues.length === data.maxLimit,
                ...scope
              })
              : createElement('el-form-item', {
                style: {
                  marginBottom: data.showValidate ? '22px' : '0px'
                }
              },
              // 自定义操作
              (lastCom.tag === 'action') ? createActionButtons.call(this, {
                h: createElement,
                action: lastCom,
                component: data,
                scope: { ...scope, $length: listValues.length },
              }) : [createElement(
                'el-button',
                {
                  props: {
                    disabled: this.disabled || listValues.length === data.minLimit
                  },
                  on: {
                    click: () => {
                      delRowForTable(data, scope, formValues);
                    }
                  }
                },
                typeof data.slot.delete === 'string' ? data.slot.delete : '删除'
              )])
          }
        }
      }))
  }

  // 数组最小限制
  if (data.minLimit > 0 && listValues.length === 0 && data.vifBool) {
    for (let i = 1; i <= data.minLimit; i++) {
      eval(
        `formValues.${data.name}.push(JSON.parse(JSON.stringify(data.keys)))`
      )
    }
  }

  // 设置 $key 作为 rowKey
  listValues.forEach(item => {
    if (!item.$key) {
      this.$set(item, '$key', genUnique())
    }
  })

  const nodes = [
    createElement(
      'el-table',
      {
        props: {
          data: listValues,
          size: 'small',
          border: true,
          rowKey: '$key',
          headerCellStyle: { fontSize: '13px', background: '#f9f9f9', padding: '2px 0' },
          ...data.props
        },
        style: {
          width: '100%'
        }
      },
      [
        data.showIndex ? createElement('el-table-column', { props: { type: 'index', align: 'center' }}) : null,
        createTableColumns()
      ]
    ),
    createElement(
      'div',
      {
        style: {
          background: '#f9f9f9',
          padding: '1px 0 1px 20px',
          borderBottom: '1px solid #EBEEF5',
          borderLeft: '1px solid #EBEEF5',
          borderRight: '1px solid #EBEEF5'
        }
      },
      [
        createElement(
          'el-link',
          {
            props: {
              icon: 'el-icon-plus',
              underline: false,
              disabled: this.disabled || listValues.length === data.maxLimit
            },
            on: {
              click() {
                addRow(data, formValues);
              }
            }
          },
          typeof data.slot.add === 'string' ? data.slot.add : '新增'
        ),
        data.maxLimit > 0
          ? createElement(
            'span',
            { style: { color: '#f56c6c' }},
            `（注意：当前限制最多${data.maxLimit}条数据）`
          )
          : null
      ]
    )
  ]

  return [
    createElementBySlot(createElement, data, 'before'),
    createElement(
      'div',
      {
        style: { ...data.style },
        class: { [data.class || '']: true }
      },
      nodes
    ),
    createElementBySlot(createElement, data, 'after')
  ]
}
