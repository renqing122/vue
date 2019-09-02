<template>
  <el-container>
    <el-header>房间投诉表<el-button @click="back">返回</el-button>
    </el-header>
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

        <el-form-item label="投诉内容">
          <el-input
            type="textarea"
            v-model="form.desc"
            placeholder="此处添加投诉信息……"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >立即投诉</el-button>
          <el-button
            type="primary"
            @click="exitSubmit"
          >取消投诉</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<style>
.el-upload {
  background-color: aliceblue;
  text-align: center;
  line-height: 60px;
  font-size: 10px;
}

.el-header,
.el-footer {
  /* background-image: url("../../assets/add2.png"); */
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 26px;
  font-weight: 100;
  font-family: fantasy;
}

.el-main {
  background-image: url("../../assets/background1.png");
  color: #333;
  text-align: center;
  line-height: 300px;
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
  props: {
    "orderId": String
  },
  data () {
    return {
      form: {
        imageUrl: '',
        dialogVisible: false,
        desc: '',
      },
      order: {
        tenantId: '',
        roomId: '',
        rentType: '',
        startDate: '',
        endDate: '',
        rentTime: '',
        rentMoney: ''
      },
      // tenantName:'',
      // name:'',
      // address:'',
      tenant: {
        tenantName: ''
      },
      room: {
        name: '',
        address: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      //图片列表（用于在上传组件中回显图片）
      fileList: [{ name: '', url: '' }],
      editor: '',
      image: ''
    };
  },
  created () {
    this.apiGet();
  },
  methods: {
    back () {
      this.$router.push(`/myorder/${this.order.tenantId}`)    },
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
    apiGet () {
      this.$http
        .post('/api/v1/operator/queryRentOrderByOrderId', { "orderId": this.orderId })
        .then(res => {
          this.order = res.data
          this.apiGet1();
          this.apiGet2();
        })
    },
    apiGet1 () {
      this.$http
        .post('/api/v1/operator/queryRoomByRoomId', { "roomId": this.order.roomId })
        .then(res1 => {
          this.room = res1.data
        })
    },
    apiGet2 () {
      this.$http
        .post('/api/v1/operator/queryTenantByTenantId', { "tenantId": this.order.tenantId })
        .then(res2 => {
          this.tenant = res2.data
        })
    },
    onSubmit () {
      console.log(this.room)
      this.$http
        .post('/api/v1/tenant/insertComplainOrder', {          "tenantId": this.order.tenantId, "roomId": this.order.roomId,
          "rentOrderId": this.orderId, "tenantName": this.tenant.tenantName, "roomName": this.room.name, "roomAddress":this.room.address,"picture": this.image,
          "description": this.form.desc, "orderStatus": "未回复"
        }).then(() => {
          this.$message({
            message: '投诉成功，请等待客服回复!',
            type: 'success'
          });
          this.$router.push(`/myorder/${this.order.tenantId}`)
        })
    },
    exitSubmit () {
      this.$router.push(`/myorder/${this.order.tenantId}`)
    }
  }
}
</script>

