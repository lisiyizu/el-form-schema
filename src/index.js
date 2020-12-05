import elFormSchema from './packages/el-form-schema'
const install = function (Vue) {
  if (install.installed) return
  if (!Vue.prototype.$ELEMENT) {
    throw new Error('请先安装element-ui')
  }
  Vue.component('el-form-schema', elFormSchema)
  install.installed = true
}
if (window && window.Vue) {
  install(window.Vue)
}
export default { install }