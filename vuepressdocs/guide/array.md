
# array[内置组件] 🌟🌟

字段|说明
-|-
$model| $model就是el-form的model
$item| $item是复杂对象(object、array、table)所具有的， 对于object而言$item访问的就是当前对象下的属性，但是对于 array/table 而言$item就是数组里的每个对象。
${key}_$index| 用于 (table、array) 的嵌套场景下，需要用到索引值的逻辑, 比如: arr\_$index
addRowExt | `v1.2.0` 新增时的扩展字段, 比如说：{ id: "", default: false } 🌟


## action 操作 🌟
buttons 字段说明 `v1.2.0` 
字段|说明
-|-
tag| 组件名字
text| 文本
if| (显示/隐藏) 条件，写法: "scope.row.字段"
disabled| (禁用/启用) 条件，写法: "scope.row.字段"
onClick| onClick(scope)，见下面👇文档

scope 字段说明 `v1.2.0` 
字段|说明
-|-
scope| scope 属性值 { row, $index, $length, $addRow, $delRow }

<demo-block>
<example-array-action slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/action.vue
</demo-block>


## 数组索引: ${key}_$index
  

<demo-block>
<example-array-index slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/index.vue
</demo-block>


## 自定义: 增加、删除
  

<demo-block>
<example-array-custom slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/custom.vue
</demo-block>

## 初级
  

<demo-block>
<example-array-demo1 slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/demo1.vue
</demo-block>


## 中级
  

<demo-block>
<example-array-demo2 slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/demo2.vue
</demo-block>


## 高级
  

<demo-block>
<example-array-demo3 slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/demo3.vue
</demo-block>

 
