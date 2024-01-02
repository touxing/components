<template>
  <el-select class="bg-white" v-model="value" multiple placeholder="请选择，可多选">
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  modelValue: String,
  list: Array as PropType<any[]>,
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
