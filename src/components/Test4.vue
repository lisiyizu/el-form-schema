<!--
 * @Author: your name
 * @Date: 2020-11-23 16:28:02
 * @LastEditTime: 2020-11-24 12:19:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /el-form-schema/src/components/Test2.vue
-->
<template>
	<el-card>
		<!-- <code>{{ model }}</code> -->
		<el-form-schema 
			v-model="model" 
			:schema="schema" 
			:inline="false"
			size="large"
			label-width="100px"
			ref="el-form-schema"
		>
			<el-form-item>
				<el-button type="primary" @click="submitDialog">提交</el-button>
				<el-button @click="resetDialog">重置</el-button>
			</el-form-item>
		</el-form-schema>
	</el-card>
</template>
<script>
import elFormSchema from '../packages/el-form-schema'
export default {
	components: { elFormSchema },
	data () {
		return {
			schema: {
				input1: { tag: 'el-input', inline: true, label: '测试', required: true},
				radio: { tag: 'el-radio', inline: true, label: '测试', required: true, items: ['测试1','测试2','测试3'] },
				select: { tag: 'el-select', label: '测试', required: true, items: ['测试1','测试2','测试3'] },
				obj1: {
					tag: 'object',
					title: '对象测试-obj',
					type: 'fieldset',
					labelWidthComponents: '100px',
					components: {
						input: { tag: 'el-input', inline: true, label: '测试', required: true},
						radio: { tag: 'el-radio', inline: true, label: '测试', required: true, items: ['测试1','测试2','测试3'] },
						arr: {
							tag: 'array',
							label: '测试', 
							inline: true,
							components: {
								input: { tag: 'el-input', required: true},
								select: { tag: 'el-select', inline: true, required: true, items: ['测试1','测试2','测试3'] },
							}
						}
					}
				},
				obj2: {
					tag: 'object',
					title: '对象测试-obj',
					type: 'card',
					labelWidthComponents: '100px',
					components: {
						input: { tag: 'el-input', label: '测试', required: true},
						radio: { tag: 'el-radio', label: '测试', required: true, items: ['测试1','测试2','测试3'] },
						arr: {
							tag: 'array',
							label: '测试',
							inline: true,
							components: {
								input: { tag: 'el-input', required: true}
							}
						},
						input2: { tag: 'el-input', label: '测试', required: true},
					}
				},
				arr: {
					tag: 'array',
					title: '对象测试-obj',
					type: 'card',
					labelWidthComponents: '100px',
					components: {
						input: { tag: 'el-input', label: '测试', required: true},
						radio: { tag: 'el-radio', label: '测试', required: true, items: ['测试1','测试2','测试3'] },
						arr: {
							tag: 'array',
							label: '测试',
							inline: true,
							components: {
								input: { tag: 'el-input', required: true}
							}
						}
					}
				}
			},
			model: {}
		};
	},
	methods: {
		arrayData (count) {
			return Array(count).fill({}).map((item, index) => ({ label: `测试-${index + 1}`, value: index + 1 }))
		},
		submitDialog() {
			this.$refs['el-form-schema'].validate(valid=>{
				alert(valid);
			});
		},
		resetDialog() {
			this.$refs['el-form-schema'].resetFields();
		}
	},
	mounted () {
		// setTimeout(() => {
			// this.schema = {
			// 	input1: { tag: 'el-input', inline: true, label: '测试', required: true},
			// 	radio: { tag: 'el-radio', inline: true, label: '测试', required: true, items: ['测试1','测试2','测试3'] },
			// 	select: { tag: 'el-select', label: '测试', required: true, items: ['测试1','测试2','测试3'] },
			// 	obj1: {
			// 		tag: 'object',
			// 		title: '对象测试-obj',
			// 		type: 'fieldset',
			// 		labelWidthComponents: '100px',
			// 		components: {
			// 			input: { tag: 'el-input', inline: true, label: '测试', required: true},
			// 			radio: { tag: 'el-radio', inline: true, label: '测试', required: true, items: ['测试1','测试2','测试3'] },
			// 			arr: {
			// 				tag: 'array',
			// 				label: '测试', 
			// 				inline: true,
			// 				components: {
			// 					input: { tag: 'el-input', required: true},
			// 					select: { tag: 'el-select', inline: true, required: true, items: ['测试1','测试2','测试3'] },
			// 				}
			// 			}
			// 		}
			// 	},
			// 	obj2: {
			// 		tag: 'object',
			// 		title: '对象测试-obj',
			// 		type: 'card',
			// 		labelWidthComponents: '100px',
			// 		components: {
			// 			input: { tag: 'el-input', label: '测试', required: true},
			// 			radio: { tag: 'el-radio', label: '测试', required: true, items: ['测试1','测试2','测试3'] },
			// 			arr: {
			// 				tag: 'array',
			// 				label: '测试',
			// 				inline: true,
			// 				components: {
			// 					input: { tag: 'el-input', required: true}
			// 				}
			// 			},
			// 			input2: { tag: 'el-input', label: '测试', required: true},
			// 		}
			// 	},
			// 	arr: {
			// 		tag: 'array',
			// 		title: '对象测试-obj',
			// 		type: 'card',
			// 		labelWidthComponents: '100px',
			// 		components: {
			// 			input: { tag: 'el-input', label: '测试', required: true},
			// 			radio: { tag: 'el-radio', label: '测试', required: true, items: ['测试1','测试2','测试3'] },
			// 			arr: {
			// 				tag: 'array',
			// 				label: '测试',
			// 				inline: true,
			// 				components: {
			// 					input: { tag: 'el-input', required: true}
			// 				}
			// 			}
			// 		}
			// 	}
			// }
		// }, 2000);
	}
}
</script>