<template>
    <el-dialog
      v-model="visible"
      :title="$t('common.Import')"
      width="480px"
      :close-on-click-modal="false"
      destroy-on-close
      @close="onClose"
    >
      <template #default>
        <p v-if="props.subTitle">{{ props.subTitle }}</p>
        <el-upload
          v-show="!isUploading"
          ref="uploadRef"
          class="upload-demo"
          drag
          :accept="props.fileType"
          :show-file-list="false"
          :auto-upload="false"
          :limit="props.limit"
          v-bind="$attrs"
          :on-change="onFileChange"
          :on-exceed="onExceed"
        >
          <div>
            <i v-show="!file.name" class="iconfont icon-file1" style="font-size: 24px"></i>
            <span>{{ file.name }}</span>
          </div>
          <div class="el-upload__text">
            <p class="tip-text1">{{ $t('tipInfo.fileUploadTip') }}</p>
            <p class="tip-text2">{{ $t('tipInfo.limitExtensionTip') }}：{{ props.fileType }}</p>
          </div>
        </el-upload>
        <p style="margin: 8px 0" v-show="isUploading && percentage === 100">上传完毕，请继续</p>
        <el-progress
          v-show="isUploading"
          :stroke-width="8"
          style="margin-top: 24px"
          :percentage="percentage"
        />
      </template>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" @click="importConfirm()">
            {{ $t('common.confirmButton') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { ElUpload, ElMessage, genFileId } from 'element-plus'
  import type {
    UploadInstance,
    UploadFile,
    UploadProps,
    UploadRawFile,
    UploadUserFile,
  } from 'element-plus'
  
  const props = defineProps({
    modelValue: Boolean,
    fileType: String,
    subTitle: String,
    limit: {
      type: Number,
      default: 1,
    },
    isUploading: Boolean,
    percentage: {
      type: Number,
      default: 0,
    },
  })
  const emits = defineEmits(['update:modelValue', 'confirm'])
  
  const visible = computed({
    get() {
      return props.modelValue
    },
    set(val) {
      emits('update:modelValue', val)
    },
  })
  const uploadRef = ref<UploadInstance>()
  const file = ref<AnyObject>({})
  const importConfirm = () => {
    emits('confirm', file.value)
  }
  const onExceed = (files: File[]) => {
    uploadRef.value?.clearFiles()
    const fileTmp = files[0] as UploadRawFile
    fileTmp.uid = genFileId()
    uploadRef.value?.handleStart(fileTmp)
  }
  const onFileChange = (uploadFile: UploadFile) => {
    const fileTypePrefix = uploadFile.name.split('.').pop()
    if (props.fileType?.substring(1) !== fileTypePrefix) {
      ElMessage.error(`文件类型仅支持${props.fileType}`)
      uploadRef.value?.clearFiles()
      return false
    }
    file.value = uploadFile
  }
  
  const onClose = () => {
    file.value = {}
    uploadRef.value?.clearFiles()
  }
  
  defineExpose({})
  </script>
  
  <style scoped></style>
  