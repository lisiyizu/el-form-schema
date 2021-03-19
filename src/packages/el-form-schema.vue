<script>
import { Component } from './components/index'
import { getObjectByPath } from './components/utils';
export default {
	model: {
		prop: 'model',
		event: 'input'
	},
	props: {
		model: {
			type: Object,
			required: true,
			default: () => ({})
		},
		disabled: {
			type: Boolean,
			default: false
		},
		schema: {
			type: Object,
			required: true,
			default: () => ({})
		},
		isSearchForm: {
			type: Boolean,
			default: false
		},
		expandNumber: {
			type: Number,
			default: 0
		},
		labelPosition: {
			type: String,
			default() {
				return this.$EFS.size || 'right'
			}
		},
		size: {
			type: String,
			default() {
				return this.$EFS.size || 'small'
			}
		},
		inline: {
			type: Boolean,
			default: false
		},
		labelSuffix: {
			type: String,
			default() {
				return this.$EFS.labelSuffix || ''
			}
		},
		labelWidth: {
			type: String,
			default: '0px'
		},
		componentWidth: {
			type: String,
			default() {
				return this.$EFS.componentWidth || '220px'
			}
		},
		type: {
			type: String,
			default: ''
		},
		refName: {
			type: String,
			default: () => {
				return `el-form-schema-${Math.random().toString(36).substring(2)}`
			}
		},
		submitProps: {
			type: Object,
			default () {
				return {  type: 'primary', ...this.$EFS.submitProps }
			}
		},
		resetProps: {
			type: Object,
			default () {
				return {  type: 'default', ...this.$EFS.resetProps }
			}
		},
		expandProps: {
			type: Object,
			default () {
				return {  type: 'default', ...this.$EFS.expandProps }
			}
		},
		isExpand: {
			type: Boolean,
			default() {
				return this.$EFS.isExpand
			}
		},
		debug: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			expandAll: this.isExpand,
			isWatching: false,
			validiteFieldSet: new Set(),
			formValues: {}
		}
	},
	watch: {
		formValues: {
			handler (val) {
				this.isWatching = true;
				this.$emit('input', val);
			},
			deep: true
		},
		schema: {
			handler (val) {
				if (!this.isWatching && Object.keys(val).length) {
					this.initSchemas()
				} else {
					this.isWatching = false
				}
			},
			// 一定不能深度扫描，会造成render触发验证的bug
			// deep: true,
			immediate: true
		}
	},
	computed: {
		isCanExpand() {
			return  (this.expandNumber > 0 && Object.keys(this.schema).length > this.expandNumber);
		}
	},
	methods: {
		/**
		 * @description: 初始化解析schema
		*/
		initSchemas () {
			const values = {}
			const lastKey = Object.keys(this.schema).pop();
			for (const key in this.schema) {
				this.schema[key].$isLast = lastKey === key;
				const schemaComponent = this.schema[key]
				this.initComponentList(schemaComponent);
				this.setValueKey(values, key, schemaComponent)
			}
			this.formValues = Object.assign(values, this.model);
		},
		/**
		 * @description: 设置组件默认值
		*/
		initComponentDefaultProps (component) {
			component.isMarginBottom = true;
			component.isInput = true;
			component.$item = null;
			component.$index = -1;
			component.$isArrayLast = false;
			component.label = component.label || '';
			component.style = component.style || {};
			component.slot = component.slot || {};
			component.props = component.props || {};
			component.attrs = component.attrs || {};
			component.rules = component.rules || (component.required ? { required: true, message: "必填" } : null);
			if (component.items) {
				const list = JSON.parse(JSON.stringify(component.items));
				component.items = list.map(item => {
					return (typeof item === 'string') ? { label: item, value: item } : item;
				})
			}
			switch (component.tag) {
				case 'p':
				case 'a':
				case 'i':
				case 'h1':
				case 'h2':
				case 'h3':
				case 'h4':
				case 'h5':
				case 'div':
				case 'span':
					break;
				case 'card':
					component.isInput = false;
					break;
				case 'el-divider':
					component.isInput = false;
					Object(component.style, { margin: '16px 0' });
					break;
				case 'el-input':
					component.attrs.placeholder = component.props.placeholder || `请输入${component.label}`;
					break;
				case 'el-date-picker':
					component.props = Object.assign({}, { placeholder: '请选择日期', startPlaceholder: '开始日期', endPlaceholder: '结束日期', unlinkPanels: true }, component.props);
					if (component.props.type === 'daterange') {
						component.default = component.default || [];
						component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd';
					} else if (component.props.type === 'datetimerange') {
						component.default = component.default || [];
						component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd HH:mm:ss';
						component.props.defaultTime = component.props.defaultTime || ['00:00:00', '23:59:59'];
					} else if(component.props.type === 'datetime') {
						component.default = component.default || "";
						component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd HH:mm:ss';
					} else {
						component.default = component.default || '';
						component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd';
					}
					break;
				case 'el-switch':
					component.default = component.default || false;
					break;
				case 'el-cascader':
					component.default = component.default || [];
					break;
				case 'el-slider':
					component.default = component.default || 0;
					break;
				case 'el-time-picker':
				case 'el-time-select':
					component.props = Object.assign({ placeholder: '请选择时间', startPlaceholder: '开始时间', endPlaceholder: '结束时间', valueFormat: 'HH:mm:ss' }, component.props);
					break;
				case 'el-select':
				case 'el-radio':
				case 'el-checkbox':
					component.props.placeholder = component.props.placeholder || `请选择${component.label}`;
					component.keys = Object.assign({ label: "label", value: "value" }, component.keys || {});
					if (component.tag === 'el-checkbox') {
						component.default = component.default || [];
						component.checkAll = component.checkAll || []
						component.checkAllDisabled = component.checkAllDisabled || false
					}
					if (component.props.multiple) {
						component.default = component.default || [];
					}
					break;
				case 'object':
					component.inline = component.inline || false;
					break;
				case 'table':
				case 'array':
					component.minLimit = component.minLimit || 0;
					component.maxLimit = component.maxLimit || 0;
					component.list = component.list || [];
					component.showValidate = false;
					break;
				default:
					// 其它情况
					break;
			}
			if (!component.style.width && component.isInput) {
				component.style.width = this.componentWidth;
			}
		},
		/**
		 * @description: 递归遍历schema下所有组件
		*/
		initComponentList (schema) {
			if (schema.components) {
				for (const _key in schema.components) {
					if (!('inline' in schema.components[_key])) {
						this.$set(schema.components[_key], 'inline', schema.inline);
					}
					if (schema.components[_key].components) {
						this.initComponentList(schema.components[_key], _key);
					} else {
						this.initComponentDefaultProps(schema.components[_key]);
					}
				}
			} else {
				this.initComponentDefaultProps(schema);
			}
		},
		/**
		 * @description: 递归遍历schema下所有组件的v-model的key
		*/
		setValueKey (values, key, schema) {
			switch (schema.tag) {
				case 'object':
					if (schema.components) {
						values[key] = {}
						schema.isMarginBottom = false;
						for (const _key in schema.components) {
							schema.components[_key].isMarginBottom = true;
							this.setValueKey(values[key], _key, schema.components[_key]);
						}
					}
					break;
				case 'table':
				case 'array':
					// eslint-disable-next-line no-case-declarations
					let keys = {};
					Object.keys(schema.components).forEach((akey) => {
						this.setValueKey(keys, akey, schema.components[akey]);
					})
					// eslint-disable-next-line no-prototype-builtins
					if (!schema.hasOwnProperty('keys')) {
						schema.keys = keys;
					}
					values[key] = schema.default || [];
					break;
				default:
					if (schema.isInput) {
						if (this.model[key] || typeof this.model[key] === 'boolean') {
              values[key] = this.model[key];
            } else {
              values[key] = this.setDefaultValue(schema);
            }
						// 判断slot的情况
						if (typeof schema.slot === 'object') {
							Object.keys(schema.slot).forEach(key => {
								const obj = schema.slot[key];
								if (obj instanceof Object && obj['vmodel']) {
									if (obj.items) {
										const list = JSON.parse(JSON.stringify(obj.items));
										schema.slot[key].items = list.map(item => {
											return (typeof item === 'string') ? { label: item, value: item } : item;
										})
									}
									values[obj.vmodel] =  this.setDefaultValue(obj);
								}
							})
						}
					}
			}
		},
		/**
		 * @description: 设置默认值
		*/
		setDefaultValue (item) {
			if (item.default!==undefined && item.default!==null) {
				return  item.default;
			} else  {
				return "";
			}
		},
		/**
		 * @description: 组合 <el-form-item> <组件 v-model> </el-form-item>
		*/
		renderFormItem (h, item, key, isInput = true) {
			return Component(h, this, key, item, isInput);
		},
		/**
		 * @description: 通过 schema 定义渲染 el-form-item
		*/
		renderFormItems (h) {
			return Object.keys(this.schema).map((key, index) => {
				// key当作name来处理
				this.schema[key].name = key
				// 是否展开/收起
				this.schema[key].expand = this.expandNumber > 0 ? index < this.expandNumber : true;

				if (this.schema[key].tag === 'slot') {
					//  渲染占位slot
					return this.$slots[this.schema[key].slot];
				} else {
					// 渲染formItem
					return this.renderFormItem(h, this.schema[key], key)
				}
			})
		},
		/**
		 * @description: 整体表单校验
		*/
		validate (cb) {
			return this.$refs[this.refName].validate(cb);
		},
		/**
		 * @description: 获取节点的所有字段域
		*/
		getValidateProps (field) {
			const val = field.includes('.') ? getObjectByPath(this.formValues, field) : eval(`this.formValues.${field}`);
			if (typeof val !== 'object' && !Array.isArray(val)) {
				return [field];
			} else if (Array.isArray(val)) {
				return val.length === 0 ? [field] : val.map((item, index) => this.getValidateProps(`${field}[${index}]`)).flat(Infinity);
			} else {
				return Object.keys(val).reduce((prev, next) => {
					if(!next.includes('uuid_key')) {
						if (typeof val[next] !== 'object' && !Array.isArray(val[next])) {  // 简单类型
							prev.push(`${field}.${next}`)
						} else if (Array.isArray(val[next])) {  // 数组类型
							val[next].length === 0 ? prev.push(`${field}.${next}`) : val[next].map((item, index) => prev.push(...this.getValidateProps(`${field}.${next}[${index}]`))).flat(Infinity)
						} else  {  // 对象类型
							prev.push(...this.getValidateProps(`${field}.${next}`))
						}
					}
					return prev;
				}, [])
			}
		},
		/**
		 * @description: 部分表单校验
		*/
		validateField (props, cb) {
			props = this.getValidateProps(props);
			return this.$refs[this.refName] && this.$refs[this.refName].validateField(props, cb);
		},
		/**
		 * @description: 部分表单校验
		*/
		validateFieldPromise (props) {
			props = this.getValidateProps(props);
			return Promise.all(props.map((item) => 
				new Promise((resolve) => {
					this.$refs[this.refName].validateField(item, valid => resolve(valid))
				})
			)).then(res => {
				return res.filter(item => item).length === 0;
			})
		},
		/**
		 * @description: 表单重置
		 */
		resetFields () {
			try {
				// 清楚隐藏字段的数据
				this.validiteFieldSet.clear();
				// 表单重置
				this.$refs[this.refName].resetFields();
			} catch (ex) {
				// 重置数组复杂对象会报以下的一个错误，暂时可以忽略，目前发现并不影响操作
				// Error: please transfer a valid prop path to form item!
			}
		},
		/**
		 * @description: 移除表单校验
		 */
		clearValidate (props = []) {
			props = this.getValidateProps(props);
			return this.$refs[this.refName] && this.$refs[this.refName].clearValidate(props);
		}
	},
	render (h) {
		const vm = this;
		
		if (Object.keys(vm.formValues).length === 0) return [h('template', null)];

		// 操作按钮
		const operatorButton = h('el-form-item', {
			props: {
				labelWidth: vm.labelWidth,
				size: vm.size,
				label: ' '
			}
		}, [
			h('el-button', {
				props: { ...vm.submitProps },
				on: {
					click () {
						vm.$refs[vm.refName].validate((valid) => {
							if(valid) {
								vm.$emit('submit', valid);
							}
						});
					}
				}
			}, '查询'),
			h('el-button', {
				props: { ...vm.resetProps },
				on: {
					click () {
						vm.resetFields();
						vm.$emit('reset');
					}
				}
			}, '重置'),
			vm.isCanExpand ? h(
					'el-button',
					{
						style: { display: !vm.expandAll ? '' : 'none'},
						props: { size: vm.size, ...vm.expandProps },
						on: { 
							click () {
								vm.expandAll = !vm.expandAll;
								vm.$emit("expand", vm.expandAll);
							}
						}
					},
					[
							'更多',
							h('i', {
									class: {
											'el-icon-caret-bottom': true
									}
							})
					]
			) : null,
			vm.isCanExpand ? h(
					'el-button',
					{
						style: { display: vm.expandAll ? '' : 'none'},
						props: { size: vm.size, ...vm.expandProps },
						on: { 
							click () {
								vm.expandAll = !vm.expandAll;
								vm.$emit("expand", vm.expandAll);
							}
						}
					},
					[
							'收起',
							h('i', {
									class: {
											'el-icon-caret-top': true
									}
							})
					]
			) : null
		])

		const FormRender = h('el-form', {
			props: {
				model: vm.formValues,
				inline: vm.inline,
				labelWidth: vm.labelWidth,
				labelSuffix: vm.labelSuffix,
				size: vm.size,
				disabled: vm.disabled,
				labelPosition: vm.labelPosition
			},
			ref: vm.refName,
		}, [
			...(vm.renderFormItems(h) || []),
			...(vm.$slots.default || []),
			vm.isSearchForm ? operatorButton : []
		])
		// 表单
		return (vm.type === 'card') ? h('div', { 
			style: { margin: '10px', border: '1px solid #dddddd', padding: '20px 20px 0 20px', borderShadow: '0 2px 12px 0 rgba(0,0,0,.1)' } 
			}, [FormRender]) : FormRender
	},
	updated () {
		// 如果vif值为false，去掉该字段的验证
		Array.from(this.validiteFieldSet).forEach(field => {
			this.clearValidate(field);
		})
		// 这是为了根据设置 class = el-form-item-inline，来实现类似于 el-form 的 inline 效果
		Array.from(document.querySelectorAll('.el-form-item-inline')).forEach(el => {
			el.querySelector('.el-form-item__content').style.marginLeft = '0px';
		});
		// 这是为了根据设置 class = is-set-inline，来达到的 inline 效果
		Array.from(document.querySelectorAll('.is-set-inline')).forEach(el => {
			el.querySelector('.el-form-item__content').style.marginLeft = '0px';
		});
	}
}
</script>