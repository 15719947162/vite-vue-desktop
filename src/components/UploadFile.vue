<template>
    <div>
        <el-upload ref="uploadRef" v-bind="$attrs" :show-file-list="false" :data="{ ...params, }"
            :action="baseUrl+uploadUrl" :file-list="state.fileList" :on-success="upload.uploadSuccess"
            :on-exceed="upload.onExceed" :on-change="upload.onChange" :on-progress="upload.onProgress"
            :before-upload="upload.beforeUpload" :on-error="upload.uploadError">
            <el-button type="primary">点击上传</el-button>
        </el-upload>
        <slot name="fileList" :file-list="state.fileList">
            <div class="file-list">
                <div v-for="file in state.fileList" :key="file.id" class="file-list-item" @click="handlePreview(file)">
                    <svg-icon :name="getFileIcon(file)" width="24px" height="24px"></svg-icon>
                    <div class="file-list-item-name" :title="file.fileName">{{ file.fileName }}</div>
                    <el-icon v-if="!isDetail" :size="18" @click.stop="handleDeleteFile(file)">
                        <Delete />
                    </el-icon>
                    <el-icon :size="18" @click.stop="handleDownFile(file)">
                        <Download />
                    </el-icon>
                </div>
            </div>
        </slot>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getFileList,deleteFile } from '@/api/common.js'
import { Download, Delete } from '@element-plus/icons-vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
const baseUrl = process.env.VITE_BASE_URL
const baseHost = process.env.VITE_BASE_HOST
const props = defineProps({
    unitId: {
        type: String,
        default: ''
    },
    uploadUrl: {
        required: true,
        type: String,
        default: '/ems/basic/attachment/upload',
    },
    params: {
        type: Object,
        default: () => { },
    },
    height: {
        type: String,
        default: '200px',
    },
    previewUrl: {
        type: String,
        default: '/ems/basic/attachment/preview/',
    },
    downloadUrl: {
        type: String,
        default: '/ems/basic/attachment/download/',
    },
    isDetail: {
        type: Boolean,
        default: false,
    }
});
const emits = defineEmits(['update:unitId']);
const state = reactive({
    loading: false,
    fileList: [],
});
const uploadRef = ref(null);
const upload = {
    uploadSuccess: (res) => {
        state.loading = false;
        if (!props.unitId) emits('update:unitId', res.content.unitId)
        else getFileData()
    },
    uploadError: (error) => {
        state.loading = false;
        ElMessage({ type: 'error', message: error.message || err });
    },
    beforeUpload: (file) => { },
    onExceed: (files, fileList) => {
        ElMessage({ type: 'error', message: '每次只能上传一个文件' });
    },
    onChange: (file, fileList) => {

    },
    onProgress: () => { },
};
const getFileData = () => {
    getFileList(props.unitId).then(res => {
        const { success, content, message } = res;
        if (!success) return ElMessage({ type: 'error', message })
        state.fileList = content
    })

}
//附件删除
const handleDeleteFile = (file) => {
    deleteFile(file.id).then(res => {
        const { success, content, message } = res;
        if (!success) return ElMessage({ type: 'error', message })
        ElMessage({type:'success',message:content})
        getFileData()
    })
}
//附件下载
const handleDownFile = (file) => {
    window.location.href = baseHost + props.downloadUrl + file.id
}
//附件预览
const handlePreview = (file) => {
    window.open(baseHost + props.previewUrl + file.id)
    // window.location.href = baseHost + props.previewUrl + file.id
}
const getFileIcon = (file) => {
    var fileType = file.fileName.slice(file.fileName.lastIndexOf(".") + 1).toLowerCase();
    switch (fileType) {
        case "doc":
        case "docx":
            return "world"
        case "xls":
        case "xlsx":
            return "excel"
        case "ppt":
            return "ppt"
        case "pdf":
            return "pdf"
        case "png":
        case "bmp":
        case "jpg":
        case "jpeg":
            return "png"
        case "zip":
        case "rar":
        case "7z":
            return "zip"
        default:
            return "default"
    }
}
watch(() => props.unitId, (val) => {
    val && getFileData()
})
</script>


<style lang="scss" scoped>
.el-upload__input {
    display: none !important;
}

.file-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    &-item {
        box-sizing: border-box;
        width: 30%;
        border: 1px solid #EBEEF5;
        border-radius: 5px;
        padding: 0 10px;
        margin: 6px 0;
        margin-right: 20px;
        display: flex;
        align-items: center;
        &:hover {
            cursor: pointer;
            background-color: rgb(245, 247, 250);
        }

        .el-icon {
            &:hover {
                cursor: pointer;
                color: var(--wisewe-base-color)
            }
        }

        &-name {
            margin: 0 6px;
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
