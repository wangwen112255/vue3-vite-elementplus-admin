<template>
  <div
    class="role-management-page"
    v-loading="roleManagementTable.tableData.isPageLoading"
    element-loading-text="拼命加载中"
  >
    <el-space wrap style="width: 100%">
      <el-input
        v-model="filterForm.keyword"
        class="search-input"
        prefix-icon="el-icon-search"
        size="small"
        placeholder="角色名称"
      ></el-input>
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
      :data="roleManagementTable.tableData.list"
      tooltip-effect="dark"
      :height="windowRect.clientHeight - 250"
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
      <el-table-column
        prop="roleName"
        label="角色名称"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip>
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
            plain
            size="small"
            @click="onTableEditClick(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      <template v-slot:empty>
        <el-empty description="暂无数据"></el-empty>
      </template>
    </el-table>
    <div class="table-pager">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :page-size="roleManagementTable.tableParams.pageSize"
        :page-sizes="roleManagementTable.PAGE_SIZES"
        :layout="`total,prev,pager,next,${device === 'mobile' ? '' : 'sizes'}`"
        :total="roleManagementTable.tableData.totalCount"
        :small="device === 'mobile' ? true : false"
      >
      </el-pagination>
    </div>
    <transition name="fade">
      <RoleEdit ref="roleEdit"></RoleEdit>
    </transition>
  </div>
</template>

<script>
/**
 * 角色管理页面
 *
 */
import { reactive, onMounted, ref, watch, computed } from "vue";
import RoleEdit from "./components/RoleEdit.vue";
import http from "@/http";
import useTableData from "@/hooks/useTableData.js";
import { useStore } from "vuex";
export default {
  name: "role-management",
  components: {
    RoleEdit: RoleEdit,
  },
  setup() {
    const roleManagementTable = useTableData(http.roleManagement.list);
    const store = useStore();
    //表格筛选
    let filterForm = reactive({
      keyword: "",
    });
    watch(
      () => filterForm.keyword,
      () => {
        console.log("filterForm更新", filterForm);
        roleManagementTable.setParams({
          keyword: filterForm.keyword,
        });
      }
    );

    const onSizeChange = (val) => {
      roleManagementTable.setParams({
        pageSize: val,
      });
      console.log(`每页 ${val} 条`);
    };
    const onCurrentChange = (val) => {
      roleManagementTable.setParams({
        currentPage: val,
      });
      console.log(`当前页: ${val}`);
    };
    onMounted(() => {
      roleManagementTable.setParams({
        keyword: filterForm.keyword,
      });
    });

    //表格多选
    const tableSelection = ref([]);
    const onTableSelectionChange = (val) => {
      tableSelection.value = val;
    };

    //弹窗
    const roleEdit = ref(null);
    const onTableAddClick = () => {
      console.log("roleEdit", roleEdit.value);
      roleEdit.value.showModal({
        type: "add",
        title: "添加",
      });
    };
    const onTableEditClick = (item) => {
      roleEdit.value.showModal({
        type: "edit",
        title: "添加",
        data: {
          id: item.id,
          name: item.roleName,
          remark: item.remark,
        },
      });
    };
    const onTableDeleteClick = () => {};

    return {
      roleManagementTable,
      filterForm,
      tableSelection,
      roleEdit,

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
.role-management-page {
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