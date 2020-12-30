import elFormSchema from './packages/el-form-schema.vue'
const install = function (Vue, opts = {}) {
  Vue.prototype.$EFS = {
    size: opts.size || 'small',
    componentWidth:  opts.componentWidth || '220px',
    labelSuffix: opts.labelSuffix || '',
  };
  if (install.installed) return
  if (!Vue.prototype.$ELEMENT) {
    throw new Error('请先安装element-ui')
  }
  Vue.component('el-form-schema', elFormSchema)
  install.installed = true
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default { install }