<template>
    <component :is="curComp" v-model="value" :list="list" v-bind="$attrs"></component>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, render, h, defineComponent } from 'vue'
  import type { Component, PropType } from 'vue'
  import { widgetEnum } from '../../constant'
  import InputComp from './widgetInput.vue'
  import RangComp from './widgetRang.vue'
  import SelectComp from './widgetSelect.vue'
  import MultiSelectComp from './widgetMultiSelect.vue'
  import DateComp from './widgetDate.vue'
  import DateTimeComp from './widgetDateTime.vue'
  
  const props = defineProps({
    modelValue: String,
    value: String,
    type: String as PropType<widgetEnum>,
    list: Array,
  })
  const emits = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue ?? props.value
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
  
  const curComp = ref<Component>(compMap[props.type as keyof typeof compMap])
  </script>
  
  <style lang="scss" scoped></style>
  