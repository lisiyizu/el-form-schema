<template>
  <el-input
    ref="elInputNum"
    v-model.trim="model"
    :style="{'width':componentWidth}"
    :placeholder="placeholderStr"
    @blur="handleInputChange"
  />
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [Number, String],
    stepStrictly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10)
      }
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      model: ''
    }
  },
  computed: {
    componentWidth() {
      return this.$parent.$attrs.componentWidth
    },
    placeholderStr() {
      return this.placeholder || '请输入' + (this.$parent.$props.label ? this.$parent.$props.label.replace(/：|:$/g, '') : '')
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this
      const stepPrecision = getPrecision(step)
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step')
        }
        return precision
      } else {
        return Math.max(getPrecision(value), stepPrecision)
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!isNaN(val)) {
          this.model = val
        } else {
          this.model = ''
        }
      },
      immediate: true
    },
    model(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },
  methods: {
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision))
    },
    getPrecision(value) {
      const valueString = value.toString()
      const dotPosition = valueString.indexOf('.')
      let precision = 0
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1
      }
      return precision
    },
    setCurrentValue(newVal) {
      if (newVal !== undefined) {
        if (isNaN(newVal)) {
          return
        }
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step)
          const precisionFactor = Math.pow(10, stepPrecision)
          newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor
        }
        if (this.precision !== undefined) {
          newVal = parseFloat(newVal.toFixed(this.precision))
        }
      }
      if (newVal >= this.max) newVal = this.max
      if (newVal <= this.min) newVal = this.min
      this.model = newVal
    },
    handleInputChange() {
      const newVal = this.model === '' ? undefined : Number(this.model)
      this.setCurrentValue(newVal)
    }
  }
}
</script>
