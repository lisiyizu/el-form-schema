<h1 align="center">el-form-schema</h1>

<p align="center">el-form-schema 是中后台表单解决方案，不仅覆盖了表单的布局、组件联动、校验等场景，还扩展支持 object、array、table 来满足更加复杂的业务场景，旨在让表单开发这件事情变的易用、简单、高效!</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@kummy/el-form-schema.svg?style=flat" alt="npm version" />
  <img src="https://img.shields.io/npm/dt/@kummy/el-form-schema.svg?style=flat&color=63ba83" alt="npm download" />
</p>

## Document
vuepress地址：[http://efs.apidevelop.com](http://efs.apidevelop.com)

## Features

- 支持 element-ui 所有的表单组件
- 内置支持 object、array、table、el-input-num，可以高效解决更多复杂的业务场景（此处应该有掌声👏）
- 内置支持 slot 的插槽方式
- 内置支持给组件设置 inline 行内布局属性，让布局更加灵活
- 内置支持给 object、array 设置 inline 的方式
- 支持 destruct 字段解构
- 支持 initValue 初始化值操作
- 支持 label/slot/title 设置模板字符串
- vif 在 false 情况下，自动清空组件
- 支持组件 props 设置联动值
- object 组件内置支持 card 和 fieldset 的布局类型，array 内置支持 card 的布局方式。
- 支持组件之间的复杂联动，包括 vif: '表达式字符串'、inline: '表达式字符串'、required: '表达式字符串'、props: { disabled: '表达式字符串' }、 通过表达式字符串去做联动
- 支持引入自定义组件，如果要实现双向绑定使用（注意：前提该组件实现了v-model的语法糖）
- 支持统一设置组件宽度
- 支持 enter 按键触发查询
## Install

```bash
  npm install @kummy/el-form-schema
  yarn add @kummy/el-form-schema
```

```js
  import Vue from 'vue'
  import elementUI from 'element-ui'
  import elFormSchema from '@kummy/el-form-schema'

  Vue.use(elementUI)
  Vue.use(elFormSchema)
  // 统一选项设置
  // Vue.use(elFormSchema, { 
  //   size: 'small', 
  //   isExpand: false,
  //   componentWidth: '240px',
  //   submitProps: { type: 'primary', icon: 'el-icon-search' },
  //   resetProps: { type: 'warning', icon: 'el-icon-refresh-left' }
  //   epxandProps: { type: 'default' }
  // })
```