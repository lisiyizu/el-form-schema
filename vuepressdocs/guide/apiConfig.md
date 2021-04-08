# 动态设置items 🌟

## apiConfig/$config
apiConfig 是给 el-checkbox、el-radio、el-select 组件的来获取异步数据源的方法， 此时支持 items: "$config.foo" 的方式去监听异步数据。

<demo-block>
<example-apiConfig-demo slot="source"/>
<<< @/vuepressdocs/.vuepress/components/example/apiConfig/demo.vue
</demo-block>
