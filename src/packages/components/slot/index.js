export default function(createElement, value, data) {
  const { model } = this

  let nodes = []
  let rowItem = ''
  const modelPath = data.name.substr(0, data.name.lastIndexOf('.'))

  if (modelPath) {
    rowItem = modelPath.split('.').reduce((prev, next) => {
      return prev ? eval(`prev.${next}`) : ''
    }, model)

    if (rowItem && Object.keys(rowItem).length > 0) {
      nodes = [
        this.$scopedSlots[data.slot]({
          prop: data.name,
          row: rowItem,
          target: rowItem,
          index: data.$index
        })
      ]
    }
  }
  return nodes
}
