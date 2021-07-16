import { Component } from "../index";
import CardComponent from "../card";
import { createElementBySlot, fieldsetComponent, deepClone } from "../utils";

export default function(createElement, value, data) {
  const componentsList = Object.keys(data.components);
  // eslint-disable-next-line no-unused-vars
  const  { model } = this;
  let isStartInline = false;
  const allComponent = componentsList.map((key, index) => {
    data.components[key].$index = data.$index;
    data.components[key].labelWidth = data.labelWidthComponents || "0px";
    if (index === 0) {
      isStartInline = true;
    } else if (index === 0 && data.inline) {
      data.components[key].style.marginTop = '22px';
    } 
    if(data.components[key].tag == 'array' && componentsList.length === index+1) {
      data.components[key].isMarginBottom = '0px';
    } else if (componentsList.length === index+1 && !data.inline) {
      // data.components[key].style.marginBottom = !data.type ? '0px' : '0px';
    }
    this.$set(data.components[key], "$item", eval(`model.${data.name}`));
    const componentDataCopy = deepClone(data.components[key]);
    return Component(createElement, this, `${data.name}.${key}`, componentDataCopy);
  });
  const card = list => {
    return [
      createElement(
        "div",
        {
          style: {
            border:  data.border ? "1px solid #dddddd" : null,
            padding: "6px"
          }
        },
        [CardComponent(createElement, value, data, { marginBottom: `${ isStartInline? '20px' : '20ox' }` }), list]
      ),
      data.endDivider ? createElement(
        "el-divider",{
          attrs: {
            style: 'margin-top: 0px; margin-bottom: 32px;'
          },
        }
      ): null
    ];
  };

  const divider = list => {
    return [
      createElement(
        "el-divider",
        {
          attrs: {
            style: 'margin-top: 10px'
          },
          props: {
            contentPosition: data.contentPosition || "left"
          }
        },
        data.title
      ),
      list,
      data.endDivider ? createElement(
        "el-divider",{
          attrs: {
            style: 'margin-top: 6px'
          },
        }
      ): null
    ];
  };

  let types = {
    "divider": ()=> divider(allComponent),
    "card": () => card(allComponent), 
    "fieldset": () => fieldsetComponent(createElement, data, allComponent)
  }

  let nodes = types[data.type] ? types[data.type]() : allComponent;

  nodes = [
    createElementBySlot(createElement, data, "before"),
    createElement(
      "div",
      {
        class: { "el-form--inline": data.inline },
        style: { marginBottom: data.inline && !data.type ? "-22px" : "", ...data.style }
      },
      nodes
    ),
    createElementBySlot(createElement, data, "after")
  ];
  return nodes;
}
