<script setup>
import { ref } from "vue";
import { useHomeStore } from "@/stores/modules/home";
import { Search, RefreshRight, Unlock, Lock, SetUp } from '@element-plus/icons-vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
const { getName, setName,getAge,setAge } = useHomeStore();
const name = getName;
const age = getAge;
const tableData = ref([
  {
    phoneNumber: "1",
    name: "asd",
    idCard: "wer",
  },
  {
    phoneNumber: "1",
    name: "asd",
    idCard: "wer",
  },
  {
    phoneNumber: "1",
    name: "asd",
    idCard: "wer",
  },
  {
    phoneNumber: "1",
    name: "asd",
    idCard: "wer",
  },
]);
</script>

<template>
  <el-form ref="searchFormRef" :inline="true" class="search-form">
    <el-form-item label="实名认证" prop="isRealName">
      <el-select placeholder="请选择是否实人认证">
        <el-option :label="1" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="账号状态" prop="status">
      <el-select placeholder="请选择账号状态">
        <el-option :label="2" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :icon="Search" @click="setAge(10)">查询</el-button>
      <el-button :icon="RefreshRight">{{ age }}</el-button>
    </el-form-item>
  </el-form>
  <div>
    <el-button type="primary" :icon="SetUp" @click="setName('启用')">启用</el-button>
    <el-button type="primary" :icon="Lock" @click="setName('禁用')">禁用</el-button>
    <el-button type="primary" :icon="Unlock" @click="setName('解锁')">解锁</el-button>
  </div>
  <el-table :data="tableData" stripe height="100%" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="phoneNumber" label="手机号码" width="120" />
    <el-table-column prop="name" label="姓名" width="80" />
    <el-table-column prop="idCard" label="身份证号码" width="180" />
  </el-table>
  <div class="home-content">
    <div class="content">123{{ name }}</div>
  </div>
  <svg-icon name="admin" width="48px" height="48px"></svg-icon>
</template>

<style lang="scss" scoped>
.home-content {
  background-color: red;
  padding: 20px;
  .content {
    background-color: yellow;
    padding: 20px;
  }
}
</style>
