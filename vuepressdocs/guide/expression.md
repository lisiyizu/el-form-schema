# 联动篇

字段|说明
-|-
$model| $model就是el-form的model
$item| $item是复杂对象(object、array、table)所具有的， 对于object而言$item访问的就是当前对象下的属性，但是对于 array/table 而言$item就是数组里的每个对象。

## required 联动
目前只支持：rules: { required: '$model.radio', message: 'hello' } 和 required: '$model.input' 方式，不支持 rules 数组的形式

<demo-block>
<example-expression-required slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/expression/required.vue
</demo-block>

## vif 联动
  

<demo-block>
<example-expression-vif slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/expression/vif.vue
</demo-block>

## disabled 联动 
  

<demo-block>
<example-expression-disabled slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/expression/disabled.vue
</demo-block>

## 复杂联动
  

<demo-block>
<example-expression-complex slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/expression/complex.vue
</demo-block>