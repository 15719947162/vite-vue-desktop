<template>
  <el-form ref="formRef" :model="formData" :rules="rules">
    <el-form-item prop="single" label="单选：">
      <SelectTable
        v-model="formData.single" 
        view-field="name" 
        :form-config="formConfig" 
        :table-config="tableConfig"
        filterable />
    </el-form-item>
    <el-form-item prop="multiple" label="多选：">
      <SelectTable
        v-model="formData.multiple" 
        view-field="name" 
        :form-config="formConfig" 
        :table-config="tableConfig"
        filterable multiple 
        paginationable>
        <!-- <template #form></template> -->
        <template #columns>
          <el-table-column v-if="true" type="selection"></el-table-column>
          <el-table-column v-for="col in tableConfig.columns" :key="col.prop" v-bind="col"></el-table-column>
        </template>
      </SelectTable>
    </el-form-item>
    <el-form-item label="选中：">
      <el-tag v-for="tag in formData.multiple" :key="tag.id" closable size="small">{{
        tag['name'] }}</el-tag>
    </el-form-item>
    <!--     <el-form-item label="下拉：">
      <el-select v-model="formData.multiple">
        <SelectTable viewField="name" v-model="formData.multiple" :formConfig="formConfig" :table-config="tableConfig"
          filterable multiple paginationable>
          <template #columns>
            <el-table-column type="selection" v-if="true"></el-table-column>
            <el-table-column v-for="col in tableConfig.columns" v-bind="col"></el-table-column>
          </template>
        </SelectTable>
      </el-select>
    </el-form-item> -->
    <el-button @click="formRef.validate()">验证</el-button>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import SelectTable from '@/components/userSelect/SelectTable.vue'
const formConfig = {
  nameCode: '姓名/工号',
}
const formRef = ref(null)
const formData = reactive({
  single: [],
  multiple: [],
})
const tableConfig = {
  url:'',
  method:'',
  columns: [
    {
      prop: 'name',
      label: '姓名'
    },
    {
      prop: 'code',
      label: '工号'
    },
    {
      prop: 'dept',
      label: '部门'
    },
  ]
}
const rules = {
  single: [{ type: 'array', required: true, message: '请选择', trigger: 'change' }],
  multiple: [{ type: 'array', required: true, message: '请选择' }],
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
