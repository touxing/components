<template>
    <el-time-picker
      class="bg-white"
      v-model="value"
      :style="{ '--el-date-editor-width': '100%' }"
    ></el-time-picker>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const props = defineProps({
    modelValue: String,
  })
  const emits = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emits('update:modelValue', val)
    },
  })
  </script>
  
  <style lang="scss" scoped></style>
  