<template>
  <el-container>
    <el-header>维修师傅资格申请表</el-header>
    <el-main>
      <el-form
        ref="form"
        :model="form"
        label-width=50%
      >
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          >
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
        </el-upload>

        <el-form-item label="邮箱">
          <el-input
            type="email"
            v-model="form.email"
          ></el-input>
        </el-form-item>

        <el-form-item label="名字">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input
            type="textarea"
            v-model="form.phone"
          ></el-input>
        </el-form-item>

        <el-form-item label="房间类型">
          <el-select
            v-model="form.region"
            placeholder="请选择房间类型"
          >
            <el-option
              label="单人间"
              value="1"
            ></el-option>
            <el-option
              label="双人间"
              value="2"
            ></el-option>
            <el-option
              label="四人间"
              value="4"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间价格">
          <el-input
            type="price"
            v-model="form.price"
          ></el-input>
        </el-form-item>

        <el-form-item label="房间地址">
          <el-input
            type="textarea"
            v-model="form.address"
          ></el-input>
        </el-form-item>

        <el-form-item label="房间介绍">
          <el-input
            type="textarea"
            v-model="form.desc"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>
.el-header,
.el-footer {
  background-image: url("../../assets/add.png");
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 26px;
  font-weight: 500;
  font-family: fantasy;
}

.el-aside {
  background-image: url("../../assets/add.png");
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-image: url("../../assets/background1.png");
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-form-item {
  width: 65%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
export default {
  data () {
    return {
      form: {
        dialogImageUrl: '',
        dialogVisible: false,
        name: '',
        email: '',
        phone: '',
        region: '',
        price: '',
        address: '',
        desc: '',

      }
    };
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onSubmit () {
      console.log('submit!');
    }
  }
}
</script>

