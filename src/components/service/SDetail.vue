<template>
  <div class="post">
    <div class="post1">
      <div class="one">
        <el-row
          type="flex"
          class="row-bg"
          justify="center"
        >
          <el-tabs type="border-card">
            <el-row justify="center">
              <el-col>
                <div class="user_info">
                  <h2>房屋详细信息<el-button @click="back">返回</el-button>
                  </h2>
                  <div
                    class="user_info_form"
                    v-if="editable"
                    wit
                  >
                  </div>
                  <div
                    class="user_info_text"
                    v-else
                  >
                    <el-form
                      label-position="right"
                      label-width="100px"
                      :model="personalInfo"
                    >
                      <el-form-item label="照片:"></el-form-item>
                      <img src=personalInfo.picture>
                      <el-form-item label="房间号:">
                        {{ personalInfo.name }}
                      </el-form-item>
                      <el-form-item label="房间地址:">
                        {{ personalInfo.address }}
                      </el-form-item>
                      <el-form-item label="房间介绍:">
                        {{ personalInfo.description }}
                      </el-form-item>
                      <el-form-item label="房间类型:">
                        {{ personalInfo.type }}人间
                      </el-form-item>
                      <el-form-item label="房间价格:">
                        {{ personalInfo.price }}
                      </el-form-item>
                      <el-form-item label="操作">
                        <span>
                          <el-button
                            size="small"
                            type="primary"
                            @click="handleEdit"
                          >订 房</el-button>
                        </span>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tabs>
        </el-row>
      </div>
    </div>
    <el-dialog
      title="我的订单信息"
      :visible.sync="dialogFormVisible"
    >
      <div style="margin: 20px;"></div>
      <el-form
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="租户邮箱">
          <el-input
            v-model="formLabelAlign.email"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="租赁方式">
          <el-radio
            v-model="formLabelAlign.rentType"
            label="长期"
          >长期</el-radio>
          <el-radio
            v-model="formLabelAlign.rentType"
            label="短期"
          >短期</el-radio>
        </el-form-item>
        <el-form-item label="租赁时间(短租/天、长租/月)">
          <el-input
            v-model="formLabelAlign.rentTime"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="update"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  props: {
    "roomId": String,
    "operatorId": String 
  },
  data () {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      ImgUrl: '',
      imageUrl: '',
      editable: false,
      dialogFormVisible: false,
      personalInfo: {
        picture: '',
        name: '',
        address: '',
        description: '',
        type: '',
        price: ''
      },
      formLabelAlign: {
        rentType: '',
        rentTime: '',
        email: ''
      },
      tenantId: ''
    };
  },
  created () {
    this.apiGet();
  },
  mounted () {
    this.resetForm();
  },
  methods: {
    handleEdit () {
      this.dialogFormVisible = true
    },
    update () {
      this.dialogFormVisible = false
      this.apiGetId();
    },
    cancel () {
      this.dialogFormVisible = false
    },
    //重置表单
    resetForm () {
      this.editable = false;
      // vm.personalInfo = JSON.parse( JSON.stringify(vm.personalInfo_init) ) ;
    },
    back () {
      this.$router.push(`/sorder/${this.operator}`)
    },
    apiGet () {
      this.$http
        .post('/api/v1/operator/queryRoomByRoomId', { "roomId": this.roomId })
        .then(result => {
          this.personalInfo = result.data
        })
    },
    apiGetId () {
      this.$http
        .post('/api/v1/tenant/queryTenantIdByEmail', { "email": this.formLabelAlign.email })
        .then(result => {
          if (result.data == '') {
            this.$message.error('该邮箱不存在')
            this.cancel();
          }
          else {
            this.tenantId = result.data
            this.apiPost();
          }
        })
    },
    apiPost () {
      this.$http
        .post('/api/v1/rentOrder/insert', {          "tenantId": this.tenantId, "roomId": this.roomId,
          "rentType": this.formLabelAlign.rentType, "rentTime": this.formLabelAlign.rentTime        })
        .then(() => {
          this.$message({
            message: '订房成功!',
            type: 'success'
          });
          this.$router.push(`/sorder/${this.operator}`)
        })
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

a {
  text-decoration: none;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.post1 .one {
  margin: 20px;
}
/*.user_img img{
    max-width: 200px;
    max-height: 200px;
  }*/

/*消息提示的样式*/
.post1 .item {
  margin: 0px;
}
/*编辑信息框的样式*/
.post1 .user_info {
  padding-bottom: 20px;
  border: 1px solid #dee1e2;
}
.post1 h2 {
  margin: 5px;
  padding: 10px 20px;
  border-bottom: 1px solid #dee1e2;
}
.post1 .i_edit {
  float: right;
  font-size: 16px;
  color: #7ab8ed;
}
.post1 .user_info_form,
.post1 .user_info_text {
  padding: 20px;
}
.el-tabs {
  width: 900px;
}
</style>
