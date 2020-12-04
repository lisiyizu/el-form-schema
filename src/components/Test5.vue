<!--
 * @Author: your name
 * @Date: 2020-11-23 16:28:02
-->
<template>
	<div>
		<code>{{model}}</code>
		<el-form-schema v-model="model" :schema="schema" :inline="false" :debug="false" type="card" size="small" component-width="130px" ref="el-form-schema">
			<el-form-item>
				<el-button type="primary" @click="submitDialog">提交</el-button>
				<el-button @click="resetDialog">重置</el-button>
			</el-form-item>
		</el-form-schema>
	</div>
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
		submitDialog () {
			this.$refs['el-form-schema'].validate(valid => {
				alert(valid);
			});
		},
		delTableRow (index) {
			this.model.arr.splice(index, 1);
		},
		resetDialog () {
			this.$refs['el-form-schema'].resetFields();
		}
	},
	mounted () {
		setTimeout(() => {
			this.schema = {
				arr: {
					tag: 'table',
					title: '列表测试-table',
					minLimit: 1,
					maxLimit: 10,
					showValidate: false,
					components: {
						input: { tag: 'el-input', column: { width: '180px', label: '测试1' }, required: true},
						radio: { tag: 'el-radio', column: {  label: '测试2' }, required: true, items: ['测试1', '测试2' ] },
						obj: {
							tag: 'object',
							inline: true,
							column:{ width: '340px', label: '测试3' },
							components: {
								date: { 
									tag: 'el-date-picker', 
									props: { type: "date" }, 
									required: true, 
									slot: { after: '-' },
									on: {
										changeModel: ({ $item, $index }) => {
											$item.select = 'b';
											this.model.arr[$index].select1 = 'a';
										}
									}
								},
								select: { tag: 'el-select', props: { disabled: '!$model.arr[$index].radio || !$item.date' }, required: true, items: ['a', 'b'] },
							}
						},
						select1: { tag: 'el-select', column: { width: '160px', label: '测试4' },  required: true, items: ['a', 'b' ] },
						select2: { tag: 'el-select', column: { width: '160px', label: '测试5' }, required: true, items: ['测试1', '测试2' ] },
						select3: { tag: 'el-select', column: { width: '160px', label: '测试6' }, required: true, items: ['测试1', '测试2' ] }
					}
				}
			}
		}, 1000);
	}
}
</script>