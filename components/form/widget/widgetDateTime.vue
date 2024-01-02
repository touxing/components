<template>
  <div class="w-full flex items-center">
    <el-time-picker
      class="bg-white"
      v-model="value.start"
      value-format="HH:mm:ss"
      v-bind="$attrs"
      :style="{ '--el-date-editor-width': '100%' }"
    ></el-time-picker>
    <div class="h-full px-8">-</div>
    <el-time-picker
      class="bg-white"
      v-model="value.end"
      value-format="HH:mm:ss"
      v-bind="$attrs"
      :style="{ '--el-date-editor-width': '100%' }"
    ></el-time-picker>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, watchEffect } from 'vue'
import { isString } from '@/utils'

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
