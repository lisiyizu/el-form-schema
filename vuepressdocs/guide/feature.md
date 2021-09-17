---
pageClass: page-feature
---
# el-form-schema 介绍

## el-form-schema 是什么？  
el-form-schema 是中后台表单解决方案，不仅覆盖了表单的布局、组件联动、校验等场景，还扩展支持 `object`、`array`、`table` 来满足更加复杂的业务场景，旨在让表单开发这件事情变的易用、简单、高效!

## el-form-schema 功能
1. 支持 `element-ui` 所有的表单组件
2. 内置支持 `object`、`array`、`table`，可以高效解决更多复杂的业务场景（此处应该有掌声👏）
3. 内置支持 `slot` 的插槽方式
4. 内置支持给组件设置 inline 行内布局属性，让布局更加灵活
5. 内置支持给 `object`、`array` 设置 `inline` 的方式
6. 支持 `label/slot/title` 设置模板字符串
7. `vif` 在 false 情况下，自动清空组件
8. 支持组件 props 设置联动值
9. `object` 组件内置支持 card 和 fieldset 的布局类型，`array` 内置支持 card 的布局方式。
10. 支持组件之间的复杂联动，支持 vif: `字符串表达式`、props: { disabled: `字符串表达式` }、required: `字符串表达式` 和 rules: { required: `字符串表达式`, message:'必填'}
11. 支持引入自定义组件，如果要实现双向绑定使用（注意：前提该组件实现了`v-model`的语法糖）
12. 支持统一设置组件宽度

## el-form-schema 属性
字段|说明|类型|默认值  
-|-|-|-
schema|schema对象|参考schema对象👇|-
v-model|表单数据对象|el-form-schema 自动收集|-
labelWidth|表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。|string|-
labelPosition|表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width|string|right
labelSuffix|表单域标签的后缀|string|-
expandNumber|[展开/收起]数量,主要用于查询表单的场景|number|-
inline|行内表单模式|boolean|false
size|用于控制该表单内组件的尺寸|string|medium
disabled|是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效|boolean|-
isSearchForm|是否是查询表单|boolean|false
isExpand|是否展开|boolean|false
componentWidth|统一组件宽度|string|240px
useEnterSearch|使用enter按键查询|bool|true
apiConfig|配置接口（专门为 el-select、el-radio、el-checkbox 组件的items数据源配置，详见：[动态数据](http://efs.apidevelop.com/guide/apiConfig.html#apiconfig-%E6%96%B9%E6%B3%95) ）|Function|-

## el-form-schema 方法
方法名|说明|参数
-|-|-
validate|对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise｜Function(callback: Function(boolean, object))
validateField|对部分表单字段进行校验的方法|Function(props: array | string, callback: Function(errorMessage: string))
resetFields|对整个表单进行重置，将所有字段值重置为初始值并移除校验结果|—
clearValidate|移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果|Function(props: array | string)

除了以上el-form的方法，内部还扩展了一个 `validateFieldPromise` 方法(详见用法：[Array->自定义](http://efs.apidevelop.com/guide/array.html#%E8%87%AA%E5%AE%9A%E4%B9%89-%E5%A2%9E%E5%8A%A0%E3%80%81%E5%88%A0%E9%99%A4)，来弥补 validateField 的问题。

## el-form-schema 事件
isSearchForm属性值为true，查询表单会提供 submit 和 reset 2个事件 (详见用法：[布局篇->查询表单布局](http://efs.apidevelop.com/guide/layout.html#查询表单布局)

字段|说明
-|-
submit|提交表单
reset|重置表单
expand|展开/收起

## schema 属性值
字段|说明|类型|默认值  
-|-|-|-
tag|组件名字|el-*(表单组件)、内置组件、自定义组件|-
label|标签文本|string|-
default|默认值|bool/string/number/object/array|-
items|数据项（专门为el-select/el-radio/el-checkbox的属性）|array/object| []
keys|字段映射（专门为el-select/el-radio/el-checkbox的属性）|object| {label:'label',value:'value'}
inline|是否行内布局|boolean|false
vif|是否显示|字符串表达式，比如: vif: "$model.id === 2" |-
rules|验证规范|el-form-item（rules）|-
required|是否必填|el-form-item（required）|-
tip|文字提示|string|-
slot|占位|对象|-
labelWidthComponent|子组件labelWidth|专门为 array/object/table 提供的|-
components|组件集合|专门为 array/object/table 提供的|-
class|类名class|专门为 array/object/table 提供的|-
props|属性值|[vue render](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)（props对象）|-
style|样式|[vue render](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)（style对象）|-
on|事件|[vue render](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)（on对象）|-

## 内置组件
table 组件属性 ([详见](http://efs.apidevelop.com/guide/table.html))
```js
    table: {
      tag: 'table',
      slot: { add: '新增数据', delete: '删除数据' },
      operator: { column: { width: '120px' } },
      // operator: { slot: '占位名称' },
      // showValidate: true, 是否显示验证信息
      components: {
        input: { 
          tag: 'el-input', 
          style: { width: '150px' }, 
          column: { width: '180px', label: '测试1' }, 
          required: true
        },
        select1: {
          tag: 'el-select', 
          style: { width: '150px' },  
          column: { width: '180px', label: '测试4' }, 
          required: true, 
          items: ['测试1', '测试2'] 
        },
        checkbox: { 
          tag: 'el-checkbox', 
          column: { label: '测试5' }, 
          required: true, 
          items: ['a', 'b', 'c'] 
        },
      }
    }
```

object 组件属性 ([详见](http://efs.apidevelop.com/guide/object.html))
```js
    object: {
      tag: 'object',
      inline: true,
      label: '对象',
      required: true,
      // title: '标题',
      // type: 'card | fieldset',
      components: {
        input: { tag: 'el-input', required: true },
        radio: { tag: 'el-radio', items: ['A','B','C'] }
      }
    }
```

array 组件属性 ([详见](http://efs.apidevelop.com/guide/array.html))
```js
    array: {
      tag: 'array',
      label: '数组',
      required: true,
      // title: '测试-$index',
      // type: "card",
      inline: true,
      labelWidthComponents: '100px',
      components: {
        input: { tag: 'el-input', required: true },
        select: { tag: 'el-select', items: ["蛋壳公寓", "原油宝", "优胜教育"] }
      }
    }
```