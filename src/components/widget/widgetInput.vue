<template>
  <el-input class="bg-white w-full" v-model="value" v-bind="$attrs" placeholder="输入框"></el-input>
  <div class="error-color font-12" v-if="!isDisabled && !valid">
    请输入符合正则表达式 {{ $attrs?.properties?.pattern }} 的值！
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, useAttrs } from 'vue'

const props = defineProps({
  modelValue: String,
  valid: Boolean,
})
const emits = defineEmits(['update:modelValue', 'update:valid'])
const attrs = useAttrs()
const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})

const isDisabled = computed(() => {
  return Object.prototype.hasOwnProperty.call(attrs, 'disabled') && attrs.disabled !== false
})
const validFn = (val: string, patternStr?: string) => {
  if (patternStr) {
    const pattern = new RegExp(patternStr)
    const isValid = pattern.test(val)
    emits('update:valid', isValid)
  }
}
watchEffect(() => {
  // @ts-ignore
  validFn(value.value, attrs?.properties?.pattern)
})
</script>

<style lang="scss" scoped></style>
