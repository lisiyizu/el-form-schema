<!--
 * @Author: your name
 * @Date: 2020-11-23 16:28:02
 * @LastEditTime: 2020-11-24 15:24:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /el-form-schema/src/components/Test2.vue
-->
<template>
	<el-card>
		<code>{{ model }}</code>
		<el-form-schema v-model="model" ref="el-form-schema" label-suffix=":" :debug="false" :schema="schema" :inline="false" label-width="180px">
			<el-form-item>
				<el-button type="primary" @click="dialogVisible=true" >弹窗</el-button>
			</el-form-item>
		</el-form-schema>
		<el-dialog
			title="ceshi"
			width="880px"
			:visible.sync="dialogVisible">
				<el-form-schema v-model="dialogForm" ref="el-form-dialog" :schema="dialogSchema" :inline="false" label-width="110px" component-width="150px">
					<el-form-item>
						<el-button type="primary" @click="submitDialog">提交</el-button>
						<el-button @click="resetDialog">重置</el-button>
					</el-form-item>
				</el-form-schema>
		</el-dialog>
	</el-card>
</template>
<script>
import elFormSchema from '../packages/el-form-schema'
export default {
	components: { elFormSchema },
	data () {
		return {
			dialogVisible: false,
			dialogForm: {},
			dialogSchema: {
					activeDate: {
						tag: 'array',
						label: '活动时间',
						inline: true,
						required: true,
						minLimit: 1,
						maxLimit: 3,
						components: {
							date1: { tag: 'el-date-picker', props: { type: 'date' }, slot: { after: '-' } },
							date2: { tag: 'el-time-select', required: true }
						}
					},
					table2: {
						tag: 'table',
						label: '列表测试-table',
						operator: { props: { fixed: 'right' } },
						isMarginBottom: false,
						components: {
							input: { tag: 'el-input', column: { label: '测试1' }, style:{ width: '100'}, required: true},
							radio: { tag: 'el-select', column: { label: '测试2' },  style:{ width: '100'}, required: true, items: this.arrayData(2) },
							select1: { tag: 'el-select', column: { label: '测试3' },  style:{ width: '100'}, required: true, items: ['测试1', '测试2' ] },
							select2: { tag: 'el-select', column: { label: '测试4' },  style:{ width: '100'}, required: true, items: ['测试1', '测试2' ] },
							select3: { tag: 'el-select', column: { label: '测试5' }, style:{ width: '100'}, required: true, items: ['测试1', '测试2' ] }
						}
					},
					delivery: { tag: 'el-input', label: '即时配送' },
					type: { tag: 'el-checkbox', label: '特殊资源', items: this.arrayData(3), required: true },
			},
			schema: {
				name: { tag: 'span', label: '测试', default: '123' },
				region: { tag: 'el-select', label: '活动区域', required: true, items: [] },
				c: { tag: 'el-switch', label: '即时配送' },
				activeDate: {
					tag: 'object',
					label: '活动时间',
					inline: true,
					required: true,
					components: {
						date1: { tag: 'el-date-picker', props: { type: 'date' }, slot: { after: '-' } },
						date2: { tag: 'el-time-select', required: true }
					}
				},
				delivery: { tag: 'el-switch', label: '即时配送' },
				type: { tag: 'el-checkbox', label: '特殊资源', items: this.arrayData(3), required: true },
				resource: { tag: 'el-radio', label: '特殊资源', items: this.arrayData(3), required: true },
				desc: { tag: 'el-input', label: '活动形式', required: true }
			},
			model: {}
		};
	},
	methods: {
		arrayData (count) {
			return Array(count).fill({}).map((item, index) => ({ label: `测试-${index + 1}`, value: index + 1 }))
		},
		submitForm () {
			this.$refs['el-form-schema'].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		submitDialog() {
			this.$refs['el-form-dialog'].validate(valid=>{
				alert(valid);
			});
		},
		resetDialog() {
			this.$refs['el-form-dialog'].resetFields();
		}
	},
	mounted () {
		setTimeout(() => {
			this.model.id = "12322"
		}, 2000);
	}
}
</script>