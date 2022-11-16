import elFormSchema from './packages/index.vue'
import elInputNumber from './packages/components/el-input.number/index.vue'

const install = function(Vue, opts = {}) {
  Vue.prototype.$EFS = {
    size: opts.size || 'small',
    isExpand: opts.isExpand,
    componentWidth: opts.componentWidth || '220px',
    labelSuffix: opts.labelSuffix || '',
    submitProps: opts.submitProps || {},
    resetProps: opts.resetProps || {},
    expandProps: opts.expandProps || {}
  }
  if (install.installed) return
  if (!Vue.prototype.$ELEMENT) {
    throw new Error('请先安装element-ui')
  }
  Vue.component('el-input-num', elInputNumber)
  Vue.component('el-form-schema', elFormSchema)
  install.installed = true
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default { install }
