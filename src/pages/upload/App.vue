<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <el-form-item label="附件" prop="unit">
      <UploadFile style="width:600px" v-model:unitId="formData.unitId" :params="{ unitId: formData.unitId }"
        preview-url="/ems/basic/attachment/preview/" upload-url="/ems/basic/attachment/upload">
      </UploadFile>
    </el-form-item>

    <el-button @click="formRef.validate()">验证</el-button>
  </el-form>
</template>

<script setup>

import { ref, reactive } from 'vue'
import UploadFile from '@/components/UploadFile.vue'

const formRef = ref(null)
const formData = reactive({
  unitId: ''
})

const rules = {
  unitId: [{ type: 'array', required: true, message: '请上传附件', trigger: 'change' }],
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
