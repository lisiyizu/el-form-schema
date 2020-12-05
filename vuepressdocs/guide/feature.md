# el-form-schema 介绍

## el-form-schema 是什么？  
el-form-schema 是基于elemen-ui封装的中后台表单解决方案，旨在让表单开发这件事情变得简单高效！

## el-form-schema 功能
1. 支持 element-ui 所有的表单组件
2. 内置支持 object、array、table，可以高效解决更多复杂的业务场景（此处应该有掌声👏）
3. 内置支持 slot 的插槽方式
4. 内置支持给组件设置 inline 行内布局属性，让布局更加灵活
5. 内置支持给 object、array 设置 inline 的方式
6. object 组件内置支持 card 和 fieldset 的布局类型，array 内置支持 card 的布局方式。
7. 支持组件之间的复杂联动，支持 vif: "字符串表达式" 和 props: { disabled: "字符串表达式" }
8. 支持引入自定义组件，如果要实现双向绑定使用（注意：前提该组件实现了v-model的语法糖）
9. 支持统一设置组件宽度

## el-form-schema 属性
字段|说明|类型|默认值  
-|-|-|-
schema|schema对象|参考schema对象👇|-
v-model|表单数据对象|el-form-schema 自动收集|-
labelWidth|表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。|string|-
labelPosition|表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width|string|right
labelSuffix|表单域标签的后缀|string|-
inline|行内表单模式|boolean|false
size|用于控制该表单内组件的尺寸|string|medium
disabled|是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效|boolean|-
isSearchForm|是否是查询表单|boolean|false
componentsWidth|统一组件宽度|string|240px

## el-form-schema 事件
isSearchForm属性值为true，查询表单会提供 submit 和 reset 2个事件

字段|说明
-|-
submit|提交表单
reset|重置表单

## schema 属性值
字段|说明|类型|默认值  
-|-|-|-
tag|组件名字|el-*(表单组件)、内置组件、自定义组件|-
label|标签文本|string|-
default|默认值|bool/string/number/object/array|-
inline|是否行内布局|boolean|false
vif|是否显示|字符串表达式，比如: vif: "$model.id === 2" |-
rules|验证规范|el-form-item（rules）|-
required|是否必填|el-form-item（required）|-
tip|文字提示|string|-
slot|占位|对象|-
props|属性值|vue render（props对象）|-
style|样式|vue render（style对象）|-
on|事件|vue render（on对象）|-

## 内置组件
组件|说明|使用方式 
-|-|-
object|对象组件|-
array|数组组件|-
table|列表组件|-