<!--
 * @Author: your name
 * @Date: 2020-11-19 11:30:58
 * @LastEditTime: 2020-11-25 19:22:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /el-form-schema/src/components/example.vue
-->
<template>
		<el-form-schema v-model="model" ref="el-form-schema" :debug="false" :inline="false" type="card" :schema="schema" label-width="80px">
			<template slot="arr.components.date" slot-scope="scope">
				<el-form-item :prop="scope.prop" :rules="{required: true, message: '必填'}">
					<el-date-picker v-model="scope.row.date" value-format="yyyy-MM-dd" type="date" placeholder="日期"></el-date-picker>
				</el-form-item>
			</template>
			<el-form-item>
				<el-button @click="submit">提交</el-button>
				<el-button @click="reset">重置</el-button>
			</el-form-item>
		</el-form-schema>
</template>
<script>
import elFormSchema from '../packages/el-form-schema'
export default {
	data () {
		return {
			schema: {},
			model: {}
		}
	},
	methods: {
		initSchemaForm () {
			this.schema = {
				email: {
					tag: 'el-input',
					label: '邮箱',
					tip: '123',
					rules: [{ type: 'email', message: '请输入有效格式' }, { required: true, message: '必填' }],
					items: this.arrayData(2)
				},
				date: { tag: 'el-date-picker', label: '日期', props: { type: 'date' } },
				daterange: { tag: 'el-date-picker', label: '日期区间', required: true, props: { type: 'daterange' } },
				select: { tag: 'el-select', label: '下拉单选', keys: { label: 'name', value: 'id' }, items: [{ id: 1, name: '测试1' }, { id: 2, name: '测试2' }] },
				multiselect: { tag: 'el-select', label: '下拉多选', props: { multiple: true }, keys: { label: 'name', value: 'id' }, items: [{ id: 1, name: '测试1' }, { id: 2, name: '测试2' }] },
				arr: {
					tag: 'array',
					label: '方案',
					slot: { add: '新增域名', delete: '删除域名' },
					type: 'card',
					title: '方案$index',
					minLimit: 1,
					labelWidthComponents: '100px',
					components: {
						email: { tag: 'el-input', label: '测试', required: true, tip: '123' },
						check: { tag: 'el-checkbox', required: true, items: this.arrayData(2) },
						radio: { tag: 'el-radio', required: true, items: this.arrayData(3) },
						date: { tag: 'slot', slot: 'arr.components.date' },
						obj: {
							tag: 'object',
							labelWidth: '100px',
							label: '测试',
							inline: true,
							components: {
								email: { tag: 'el-input', required: true, tip: '123' },
								check: { tag: 'el-checkbox', required: true, items: this.arrayData(2) }
							}
						},
						input: { tag: 'el-input', label: '日期', required: true },
						arr: {
							tag: 'array',
							inline: true,
							labelWidth: '0px',
							labelWidthComponents: '60px',
							components: {
								input: { tag: 'el-input', label: '日期', required: true },
								date: { tag: 'el-date-picker', label: '日期', props: { type: 'date' } },
							}
						},
						add: {
							tag: 'el-button', 
							slot: '新增',
							style: { width: '90px' },
							on: { 
								click : (row, index) => {
									this.$refs['el-form-schema'].validateField([`arr[${index}]`], valid => console.log(valid))
                  console.log(row, index)
								}
							}
						}
					}
				}
			}
		},
		arrayData (count) {
			return Array(count).fill({}).map((item, index) => ({ label: `测试-${index + 1}`, value: index + 1 }))
		},
		submit (data) {
			console.log(data);
			this.$refs['el-form-schema'].validate((val, model) => {
				console.log(val, model);
				if (val) {
					this.$message.success('提交完毕!');
				} else {
					this.$message.warning('请先完成必填项~');
				}
			})
		},
		reset () {
			this.$refs['el-form-schema'].resetFields();
		}
	},
	components: { elFormSchema },
	mounted () {
		this.initSchemaForm();
		this.$nextTick(() => {
			this.model["email"] = '123@qq.com';
			this.model["daterange"] = ["2020-11-10", "2020-12-14"];
		})
	}
}

</script>

<style>
h1 {
	font-size: 1.7em;
	text-align: center;
	margin-top: 0;
	margin-bottom: 0.2em;
}

h1 + p {
	display: block;
	text-align: center;
	margin-bottom: 1.2em;
}

small {
	line-height: 20px;
	display: block;
}

.el-alert {
	margin-bottom: 15px;
	padding-left: 10px;
}
</style>
