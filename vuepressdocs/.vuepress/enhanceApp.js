import elementUI from 'element-ui';
import elFormSchema from '../../src'
import 'element-ui/lib/theme-chalk/index.css'
import DemoBlock from './components/demo-block'

export default ({Vue}) => {
  Vue.use(elementUI)
  Vue.use(elFormSchema, { 
    size: 'small',
    componentWidth: '240px',
    submitProps: { type: 'primary', icon: 'el-icon-search' },
    resetProps: { type: 'warning', icon: 'el-icon-refresh-left' }
  })
  Vue.component('demo-block', DemoBlock)
}