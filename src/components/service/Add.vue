<template>
  <el-container>
    <el-header>房源信息添加</el-header>
    <el-main>
      <el-form
        ref="form"
        :model="form"
        label-width=50%
      >
        <el-form-item label="图片">
          <el-upload
            ref="upload"
            action="/api/v1/file/uploadImage"
            name="picture"
            list-type="picture-card"
            :limit="1"
            :file-list="fileList"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-success="handleSuccess"
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
        </el-form-item>
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
            type="number"
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
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style>
.el-header,
.el-footer {
  /* background-image: url("../../assets/add.png"); */
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 26px;
  font-weight: 500;
  font-family: fantasy;
}

.el-aside {
  background-color: aliceblue;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: aliceblue;
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
  props: {
    "operatorId": String
  },
  data () {
    return {
      form: {
        fileList: [{ dialogImageUrl: '' }],
        dialogVisible: false,
        name: '',
        region: '',
        price: '',
        address: '',
        desc: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      //图片列表（用于在上传组件中回显图片）
      fileList: [{ name: '', url: '' }],
      editor: '',
      image: ''
    };
  },
  methods: {
    //文件上传成功的钩子函数
    handleSuccess (res, file) {
      this.$message({
        type: 'info',
        message: '图片上传成功',
        duration: 6000
      });
      if (file.response.success) {
        this.image = file.response.message; //将返回的文件储存路径赋值picture字段
      }
    },
    //删除文件之前的钩子函数
    handleRemove (file, fileList) {
      this.$message({
        type: 'info',
        message: '已删除原有图片',
        duration: 6000
      });
    },
    //点击列表中已上传的文件事的钩子函数
    handlePreview (file) {
    },
    //上传的文件个数超出设定时触发的函数
    onExceed (files, fileList) {
      this.$message({
        type: 'info',
        message: '最多只能上传一个图片',
        duration: 6000
      });
    },
    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isGIF = file.type === 'image/gif';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
    },
    onSubmit () {
      this.apiPost();
    },
    cancel () {
      this.$router.push(`/managehouse/${this.operatorId}`)
    },
    apiPost () {
      this.$http
        .post('/api/v1/room/insert', {          "name": this.form.name, "type": this.form.region, "price": this.form.price,
          "address": this.form.address, "description": this.form.desc, "picture": this.image        });//差一个图片传输
      this.$message({
        message: '添加成功！',
        type: 'success'
      });
      this.$router.push(`/managehouse/${this.operatorId}`)
    }
  }
}
</script>

