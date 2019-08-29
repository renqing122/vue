<template>
  <el-container>
    <el-header>房源信息添加</el-header>
    <el-main>
      <el-form
        ref="form"
        :model="form"
        label-width=50%
      >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="dialogImageUrl"
            alt=""
          >
        </el-dialog>
        <el-form-item label="房间号">
          <el-input v-model="form.name"></el-input>
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
  background-image: url("../../assets/logo.png");
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 26px;
  font-weight: 500;
  font-family:fantasy
}
.el-main {
  background-image: url("../../assets/background.png");
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
</style>

<script>
export default {
  data () {
    return {
      form: {
        dialogImageUrl: '',
        dialogVisible: false,
        name: '',
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

