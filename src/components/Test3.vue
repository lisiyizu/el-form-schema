<!--
 * @Author: your name
 * @Date: 2020-11-23 16:28:02
 * @LastEditTime: 2020-11-24 12:19:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /el-form-schema/src/components/Test2.vue
-->
<template>
		<el-form-schema 
			v-model="model" 
			:schema="schema" 
			:inline="true" 
			:is-search-form="true" 
			type="card" 
			label-width="130px"
			@submit="submitForm"
		>
		</el-form-schema>
</template>
<script>
import elFormSchema from '../packages/el-form-schema'
export default {
	components: { elFormSchema },
	data () {
		return {
			schema: {},
			model: {}
		};
	},
	methods: {
		arrayData (count) {
			return Array(count).fill({}).map((item, index) => ({ label: `测试-${index + 1}`, value: index + 1 }))
		},
		submitForm (valid) {
			if (valid) {
				alert('submit!');
			} else {
				console.log('error submit!!');
				return false;
			}
		}
	},
	mounted () {
		setTimeout(() => {
			this.schema = {
				a: { tag: 'el-select', label: '商户', items: ['测试1','测试2','测试3'] },
				b: { tag: 'el-checkbox', label: '下拉框', all: '全部', items: ['全部', '测试1'] },
				c: { tag: 'el-date-picker', label: '日期'},
				d: { tag: 'el-time-select', label: '时间段'},
				e: { tag: 'el-input', label: '输入框' },
				f: { tag: 'el-input', label: '输入框' },
				g: { tag: 'el-input', label: '输入框' },
				h:  { tag: 'el-date-picker', props: { type: 'daterange' }, label: '日期' }
			}
		}, 2000);
	}
}
</script>