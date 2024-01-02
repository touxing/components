<template>
  <component :is="curComp" v-model="value" :list="list"></component>
</template>

<script setup lang="ts">
import { ref, markRaw, computed, render, h, defineComponent } from 'vue'
import type { Component, PropType } from 'vue'
import { widgetEnum } from '../../help/ruleData'
import InputComp from './widgetInput.vue'
import RangComp from './widgetRang.vue'
import SelectComp from './widgetSelect.vue'
import MultiSelectComp from './widgetMultiSelect.vue'
import DateComp from './widgetDate.vue'
import DateTimeComp from './widgetDateTime.vue'

const props = defineProps({
  modelValue: [String, Boolean],
  type: String as PropType<widgetEnum>,
  list: Array,
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

const compMap = {
  [widgetEnum.INPUT]: InputComp,
  [widgetEnum.SELECT]: SelectComp,
  [widgetEnum.RANG]: RangComp,
  [widgetEnum.MULTISELECT]: MultiSelectComp,
  [widgetEnum.DATE]: DateComp,
  [widgetEnum.DATETIME]: DateTimeComp,
}

const curComp = markRaw<Component>(compMap[props.type as keyof typeof compMap])
</script>

<style lang="scss" scoped></style>
