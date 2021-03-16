
# Array[内置组件]

字段|说明
-|-
$model| $model就是el-form的model
$item| $item是复杂对象(object、array、table)所具有的， 对于object而言$item访问的就是当前对象下的属性，但是对于 array/table 而言$item就是数组里的每个对象。
${key}_$index| 用于 (table、array) 的嵌套场景下，需要用到索引值的逻辑, 比如: arr\_$index

## 数组索引: ${key}_$index

<demo-block>
<example-array-index slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/array/index.vue
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

 
