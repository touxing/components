<template>
  <div class="w-full flex items-center">
    <el-input
      class="w-full flex-1 bg-white"
      v-model="value.start"
      v-bind="$attrs"
      placeholder="范围下限"
    ></el-input>
    <div class="px-8">-</div>
    <el-input
      class="w-full flex-1 bg-white"
      v-model="value.end"
      v-bind="$attrs"
      placeholder="范围上限"
    ></el-input>
  </div>
  <div class="error-color font-12" v-if="!isDisabled && !valid">
    请输入符合正则表达式 {{ $attrs?.properties?.pattern }} 的值！
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect, watch, useAttrs } from 'vue'
import { isString } from '@/utils'

const props = defineProps({
  modelValue: String,
  valid: Boolean,
})
const emits = defineEmits(['update:modelValue', 'update:valid'])
const attrs = useAttrs()
const value = reactive({
  start: '',
  end: '',
})

/**分隔符号 */
const splitSymble = '~'
watchEffect(() => {
  let tmp = Array.isArray(props.modelValue)
    ? props.modelValue?.[0]
    : isString(props.modelValue)
    ? props.modelValue
    : ''
  // 双向绑定
  value.start = tmp.split(splitSymble)?.[0] || ''
  value.end = tmp.split(splitSymble)?.[1] || ''
})
watch(
  () => [value.start, value.end],
  ([first, second]) => {
    emits('update:modelValue', `${first}${splitSymble}${second}`)
  }
)

const isDisabled = computed(() => {
  return Object.prototype.hasOwnProperty.call(attrs, 'disabled') && attrs.disabled !== false
})
const validFn = (val: string, patternStr?: string) => {
  if (patternStr) {
    const pattern = new RegExp(patternStr)
    return pattern.test(val)
  }
}
watchEffect(() => {
  // @ts-ignore
  const firstValid = validFn(value.start, attrs?.properties?.pattern)
  // @ts-ignore
  const secondValid = validFn(value.end, attrs?.properties?.pattern)
  emits('update:valid', firstValid && secondValid)
})
</script>

<style lang="scss" scoped></style>
