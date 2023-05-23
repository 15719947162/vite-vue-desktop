<template>
  <div style="display: flex; align-items: center">
    <el-popover v-model:visible="visible" placement="bottom" :width="400" trigger="click" @hide="onHide">
      <template #reference>
        <div style="position: relative;">
          <div style="position: absolute;;width: 100%;overflow: hidden;z-index: 1;">
            <template v-for="(tag, idx) in selectRows">
              <el-tag v-if="idx < 2" :key="tag.id" closable size="small" style="margin: 0 6px;" @close="closeTag(tag)">
                {{ tag[viewField] }}
              </el-tag>
            </template>
            <el-tag v-if="selectRows.length > 2" size="small"> +{{ selectRows.length - 2 }}</el-tag>
          </div>
          <el-input :readonly="readonly" style="width:400px">
          </el-input>
          <el-icon style="position: relative;left: -20px;">
            <ArrowUp v-if="visible" />
            <ArrowDown v-else />
          </el-icon>
        </div>
      </template>
      <template #default>
        <div>
          <el-form v-if="filterable" @submit.prevent>
            <!-- <el-form-item  v-bind="formConfig" >
              <el-input v-model="searchValue" @change="handleSearch"></el-input>
            </el-form-item> -->
            <el-form-item v-for="(label, prop) in formConfig" :key="prop" :prop="prop" :label="label + '：'">
              <el-input v-model="params[prop]" :placeholder="'请输入' + label" @change="handleSearch"></el-input>
            </el-form-item>
          </el-form>
          <select-table ref="tableRef" v-bind="$attrs" v-model:selectRows="selectRows" v-model:show="visible"
            :params="params" :multiple="multiple">
            <template v-if="$slots.columns" #columns></template>
          </select-table>
        </div>
      </template>
    </el-popover>
  </div>
</template>


<script setup>
import { watch, reactive, onMounted, ref, computed } from 'vue'
import { ArrowDown, ArrowUp} from '@element-plus/icons-vue';
import SelectTable from './SelectTableContent.vue';
// let { currentPage, pageSize, pageSizes } = usePagination

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
  viewField: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  formConfig: {
    type: Object,
    default: null
  },
})
const tableRef = ref(null)
const readonly = ref(true)
const selectRows = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})
const params = reactive({})
const visible = ref(false)
const closeTag = (row) => {
  props.multiple ? tableRef.value.toggleRowSelection(row) : emits('update:modelValue', [])
}
const onHide = () => {
  // emits('update:modelValue',)
}
const handleSearch = () => {
  tableRef.value.getTableData()
}
/* watch(() => selectRows.value, (val) => {
  debugger
  console.log(val);
}) */
watch(props.formConfig, () => {
  if (!props.filterable || !props.formConfig) return
  for (const key in props.formConfig) {
    params[key] = ''
  }
}, { immediate: true })
onMounted(() => {
})
</script>

<style lang="scss" scoped>
.left-icon {
  z-index: 1;
  position: absolute;
  top: 10px;
  right: 8px;
  color: red;
  transition: all .2s
}

.el-popover.el-popper {
  padding: 6px;
}

.transferIcon {
  transform: rotate(180deg);
}
</style>