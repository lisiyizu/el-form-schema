/*
 * @Author: liwei
 * @Date: 2020-11-11 19:54:06
 * @Description: 下拉组件
 */
export default function(createElement, value, data) {
  const { model } = this;

  let nodes = [],
    rowItem = "",
    modelPath;

  modelPath = data.name.substr(0, data.name.lastIndexOf("."));

  if (modelPath) {
    rowItem = modelPath.split(".").reduce((prev, next) => {
      return prev ? eval(`prev.${next}`) : "";
    }, model);

    if (rowItem && Object.keys(rowItem).length > 0) {
      nodes = [
        this.$scopedSlots[data.slot]({
          prop: data.name,
          row: rowItem,
          index: data.$index
        })
      ];
    }
  }
  return nodes;
}
