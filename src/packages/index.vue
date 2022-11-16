<script>
import { Component } from './components/index'
import diffData from './components/diff'
import { getObjectByPath, isEqual, isEmpty, genUnique } from './components/utils'
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
        return this.$EFS.labelPosition || 'right'
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
        return `el-form-schema-${genUnique()}`
      }
    },
    submitProps: {
      type: Object,
      default() {
        return { type: 'primary', ...this.$EFS.submitProps }
      }
    },
    resetProps: {
      type: Object,
      default() {
        return { type: 'default', ...this.$EFS.resetProps }
      }
    },
    expandProps: {
      type: Object,
      default() {
        return { type: 'default', ...this.$EFS.expandProps }
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
    },
    apiConfig: {
      type: Function
    },
    useEnterSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      schemaValues: {},
      configData: {},
      expandAll: this.isExpand,
      isWatching: false,
      validateFieldSet: new Set(),
      enterFormValues: {},
      formValues: {},
      initValues: {}
    }
  },
  computed: {
    isCanExpand() {
      return (this.expandNumber > 0 && Object.keys(this.schema).length > this.expandNumber)
    }
  },
  watch: {
    formValues: {
      handler(val) {
        this.isWatching = true
        this.$emit('input', val)
      },
      deep: true
    },
    model: {
      handler(val) {
        this.$nextTick(() => {
          Object.assign(this.formValues, val)
        })
      },
      deep: true,
      immediate: true
    },
    schema: {
      handler(val) {
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
  created() {
    if (typeof this.apiConfig === 'function') {
      this.apiConfig().then(data => {
        Object.keys(data).map(key => {
          this.$set(this.configData, key, data[key])
        })
      })
    }
  },
  updated() {
    // 如果vif值为false，去掉该字段的验证
    Array.from(this.validateFieldSet).forEach(field => {
      this.clearValidate(field)
    })
    // 这是为了根据设置 class = el-form-item-inline，来实现类似于 el-form 的 inline 效果
    Array.from(document.querySelectorAll('.el-form-item-inline')).forEach(el => {
      el.querySelector('.el-form-item__content').style.marginLeft = '0px'
      // 设置 slot 的 label-width
      const slotLabelWidth = el.getAttribute('slot-label-width')
      if (el.querySelector('.is-required') && slotLabelWidth) {
        el.querySelector('.el-form-item__content').style.marginLeft = slotLabelWidth
        el.querySelector('.el-form-item').style.marginBottom = '22px'
      }
      if (slotLabelWidth && el.querySelector('.el-form-item__label')) {
        el.querySelector('.el-form-item__label').style.width = slotLabelWidth
      }
    })
    // 这是为了根据设置 class = is-set-inline，来达到的 inline 效果
    Array.from(document.querySelectorAll('.is-set-inline')).forEach(el => {
      if (el.querySelector('.el-form-item__label')) {
        el.querySelector('.el-form-item__content').style.marginLeft = '0px'
      }
      if (el.querySelector('.el-form-item') && !el.querySelector('.el-form-item').style.display) {
        el.querySelector('.el-form-item').style.display = 'inline-flex'
      }
    })
  },
  activated() {
    // 解决 keep-alive 造成的bug
    this.onEnterSearch()
  },
  mounted() {
    this.onEnterSearch()
  },
  methods: {
    /**
		 * @description: 初始化解析schema
		*/
    async initSchemas() {
      const values = {}
      const lastKey = Object.keys(this.schema).pop()
      for (const key in this.schema) {
        this.schema[key].$isLast = lastKey === key
        const schemaComponent = this.schema[key]
        this.initComponentList(schemaComponent)
        this.setValueKey(values, key, schemaComponent)
      }
      const customData = Object.keys(this.model).reduce((prev, key) => {
        if (!(key in values)) prev[key] = this.model[key]
        return prev
      }, {})
      this.schemaValues = JSON.parse(JSON.stringify(values))
      this.formValues = { ...values, ...customData }
      this.$emit('input', { ...this.formValues, ...this.model })
      await this.$nextTick()
      this.diffDataByInitValues(this.initValues, this.formValues)
    },
    /**
		 *  通过 diff 最短路径去更新组件初始化值
		*/
    diffDataByInitValues(current, previous) {
      const diffResult = diffData(current, previous)
      const getModelByPath = (arrPath) => arrPath.reduce((cur, prev) => cur[prev], previous)
      Object.keys(diffResult).map(path => {
        const arrPath = path.substr(0, path.lastIndexOf('.')).split('.').filter(Boolean)
        const targetKey = path.substr(path.lastIndexOf('.') + 1)
        const prevModel = arrPath.length > 0 ? getModelByPath(arrPath) : previous
        if (diffResult[path] && !prevModel[targetKey]) {
          if (targetKey.includes('[')) {
            const [key, index] = targetKey.replace(']', '').split('[')
            this.$set(prevModel[key], index, diffResult[path])
          } else {
            this.$set(prevModel, targetKey, diffResult[path])
          }
        }
      })
    },
    /**
		 *  label/title/slot 模版字符串
		*/
    setExpTpl(component) {
      // slot: { after: "模版字符串", prepend: "模版字符串", append: "模版字符串" } 或 slot: "模版字符串"
      if (typeof component.slot === 'string' && /\$\{.+?\}/g.test(component.slot)) {
        component['slot_template_string'] = component.slot
      }
      if (typeof component.slot === 'object' && /\$\{.+?\}/g.test(component.slot.after)) {
        component['slot_after_template_string'] = component.slot.after
      }
      if (typeof component.slot === 'object' && /\$\{.+?\}/g.test(component.slot.prepend)) {
        component['slot_prepend_template_string'] = component.slot.prepend
      }
      if (typeof component.slot === 'object' && /\$\{.+?\}/g.test(component.slot.append)) {
        component['slot_append_template_string'] = component.slot.append
      }
      // title/label 模版字符串
      ['title', 'label'].forEach(key => {
        const expTagProp = `${key}_template_string`
        const val = component[key]
        if (/\$\{.+?\}/g.test(val)) {
          component[expTagProp] = val
        }
      })
    },
    /**
		 *  设置表达式:  props 和 attrs
		*/
    setExp(component) {
      // 支持 required: '$model.a'
      if (component.required && typeof component.required === 'string') {
        component.requiredExpression = component.required
      }
      // 支持 inline: '$model.a'
      if (component.inline && typeof component.inline === 'string') {
        component.inlineExpression = component.inline
      }
      // 支持 rules: { required: '$model.a', message: '必填' }
      if (!Array.isArray(component.rules) && component.rules && (typeof component.rules.required === 'string')) {
        component.requiredExpression = component.rules.required
      }
      // 支持 props 表达式
      Object.keys(component.props || {}).map(key => {
        const expProp = `${key}_exp_prop`
        const val = component.props[key]
        if (/\$index|\$item|\$model/g.test(val)) {
          component.props[expProp] = 	val
        }
      })
      // 支持 attrs 表达式
      Object.keys(component.attrs || {}).map(key => {
        const expAttr = `${key}_exp_attr`
        const val = component.attrs[key]
        if (/\$index|\$item|\$model/g.test(val)) {
          component.attrs[expAttr] = 	val
        }
      })
    },
    /**
		 * 监听表达式组件: $watchConfig
		*/
    watchConfigExp(component, wrapComponent) {
      // 监听目标对象：$watchConfig 和 $watchModel
      const watchTarget = (target, key) => {
        const targetExp = target[key]
        if (/\$config\./g.test(targetExp)) {
          const watchModel = targetExp.replace(/\$config/g, 'configData')
          target[key] = []
          this.$watch(watchModel, (val) => {
            target[key] = val
            // 强制刷新一下表单，解决 table/array 的items数据变了，组件没刷新的bug
            this.$nextTick(() => {
              if (wrapComponent) {
                wrapComponent.refreshKey = `rk.${genUnique()}`
                this.$forceUpdate()
              }
            })
          })
        }
      }
      // (el-checkbox、el-select、el-radio) 设置 items: '$configData.test' 会主动发起watch监听
      watchTarget(component, 'items')
    },
    /**
		 * @description: 设置组件默认值
		*/
    initComponentDefaultProps(component, watchConfigExp) {
      component.isMarginBottom = true
      component.refreshKey = ''
      component.isInput = component.hasOwnProperty('isInput') ? component.isInput : true
      component.vif = component.hasOwnProperty('vif') ? component.vif : true
      component.$item = null
      component.$index = -1
      component.$isArrayLast = false
      component.label = component.label || ''
      component.style = component.style || {}
      component.slot = component.slot || {}
      component.items = component.items || []
      component.props = component.props || {}
      component.attrs = component.attrs || {}
      component.rules = component.rules || (component.required ? { required: true, message: '必填' } : null)
      // 监听config表达式的情况
      this.watchConfigExp(component, watchConfigExp)
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
          component.isInput = false
          break
        case 'card':
          component.isInput = false
          break
        case 'el-divider':
          component.isInput = false
          Object(component.style, { margin: '16px 0' })
          break
        case 'el-input':
          component.attrs.placeholder = component.props.placeholder || `请输入${/\$\{.+?\}/g.test(component.label) ? '' : component.label}`
          break
        case 'el-date-picker':
          component.props = Object.assign({}, { placeholder: '请选择日期', startPlaceholder: '开始日期', endPlaceholder: '结束日期', unlinkPanels: true }, component.props)
          if (component.props.type === 'daterange') {
            component.default = component.default || []
            component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd'
          } else if (component.props.type === 'datetimerange') {
            component.default = component.default || []
            component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd HH:mm:ss'
            component.props.defaultTime = component.props.defaultTime || ['00:00:00', '23:59:59']
          } else if (component.props.type === 'datetime') {
            component.default = component.default || ''
            component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd HH:mm:ss'
          } else {
            component.default = component.default || ''
            component.props.valueFormat = component.props.valueFormat || 'yyyy-MM-dd'
          }
          break
        case 'el-switch':
          component.default = component.default || false
          break
        case 'el-cascader':
          component.default = component.default || []
          break
        case 'el-slider':
          component.default = component.default || 0
          break
        case 'el-time-picker':
        case 'el-time-select':
          component.props = Object.assign({ placeholder: '请选择时间', startPlaceholder: '开始时间', endPlaceholder: '结束时间', valueFormat: 'HH:mm:ss' }, component.props)
          break
        case 'el-select':
        case 'el-radio':
        case 'el-checkbox':
          component.props.placeholder = component.props.placeholder || `请输入${/\$\{.+?\}/g.test(component.label) ? '' : component.label}`
          component.keys = Object.assign({ label: 'label', value: 'value' }, component.keys || {})
          if (component.tag === 'el-checkbox') {
            component.default = component.default || (component.type === 'bool' ? false : [])
            component.checkAll = component.checkAll || []
            component.checkAllDisabled = component.checkAllDisabled || false
          }
          if (component.props.multiple) {
            component.default = component.default || []
          }
          break
        case 'object':
          component.inline = component.inline || false
          break
        case 'table':
        case 'array':
          component.minLimit = component.minLimit || 0
          component.maxLimit = component.maxLimit || 0
          component.list = component.list || []
          component.showValidate = false
          break
        default:
          // 其它情况
          break
      }
      if (!component.style.width && component.isInput) {
        component.style.width = this.componentWidth
      }
    },
    /**
		 * @description: 递归遍历schema下所有组件
		*/
    initComponentList(schema) {
      if (schema.components) {
        for (const _key in schema.components) {
          if (!('inline' in schema.components[_key])) {
            this.$set(schema.components[_key], 'inline', schema.inline)
          }
          if (schema.components[_key].components) {
            this.initComponentList(schema.components[_key], _key)
          } else {
            this.initComponentDefaultProps(schema.components[_key], schema)
          }
        }
      } else {
        this.initComponentDefaultProps(schema, null)
      }
    },
    /**
		 * @description: 递归遍历schema下所有组件的v-model的key
		*/
    setValueKey(values, key, schema) {
      switch (schema.tag) {
        case 'object':
          if (schema.components) {
            schema.skip = !schema.hasOwnProperty('skip') ? false : schema.skip
            if (!schema.skip) {
              values[key] = {}
              this.initValues[key] = {}
            }
            schema.isMarginBottom = false
            schema.vifBool = true
            schema.componentWidth = schema.componentWidth || this.componentWidth
            this.setExpTpl(schema)
            if (schema.type === 'card' && !schema.hasOwnProperty('border')) schema.border = true
            for (const _key in schema.components) {
              schema.components[_key].isMarginBottom = true
              //
              this.setExpTpl(schema.components[_key])
              //
              if (!schema.skip) {
                // 设置组件初始化值
                if (schema.components[_key].initValue) {
                  this.initValues[key][_key] = schema.components[_key].initValue
                  delete schema.components[_key].initValue
                }
                this.setValueKey(values[key], _key, schema.components[_key])
              } else {
                this.setValueKey(values, _key, schema.components[_key])
              }
            }
          }
          break
        case 'table':
        case 'array':
          // eslint-disable-next-line no-case-declarations
          const keys = {}
          this.setExpTpl(schema)
          schema.vifBool = true
          schema.operator = typeof schema.operator === 'boolean' ? schema.operator : {}
          Object.keys(schema.components).forEach((_key) => {
            this.setExpTpl(schema.components[_key])
            if (schema.components[_key].tag !== 'action') {
              this.setValueKey(keys, _key, schema.components[_key])
            }
          })
          Object.assign(keys, schema.addRowExt || {})
          // eslint-disable-next-line no-prototype-builtins
          if (!schema.hasOwnProperty('keys')) {
            schema.keys = keys
          }
          values[key] = schema.default || []
          break
        default:
          this.setExpTpl(schema)
          if (schema.isInput) {
            // 解构字段初始化
            if (schema.destruct) {
              schema.destruct.forEach(field => {
                values[field] = ''
              })
            }
            // 收集初始化值
            if (schema.initValue) {
              this.initValues[key] = schema.initValue
            }
            values[key] = this.setDefaultValue(schema)
            this.setExp(schema)
            // 判断slot的情况
            if (typeof schema.slot === 'object') {
              Object.keys(schema.slot).forEach(key => {
                const obj = schema.slot[key]
                if (obj instanceof Object && obj['vmodel']) {
                  schema.slot[key].isInput = false
                  if (key === 'after') {
                    schema.slot[key].style = schema.slot[key].style || {}
                    schema.slot[key].inline = true
                    schema.slot[key].style.marginBottom = obj.marginBottom || '0px'
                  }
                  this.initComponentDefaultProps(obj)
                  if (obj.items) {
                    const list = JSON.parse(JSON.stringify(obj.items))
                    schema.slot[key].items = list.map(item => {
                      return (typeof item === 'string') ? { label: item, value: item } : item
                    })
                  }
                  values[obj.vmodel] = this.setDefaultValue(obj)
                  this.setExp(obj)
                }
              })
            }
          }
      }
    },
    /**
		 * @description: 设置默认值
		*/
    setDefaultValue(item) {
      if (!isEmpty(item.default)) {
        return item.default
      } else {
        return ''
      }
    },
    /**
		 * @description: 组合 <el-form-item> <组件 v-model> </el-form-item>
		*/
    renderFormItem(h, item, key, isInput = true) {
      return Component(h, this, key, item, isInput)
    },
    /**
		 * @description: 通过 schema 定义渲染 el-form-item
		*/
    renderFormItems(h) {
      return Object.keys(this.schema).map((key, index) => {
        // key当作name来处理
        this.schema[key].name = key
        // 是否展开/收起
        this.schema[key].expand = this.expandNumber > 0 ? index < this.expandNumber : true

        if (this.schema[key].tag === 'slot') {
          //  渲染占位slot
          return this.$slots[this.schema[key].slot]
        } else {
          // 渲染formItem
          return this.renderFormItem(h, this.schema[key], key)
        }
      })
    },
    /**
     *  自动滚动到错误的校验框（细节用户体验）
     */
    scrollToError(el, scrollOption = {
      behavior: 'smooth',
      block: 'center'
    }) {
      const validaErrDoms = el.getElementsByClassName('is-error') || []
      validaErrDoms.length && validaErrDoms[0].scrollIntoView(scrollOption)
    },
    /**
		 *  @description 整体表单校验
		 */
    validate(cb) {
      const vm = this
      return this.$refs[this.refName].validate(async function() {
        cb.apply(this, arguments)
        await vm.$nextTick()
        try {
          vm.scrollToError(vm.$refs[vm.refName].$el)
        } catch (ex) {
          console.error('catch scrollToError error：', ex)
        }
      })
    },
    /**
		 * @description: 获取节点的所有字段域
		*/
    getValidateProps(field) {
      const val = getObjectByPath(this.formValues, field)
      if ((typeof val !== 'object' && !Array.isArray(val)) || val === null) {
        return [field]
      } else if (Array.isArray(val)) {
        return val.length === 0 ? [field] : val.map((item, index) => this.getValidateProps(`${field}[${index}]`)).flat(Infinity)
      } else {
        return Object.keys(val).reduce((prev, next) => {
          if (!next.includes('$key')) {
            if (typeof val[next] !== 'object' && !Array.isArray(val[next])) { // 简单类型
              prev.push(`${field}.${next}`)
            } else if (Array.isArray(val[next])) { // 数组类型
              val[next].length === 0 ? prev.push(`${field}.${next}`) : val[next].map((item, index) => prev.push(...this.getValidateProps(`${field}.${next}[${index}]`))).flat(Infinity)
            } else { // 对象类型
              prev.push(...this.getValidateProps(`${field}.${next}`))
            }
          }
          return prev
        }, [])
      }
    },
    /**
		 * @description: 部分表单校验
		*/
    validateField(props, cb) {
      props = this.getValidateProps(props)
      return this.$refs[this.refName] && this.$refs[this.refName].validateField(props, cb)
    },
    /**
		 * @description: 部分表单校验
		*/
    validateFieldPromise(props) {
      props = this.getValidateProps(props)
      return Promise.all(props.map((item) =>
        new Promise((resolve) => {
          this.$refs[this.refName].validateField(item, valid => resolve(valid))
        })
      )).then(res => {
        return res.filter(item => item).length === 0
      })
    },
    /**
		 * @description: 重置表单字段
		 */
    resetFields() {
      try {
        // 清楚隐藏字段的数据
        this.validateFieldSet.clear()
        // 表单重置
        this.$refs[this.refName].resetFields()
      } catch (ex) {
        // 重置数组复杂对象会报以下的一个错误，暂时可以忽略，目前发现并不影响操作
        // Error: please transfer a valid prop path to form item!
      }
    },
    /**
		 * @description: 强制重置 (专门针对复杂场景，无法重置的问题)
		 */
    forceReset() {
      // 解决复杂组件array/table在设置minLimit 后，可能造成重置失效的Bug
      this.$nextTick(() => {
        this.$set(this, 'formValues', { ...this.model, ...JSON.parse(JSON.stringify(this.schemaValues)) })
        this.$nextTick(() => {
          this.$forceUpdate()
          this.$refs[this.refName].clearValidate()
        })
      })
      this.resetFields()
    },
    /**
		 * @description: 移除表单校验
		 */
    clearValidate(props = []) {
      props = this.getValidateProps(props)
      return this.$refs[this.refName] && this.$refs[this.refName].clearValidate(props)
    },
    /**
    * @description: 通过enter事件触发查询事件
    */
    onEnterSearch() {
      if (this.isSearchForm && this.useEnterSearch) {
        document.onkeyup = (event) => {
          // eslint-disable-next-line no-caller
          const e = event || window.event || arguments.callee.caller.arguments[0]
          if (e && e.keyCode === 13) {
            const nodePaths = e.path.map(node => node.className)
            // 排除（弹框/页输入跳转）里按enter键触发查询的问题
            if (!nodePaths.includes('el-dialog') && !nodePaths.includes('el-pagination__jump')) {
              if (!isEqual(this.formValues, this.enterFormValues) && this.$refs[this.refName]) {
                this.enterFormValues = JSON.parse(JSON.stringify(this.formValues))
                this.$refs[this.refName].validate((valid) => {
                  valid && this.$emit('submit', valid)
                })
              }
            }
          }
        }
      }
    }
  },
  render(h) {
    const vm = this

    if (Object.keys(vm.formValues).length === 0) return [h('template', null)]

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
          click() {
            vm.$refs[vm.refName].validate((valid) => {
              if (valid) {
                vm.$emit('submit', valid)
              }
            })
          }
        }
      }, '查询'),
      h('el-button', {
        props: { ...vm.resetProps },
        on: {
          click() {
            vm.resetFields()
            vm.$emit('reset')
          }
        }
      }, '重置'),
      vm.isCanExpand ? h(
        'el-button',
        {
          style: { display: !vm.expandAll ? '' : 'none' },
          props: { size: vm.size, ...vm.expandProps },
          on: {
            click() {
              vm.expandAll = !vm.expandAll
              vm.$emit('expand', vm.expandAll)
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
          style: { display: vm.expandAll ? '' : 'none' },
          props: { size: vm.size, ...vm.expandProps },
          on: {
            click() {
              vm.expandAll = !vm.expandAll
              vm.$emit('expand', vm.expandAll)
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
      ref: vm.refName
    }, [
      ...(vm.renderFormItems(h) || []),
      ...(vm.$slots.default || []),
      vm.isSearchForm ? operatorButton : []
    ])
    // 表单
    return (vm.type === 'card') ? h('div', {
      style: { margin: '10px', border: '1px solid #dddddd', padding: '20px 20px 0 20px', borderShadow: '0 2px 12px 0 rgba(0,0,0,.1)' }
    }, [FormRender]) : FormRender
  }
}
</script>
