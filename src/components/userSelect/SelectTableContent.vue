<template>
  <div style="max-height:270px;overflow: auto;">
    <el-table
      ref="tableRef" 
      :data="tableData.data"
      height="100%" 
      highlight-current-row
      @selection-change="handleSelectionChange" @row-click="handleRowClick" @current-change="handleSelectTableRow">
      <slot>
        <el-table-column v-if="multiple" type="selection"></el-table-column>
        <el-table-column v-for="(col, idx) in tableConfig.columns" :key="idx" v-bind="col"></el-table-column>
      </slot>
    </el-table>
  </div>
  <el-pagination
    v-if="paginationable" 
    v-model:current-page="pageData.page" 
    v-model:page-size="pageData.rows"
    style="height: 38px;padding: 6px"
    :page-sizes="[10, 20, 40]" 
    :pager-count="3" 
    layout="total, sizes, prev, pager, next"
    :total="tableData.total" 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange">
  </el-pagination>
</template>


<script setup>
import { reactive, onMounted, ref, getCurrentInstance, nextTick } from 'vue'
import { getSelectTableData } from './api.js'
// let { currentPage, pageSize, pageSizes } = usePagination

const emits = defineEmits(['update:selectRows', 'update:show']);
const props = defineProps({
  viewField: {
    type: String,
    default: ""
  },
  selectRows: {
    type: Array,
    default: () => []
  },
  params: {
    type: Object,
    default: () => ({ })
  },
  tableConfig: {
    type: Object,
    default: () => ({
      columns: [],

    })
  },
  multiple: {
    type: Boolean,
    default: false
  },
  paginationable: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  },
})

/* const attrs = ref({})
const ctx = ref(null) */
const tableRef = ref(null)
const tableData = reactive({
  data: [],
  total: 0,
  multipleRow: [],//回显选中的行
})
const pageData = reactive({
  page: 1,
  rows: 10
})
const getRequestParams = () => {
  return {
    url:props.tableConfig.url,
    method:props.tableConfig.method,
    data:props.paginationable ? { ...pageData, ...props.params } : { ...props.params }
  }
}


const getTableData = async () => {
  getSelectTableData(getRequestParams()).then(res => {
    const { success, content } = res;
    if (!success) return
    tableData.data = content.rows
    tableData.total = Number(content.total || 0)
    nextTick(() => {
      props.multiple ? setMultipleRowsSelect() : setSingleRowSelect()
    })
  }).catch(() => {
    tableData.data = [];
  })
}
const handleSizeChange = function (val) {
  tableData.rows = val;
  getTableData();
}
const handleCurrentChange = function (val) {
  tableData.page = val;
  getTableData();
}
//多选切换选中行
const setMultipleRowsSelect = () => {
  props.selectRows.forEach(row => {
    toggleRowSelection(row)
  })
}
const toggleRowSelection = (row) => {
  tableRef.value.toggleRowSelection(row)
}
//单选切换选中行
const setSingleRowSelect = () => {
  tableRef.value.setCurrentRow(props.selectRows[0])
}
//单选
const handleSelectTableRow = (val) => {
  if (props.multiple) return
  emits('update:selectRows', [val])
}
//多选
const handleSelectionChange = (val) => {
  emits('update:selectRows', getSelectionRows())
}
const getSelectionRows = () => tableRef.value.getSelectionRows()
//行点击
const handleRowClick = (row) => {
  if (props.multiple) tableRef.value.toggleRowSelection(row)
  else {
    handleSelectTableRow(row)
    emits('update:show', false)
  }
}
onMounted(() => {
  // ctx.value = getCurrentInstance()
  // attrs.value = getCurrentInstance()
  getTableData();
})

defineExpose({
  getSelectionRows,
  getTableData,
  toggleRowSelection
})
</script>

<style lang="scss" scoped></style>