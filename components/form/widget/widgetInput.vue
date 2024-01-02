<template>
  <el-input class="bg-white w-full" v-model="value" placeholder="输入框"></el-input>
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
