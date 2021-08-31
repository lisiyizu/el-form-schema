export default function(createElement, value, data) {
  const {
    on = {},
    attrs = {},
    props = {},
    style = {}
  } = data
  return createElement('span', {
    style: {
      minWidth: style.width,
      display: 'block',
      fontSize: '15px',
      color: '#777777',
      ...style
    },
    attrs: { ...attrs },
    props: { ...props },
    on: { ...on }
  }, value)
}
