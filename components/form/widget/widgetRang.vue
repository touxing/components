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
</template>

<script setup lang="ts">
import { isString } from '@/utils'
import { ref, reactive, computed, watchEffect, watch } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emits = defineEmits(['update:modelValue'])
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
</script>

<style lang="scss" scoped></style>
