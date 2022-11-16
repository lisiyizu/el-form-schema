<template>
  <el-input v-model="model" v-bind="$attrs" :style="{'width':componentWidth}" :placeholder="placeholderStr" v-on="$listeners">
    <template v-if="$slots.prepend" slot="prepend">
      <render-dom :vnode="$slots.prepend" />
    </template>
    <template v-if="$slots.append" slot="append">
      <render-dom :vnode="$slots.append" />
    </template>
    <template v-if="$slots.suffix" slot="suffix">
      <render-dom :vnode="$slots.suffix" />
    </template>
    <template v-if="$slots.prefix" slot="prefix">
      <render-dom :vnode="$slots.prefix" />
    </template>
  </el-input>
</template>
<script>
export default {
  components: {
    renderDom: {
      functional: true,
      render: (h, ctx) => ctx.props.vnode
    }
  },
  inheritAttrs: true,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Number, String]
    },
    placeholder: String
  },
  data() {
    return {
      model: this.value
    }
  },
  computed: {
    componentWidth() {
      return this.$parent.$attrs.componentWidth
    },
    placeholderStr() {
      return this.placeholder || '请输入' + this.$parent.$props.label.replace(/：|:$/g, '')
    }
  },
  watch: {
    value(val) {
      this.model = val
      this.$emit('change', `${[null, undefined].includes(val) ? '' : val}`.trim())
    },
    model(val) {
      this.$emit('input', `${[null, undefined].includes(val) ? '' : val}`.trim())
    }
  }
}
</script>
