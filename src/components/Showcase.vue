<!--
 * @Author: your name
 * @Date: 2020-11-24 17:38:25
 * @LastEditTime: 2020-11-24 20:46:21
-->
<template>
	<el-card class="form">
		<el-tabs v-model="activeName" type="card">
			<el-tab-pane v-for="(item, index) in tabs" :key="item.name" :label="item.label" :name="item.name">
				<el-form-schema v-model="item.model" ref="el-form-schema" :debug="false" size="medium" label-suffix=":" :inline="false" label-width="0px" :schema="item.schema">
					<el-form-item>
						<el-button type="primary" @click="submit(index)">提交</el-button>
						<el-button @click="reset(index)">重置</el-button>
					</el-form-item>
				</el-form-schema>
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>
<script>
import elFormSchema from '../packages/el-form-schema'
const objectComponent = function (label) {
	return {
		tag: 'object',
		inline: true,
		label: label,
		required: true,
		components: {
			radio: { tag: 'el-checkbox', items: this.list },
			select: { tag: 'el-select', items: this.arrayData(2), required: true },
			input: { tag: 'el-input', required: true, vif: '$item.select === 1'  },
			sel: { tag: 'el-select', props: { disabled : '!$model.arr[$index].obj2.d || $item.select !== 1' }, items: this.arrayData(2) }
		}
	}
}
export default {
	components: { elFormSchema },
	data () {
		return {
			activeName: 'one',
			list: [{ label: '测试1', value: 1 }],
			tabs: [{
				label: '用户管理1',
				name: 'one',
				model: {},
				schema: {
					arr: {
						tag: 'array',
						inline: false,
						type: 'card',
						title: '方案$index',
						labelWidth: '0px',
						labelWidthComponents: '160px',
						components: {
							a: { tag: 'el-input', default: '123', label: '方案编码', required: true, slot: { after: '方案编码规范：产品编码+下划线+方案简称拼音首字母如百年人寿康惠保重大疾病10万保额：bnrs_khbzdjb_10w' } },
							obj1: {
								tag: 'object',
								label: '商户方案保额',
								inline: true,
								components: {
									b: { tag: 'el-input' },
									c: { tag: 'el-select', items: this.arrayData(2), slot: { after: '该保额将通过接口传送保险公司，保司会校验方案的保额是否正确' } },
								}
							},
							arr: {
								tag: 'array',
								label: '嵌套数组',
								inline: true,
								components: {
									b: { tag: 'el-input' },
									c: { tag: 'el-select', vif: '$item.b', items: this.arrayData(2), slot: { after: '该保额将通过接口传送保险公司，保司会校验方案的保额是否正确' } },
								}
							},
							obj2: {
								tag: 'object',
								label: '方案主标题',
								inline: true,
								components: {
									d: { tag: 'el-input', required: true },
									e: { tag: 'el-input', props: { disabled:  '!$item.d' }, required: true, slot: { after: '展示在前端详情页，如：100元、100元起/月' } },
								}
							},
							f: { tag: 'el-input', label: '方案副标题', vif: '$item.a', required: true, slot: { after: '如10万保额、20万保额、基础版、高端版、100万有社保、100万无社保等' } },
							obj3: objectComponent.call(this, '责任与保额'),
							obj4: objectComponent.call(this, ''),
							obj5: objectComponent.call(this, ''),
							obj6: objectComponent.call(this, ''),
							obj7: objectComponent.call(this, ''),
							obj8: objectComponent.call(this, ''),
							obj9: objectComponent.call(this, ''),
							g: { tag: 'el-input', label: '保费' }
						}
					}
				}
			},{
				label: '用户管理2',
				name: 'two',
				model: {},
				schema: {
					obj: {
						tag: 'object',
						type: 'card',
						title: '用户管理2',
						labelWidth: '0px',
						labelWidthComponents: '100px',
						components: {
							b: { tag: 'el-input', required: true },
							c: { tag: 'el-select', items: this.arrayData(2), slot: { after: '该保额将通过接口传送保险公司，保司会校验方案的保额是否正确' } },
						}
					}
				}
			}]
		}
	},
	methods: {
		arrayData (count) {
			return Array(count).fill({}).map((item, index) => ({ label: `测试-${index + 1}`, value: index + 1 }))
		},
		submit (index) {
			this.$refs['el-form-schema'][index].validate((val) => {
				if (val) {
					this.$message.success('提交完毕!');
				} else {
					this.$message.warning('请先完成必填项~');
				}
			})
		},
		reset (index) {
			this.$refs['el-form-schema'][index].resetFields();
		}
	},
	mounted() {
		setTimeout(() => {
      this.list = this.arrayData(10);
		},5000)
	}
}
</script>