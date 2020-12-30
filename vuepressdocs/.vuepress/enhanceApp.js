import elementUI from 'element-ui';
import elFormSchema from '../../npm/dist'
import 'element-ui/lib/theme-chalk/index.css'
import DemoBlock from './components/demo-block'

export default ({Vue}) => {
  Vue.use(elementUI)
  Vue.use(elFormSchema, { size: 'small', componentWidth: '240px' })
  Vue.component('demo-block', DemoBlock)
}