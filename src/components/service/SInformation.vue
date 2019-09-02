<template>
  <el-row
    type="flex"
    class="row-bg"
    justify="center"
  >
    <div class="post">
      <div class="post1">
        <div class="one">
          <el-tabs type="border-card">
            <el-row :gutter="20">
              <el-col :span="16">
                <div class="user_info">
                  <h2>客服个人信息 <el-button
                      size="small"
                      v-if="!editable"
                      @click="editable = true"
                      style="float:right;"
                      icon="edit"
                    >编辑</el-button>
                    <el-button
                      size="small"
                      v-if="!editable"
                      @click='changepassword'
                      style="float:right;"
                      icon="edit"
                    >修改密码</el-button>
                    <el-button
                      size="small"
                      v-if="!editable"
                      @click='back'
                      style="float:right;"
                      icon="edit"
                    >返回</el-button>
                  </h2>
                  <div
                    class="user_info_form"
                    v-if="editable"
                  >
                    <el-form
                      label-position="right"
                      label-width="100px"
                      :model="personalInfo"
                    >
                      <el-form-item label="邮箱:">
                        {{ personalInfo.email }}
                      </el-form-item>
                      <el-form-item label="姓名:">
                        <el-input v-model="personalInfo.operatorName"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号：">
                        <el-input v-model="personalInfo.telephone"></el-input>
                      </el-form-item>
                      <el-form-item label="年龄:">
                        <el-input
                          type="number"
                          v-model="personalInfo.age"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="性别:">
                        <el-radio
                          v-model="personalInfo.sex"
                          label="男"
                        >男</el-radio>
                        <el-radio
                          v-model="personalInfo.sex"
                          label="女"
                        >女</el-radio>
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          type="primary"
                          @click="submitForm1()"
                        >提交</el-button>
                        <el-button @click="resetForm()">取消</el-button>
                      </el-form-item>
                    </el-form>
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
                      <el-form-item label="邮箱:">
                        {{ personalInfo.email }}
                      </el-form-item>
                      <el-form-item label="姓名:">
                        {{ personalInfo.operatorName }}
                      </el-form-item>
                      <el-form-item label="手机号:">
                        {{ personalInfo.telephone }}
                      </el-form-item>
                      <el-form-item label="年龄:">
                        {{ personalInfo.age }}
                      </el-form-item>
                      <el-form-item label="性别:">
                        {{ personalInfo.sex }}
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-tabs>
        </div>
      </div>
    </div>
  </el-row>
</template>


<script>

export default {
  props: {
    "operatorId": String
  },
  data () {
    return {
      editable: false,
      personalInfo: {
        email: '',
        operatorName: '',
        telephone: '',
        age: '',
        sex: '',
        password: ''
      },
    }
  },
  created () {
    this.apiGet();
  },
  mounted () {
    this.resetForm();
  },
  methods: {
    submitForm1 () {
      this.editable = false;
      var par = {
        email: this.personalInfo.email,
        tenantName: this.personalInfo.operatorName,
        telephone: this.personalInfo.telephone,
        age: this.personalInfo.age,
        sex: this.personalInfo.sex,
      };
      this.apiPost();
    },
    changepassword () {
      this.$prompt('请输入新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.personalInfo.password = value
        this.apiPost();
        this.$message({
          type: 'success',
          message: '密码设置成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改密码'
        });
      });
    },
    //重置表单
    resetForm () {
      this.editable = false;
      // vm.personalInfo = JSON.parse( JSON.stringify(vm.personalInfo_init) ) ;
    },
    //配送管理面板
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back(){
      this.$router.push(`/smain/${this.operatorId}`)
    },
    apiGet () {
      console.log(this.operatorId)
      this.$http
        .post('/api/v1/operator/queryOperatorByOperatorId', { "operatorId": this.operatorId })
        .then(result => {
          this.personalInfo = result.data
        })
    },
    apiPost () {
      this.$http
        .post('/api/v1/operator/updateOperatorInformationByOperator', {          "operatorId": this.operatorId, "operatorName": this.personalInfo.operatorName,
          "password": this.personalInfo.password, "age": this.personalInfo.age, "sex": this.personalInfo.sex,
          "telephone": this.personalInfo.telephone        })
        .then(() => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          });
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
a {
  text-decoration: none;
}
.post1 .one {
  margin: 20px;
}
/*.user_img img{
    max-width: 200px;
    max-height: 200px;
  }*/

/*上传图片框的样式*/
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
.post1 .one {
  margin: 20px;
}

.post1 {
  width: 800px;
  background-color: #379df7;
}
/*.user_img img{
    max-width: 200px;
    max-height: 200px;
  }*/

.post1 .avatar {
  width: 800px;
  height: 178px;
  display: block;
}
.post1 .el-tab-pane {
  width: 800px;
  height: 530px;
}
/*消息提示的样式*/
.post1 .item {
  margin: 0px;
}
/*编辑信息框的样式*/
.post1 .user_info {
  padding-bottom: 20px;
  border: 1px solid #dee1e2;
  width: 730px;
}
.post1 h2 {
  margin: 5px;
  padding: 10px 20px;
  border-bottom: 1px solid #dee1e2;
  width: 700px;
}

.post1 h1 {
  font-size: 2px;
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
</style>
