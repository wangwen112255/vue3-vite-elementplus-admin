<template>
  <div
    class="user-management-page"
    v-loading="userManagementTable.tableData.isLoading"
    element-loading-text="拼命加载中"
  >
    <el-space wrap style="width: 100%">
      <el-input
        v-model="filterForm.keyword"
        class="search-input"
        prefix-icon="el-icon-search"
        size="small"
        placeholder="用户名/姓名"
        clearable
        style="width: 200px"
      ></el-input>
      <el-select
        style="width: 100px"
        v-model="filterForm.sex"
        class="search-input"
        prefix-icon="el-icon-search"
        size="small"
        placeholder="性别"
        clearable
      >
        <el-option label="男" value="1"></el-option>
        <el-option label="女" value="2"></el-option>
      </el-select>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-circle-plus-outline"
        @click="onTableAddClick"
        >添加</el-button
      >
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        :disabled="tableSelection.length == 0"
        @click="onTableDeleteClick"
        >删除</el-button
      >
    </el-space>
    <el-table
      :data="userManagementTable.tableData.list"
      tooltip-effect="dark"
      :height="windowRect.clientHeight - 240"
      :row-style="{ height: '65px' }"
      @selection-change="onTableSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
        show-overflow-tooltip
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column label="头像" width="80" show-overflow-tooltip>
        <template #default="scope">
          <el-avatar :size="32" :src="scope.row.img"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sex" label="性别" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="角色" show-overflow-tooltip>
        <template #default="scope">
          <el-tag effect="dark" size="small">
            {{ scope.row.role }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="loginTime" label="登录次数" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        label="最后登录时间"
        min-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip
        min-width="95"
        fixed="right"
      >
        <template #default="scope">
          <el-button
            type="warning"
            size="small"
            @click="onTableEditClick(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <template v-slot:empty> 暂无数据 </template>
    </el-table>
    <div class="table-pager">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :page-size="userManagementTable.tableParams.pageSize"
        :page-sizes="userManagementTable.PAGE_SIZES"
        :layout="`total,prev,pager,next,${device === 'mobile' ? '' : 'sizes'}`"
        :total="userManagementTable.tableData.totalCount"
        :small="device === 'mobile' ? true : false"
      >
      </el-pagination>
    </div>
    <UserEdit
      ref="userTableEdit"
      @confirm="userManagementTable.refresh"
    ></UserEdit>
  </div>
</template>

<script>
import { reactive, onMounted, ref, watch, computed } from "vue";

import useTableData from "@/hooks/useTableData.js";
import { useStore } from "vuex";
import UserEdit from "./components/UserEdit.vue";
import http from "@/http";
export default {
  name: "user-management",
  components: {
    UserEdit,
  },
  setup() {
    const store = useStore();
    const userManagementTable = useTableData(http.userManagement.list);
    //表格筛选
    let filterForm = reactive({
      keyword: "",
      sex: "",
    });

    watch([() => filterForm.keyword, () => filterForm.sex], () => {
      console.log("filterForm更新", filterForm);
      userManagementTable.setParams({
        keyword: filterForm.keyword,
        sex: filterForm.sex,
      });
    });

    const onSizeChange = (val) => {
      userManagementTable.setParams({
        pageSize: val,
      });
      console.log(`每页 ${val} 条`);
    };
    const onCurrentChange = (val) => {
      userManagementTable.setParams({
        currentPage: val,
      });
      console.log(`当前页: ${val}`);
    };
    onMounted(() => {
      userManagementTable.setParams({
        keyword: filterForm.keyword,
      });
    });

    //表格多选
    const tableSelection = ref([]);
    const onTableSelectionChange = (val) => {
      tableSelection.value = val;
    };

    //弹窗
    const userTableEdit = ref(null);
    const onTableAddClick = () => {
      userTableEdit.value.showModal({
        type: "add",
        title: "添加",
      });
    };
    const onTableEditClick = (item) => {
      userTableEdit.value.showModal({
        type: "edit",
        title: "添加",
        data: {
          userName: item.userName,
          sex: item.sex,
          phone: item.phone,
          role: item.role,
        },
      });
    };
    const onTableDeleteClick = () => {};

    return {
      filterForm,
      userManagementTable,
      tableSelection,
      userTableEdit,

      onTableAddClick,
      onTableEditClick,
      onTableDeleteClick,
      onTableSelectionChange,
      onSizeChange,
      onCurrentChange,
      windowRect: computed(() => store.state.app.windowRect),

      device: computed(() => store.state.app.device),
    };
  },
};
</script>

<style lang="scss" scoped>
.user-management-page {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
  overflow: auto;
  position: relative;

  .table-pager {
    width: 100%;
    @include flex-row-center-center;
    padding: 20px 0;
    box-sizing: border-box;
  }
}
</style>