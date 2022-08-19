<template>
  <el-dialog
    :title="modalConfig.title"
    v-model="modalConfig.visible"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-form
      size="medium"
      :model="data.form"
      style="min-height: 200px; padding: 20px"
      label-width="90px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item label="课程名称" required="">
            <el-input
              size="medium"
              v-model="data.form.title"
              placeholder="请输入课程名称"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22">
          <el-form-item label="课程简介" required="">
            <el-input
              type="textarea"
              rows="3"
              size="medium"
              v-model="data.form.desc"
              placeholder="请输入课程简介"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="22">
          <el-form-item label="课程讲师" required="">
            <el-input
              size="medium"
              v-model="data.form.author"
              placeholder=""
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="22">
          <el-form-item label="课程封面">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
            >
              <div class="avatar-upload-wrap">
                <el-avatar :size="100" style="margin-bottom: 30px"> </el-avatar>
                <div class="uploader-bottom">
                  <i class="icon-upload el-icon-camera"></i>
                </div>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="22">
          <el-form-item label="课程章节">
            <el-input-number
              size="medium"
              v-model="data.form.chapter_num"
              placeholder=""
              clearable
              :style="{ width: '30%' }"
            >
            </el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="22">
          <el-form-item label="课程时长">
            <el-input-number
              size="medium"
              v-model="data.form.duration"
              placeholder=""
              clearable
              :style="{ width: '30%' }"
            >
            </el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="22">
          <el-form-item label="课程价格" required="">
            <el-input-number
              size="medium"
              v-model="data.form.price"
              placeholder=""
              clearable
              :style="{ width: '30%' }"
            >
            </el-input-number>
          </el-form-item>
        </el-col>

        <el-col :span="22">
          <el-form-item label="发布状态">
            <el-switch
              v-model="data.form.status"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template v-slot:footer class="dialog-footer">
      <el-button @click="onModalCloseClick" size="medium">取 消</el-button>
      <el-button
        type="primary"
        @click="onModalConfirmClick"
        size="medium"
        :loading="modalConfig.confirmBtnLoading"
        >确 定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { userTypeOptions, sexOptions } from "@/others/options.js";
export default {
  name: "Edit",
  emits: ["confirm"],
  setup(props, context) {
    const store = useStore();

    //模态框配置
    const modalConfig = reactive({
      type: "", // "add" "edit"
      title: "",
      visible: false,
      confirmBtnLoading: false,
    });

    //初始化表单
    const getDefaultForm = () => {
      return {
        userName: "",
        sex: "",
        phone: "",
        role: "",
      };
    };

    const data = reactive({ form: getDefaultForm() });

    //初始化模态框
    const initModal = () => {
      data.form = getDefaultForm();
    };

    //显示模态框
    const showModal = (
      options = {
        type: "add",
        title: "",
        data: {},
      }
    ) => {
      modalConfig.type = options.type;
      modalConfig.visible = true;
      if (options.type === "add") modalConfig.title = "添加";
      if (options.type === "edit") modalConfig.title = "编辑";
      modalConfig.title = options.title || "";
      console.log("options", options);
      if (options.data) data.form = { ...options.data };
    };

    //隐藏模态框
    const hideModal = () => {
      modalConfig.visible = false;
      initModal();
    };

    //点击关闭按钮
    const onModalCloseClick = () => {
      hideModal();
    };

    //点击确认按钮
    const onModalConfirmClick = () => {
      context.emit("confirm",data);
    };

    return {
      modalConfig,
      data,
      sexOptions: sexOptions,
      roleOptions: userTypeOptions,

      hideModal,
      showModal,
      onModalConfirmClick,
      onModalCloseClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader {
  margin-bottom: 30px;
  text-align: left;
  .avatar-upload-wrap {
    position: relative;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;

    .uploader-bottom {
      width: 100%;
      padding: 4px 0;
      background: rgba(#000, 0.4);
      position: absolute;
      z-index: 99;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      .icon-upload {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>