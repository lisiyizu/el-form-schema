export default function(createElement, value, data, style = {}) {
  const hasCollapse = (typeof data.collapse === 'boolean')
  return createElement(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        ...style,
        ...(!hasCollapse || data.collapse ? {
          borderBottom: '1px solid #E6E7EB',
          paddingBottom: '5px',
          marginBottom: '20px',
          cursor: hasCollapse ? 'pointer' : ''
        } : {
          marginBottom: '0px',
          cursor: 'pointer'
        })
      },
      on: hasCollapse ? {
        click: () => {
          data.collapse = !data.collapse
        }
      } : null
    },
    [
      data.iconClass ? createElement('i', {
        class: data.iconClass,
        style: { fontSize: '20px' }
      }) : createElement('span', {
        style: {
          borderLeft: `4px solid ${data.color || '#409FFF'}`,
          width: '0px',
          height: '16px',
          lineHeight: '16px'
        }
      }),
      createElement(
        'span',
        {
          style: {
            paddingLeft: '5px',
            color: '#333333',
            fontSize: '17px'
          }
        },
        data.title
      ),
      hasCollapse ? createElement(
        'i',
        {
          class: { 'el-icon-arrow-down': data.collapse, 'el-icon-arrow-right': !data.collapse },
          style: {
            paddingLeft: '10px',
            color: '#606266',
            fontSize: '18px'
          }
        }
      ) : null,
      data.slot && data.slot.right
        ? createElement(
          'div',
          {
            style: {
              paddingLeft: '5px',
              color: '#333333',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              flex: 1
            }
          },
          data.slot.right
        )
        : []
    ]
  )
}
