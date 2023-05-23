<template>
    <el-dialog v-model="_show" v-bind="$attrs" :modal="false" custom-class="edit-dialog" :close-on-click-modal="false">
        <template v-if="state.showUpload">
            <!-- <el-form ref="form" size="small" class="demo-form-inline" style="flex:1;overflow: auto" @submit.prevent> -->
            <div style="flex: 1; overflow: auto">
                <el-button type="primary" link @click="handleDownTemplate">下载导入模板</el-button>
                <!-- <el-form-item label=""> -->
                <el-upload ref="uploadRef" v-bind="$attrs" :auto-upload="false" :data="{ ...params }"
                    :action="baseUrl + uploadUrl" :file-list="state.fileList"
                    :on-success="upload.uploadSuccess" :on-exceed="upload.onExceed" :on-change="upload.onChange"
                    :on-progress="upload.onProgress" :before-upload="upload.beforeUpload" :on-error="upload.uploadError">
                    <el-button type="primary">点击上传</el-button>
                </el-upload>
                <div style="font-size: 14px; color: #606266; width: 100%">
                    <div class="pd10">
                        <div class="tips">{{ tips }}</div>
                    </div>
                </div>
                <!-- </el-form-item> -->
            </div>
            <!-- </el-form> -->
        </template>
        <template v-else>
            <slot name="result" :data="state">
                <div>
                    上传数据，共{{ state.result.total }}条，成功
                    <span style="color: rgb(24, 144, 255)">{{ state.result.valid || 0 }}</span>
                    条，失败
                    <span style="color: rgb(251, 58, 57)">{{ state.result.invalid || 0 }}</span>
                    条。
                    <el-button v-if="state.result.invalid" type="primary" link @click="handleExportFile">
                        导出失败文件
                    </el-button>
                </div>
            </slot>
        </template>

        <template #footer>
            <span v-if="state.showUpload" class="dialog-footer">
                <el-button @click="$emit('update:show', false)">取消</el-button>
                <el-button type="primary" @click="handleOk">{{ confirmText }}</el-button>
            </span>
            <span v-else class="dialog-footer">
                <el-button @click="handleClose">关闭</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
const baseUrl = process.env.VITE_BASE_URL
const baseHost = process.env.VITE_BASE_HOST
const props = defineProps({
    uploadUrl: {
        required: true,
        type: String,
        default: '',
    },
    show: {
        type: Boolean,
        default: false,
    },
    tips: {
        type: String,
        default: '',
    },
    params: {
        type: Object,
        default: () => { },
    },
    confirmText: {
        type: String,
        default: '导入',
    },
    height: {
        type: String,
        default: '200px',
    },
});
const emits = defineEmits(['update:show', 'dialog-ok']);
const _show = computed({
    get: () => props.show,
    set: (value) => {
        emits('update:show', value);
    },
});
const state = reactive({
    showUpload: true,
    loading: false,
    fileList: [],
    result: [],
});
const uploadRef = ref(null);
function handleOk() {
    upload.submitUpload();
}
const handleClose = () => {
    emits('update:show', false);
    emits('dialog-ok');
};
const handleExportFile = () => {
    window.open(baseHost+exportFileUrl)
    // window.location.href = baseUrl + exportFileUrl;
};
const handleDownTemplate = async () => {
    window.location.href = baseUrl + templateUrl;
};
const upload = {
    uploadSuccess: function (res, file, fileList) {
        state.showUpload = false;
        state.loading = false;
        state.result = res.content;
    },
    uploadError: function (error) {
        state.loading = false;
        ElMessage({ type: 'error', message: error.message || err });
    },
    beforeUpload: function (file) { },
    onExceed: function (files, fileList) {
        ElMessage({ type: 'error', message: '每次只能上传一个文件' });
    },
    onChange: function (file, fileList) {
        uploadRef.value.clearFiles();
        state.fileList = [file];
    },
    onProgress: function () { },
    submitUpload: function () {
        if (!state.fileList.length) return ElMessage({ type: 'error', message: '请先上传需要导入的文件' });
        state.loading = true;
        uploadRef.value.submit();
    },
};
</script>

<style>
.el-overlay-dialog {
    overflow: hidden !important;
}
</style>
<style lang="scss" scoped>
::v-deep(.edit-dialog .el-dialog__body) {
    max-height: 400px !important;
    overflow: auto !important;
}

.tips {
    color: #c6bbbb;
    margin-bottom: 4px;
}

.tips::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #c6bbbb;
    border-radius: 50%;
    margin-right: 5px;
}

.el-upload__input {
    display: none !important;
}
</style>
