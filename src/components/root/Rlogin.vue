<template>
  <div class="sign-page">
    <div class="sign-bg"></div>
    <el-container>
      <div class="sign-content">
        <div class="sign-header">
          <h1>管理员登录</h1>
          <p>管理，就是这么简单</p>
        </div>
        <el-main
          class="sign-group"
          v-show="isShow"
        >
          <el-form
            :model="SigninForm"
            :rules="rule"
            status-icon
            ref="SigninForm"
            label-width="0px"
            class="demo-ruleForm"
          >
            <div class="input-wrapper">
              <el-form-item prop="name">
                <el-input
                  type="text"
                  v-model="SigninForm.name"
                  suffix-icon="iconfont icon-account"
                  placeholder="请输入用户名"
                ></el-input>
              </el-form-item>
            </div>
            <div class="input-wrapper">
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="SigninForm.password"
                  auto-complete="off"
                  suffix-icon="iconfont icon-password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button
                class="sign-btn"
                type="primary"
                @click="Signin('SigninForm')"
              >登 录</el-button>
            </el-form-item>
          </el-form>
        </el-main>

      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  
  data () {
    return {
      isShow: true,
      notShow: false,
      SigninForm: {
        name: '',
        password: ''
      },
      rule: {
        email: [
          { required: true, message: '请输入管理员账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    apiPost () {
      this.$http
        .post('/api/v1/systemMaster/login', { "account": this.SigninForm.name, "password": this.SigninForm.password })
        .then(result => {
          if (result.data == "0") {
            this.$router.push({ path: `/addservice/${this.SigninForm.name}` })
          }
          else {
            this.$message.error('账号或密码不正确')
          }
        })
    },
    Signin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.apiPost();
        }
      });
    }
  }
}
</script>

<style>
.sign-page .el-input__inner {
  outline: none;
  border: none;
  padding: 0px;
  font-weight: 900;
   font-size: 17px;
   background-color: #e7eaf1
}

.sign-page .el-input__inner[type="password"] {
  letter-spacing: 5px;
  padding: 0px;
  font-weight: 900;
  font-size: 17px;
  background-color: #e7eaf1
  
}

.sign-page .el-input__inner[type="text"] {
  letter-spacing: 0.6px;
}

.sign-page .el-input__inner::-webkit-input-placeholder {
  /* WebKit browsers */
  letter-spacing: 0px;
  font-weight: 500;
  font-size: 16px;
   background-color: #e7eaf1
}
.sign-page .el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  letter-spacing: 0px;
  font-weight: 500;
  font-size: 16px;

}
.sign-page .el-input__inner::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  letter-spacing: 0px;
  font-weight: 500;
  font-size: 16px;
   
}
.sign-page .el-input__inner::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  letter-spacing: 0px;
  font-weight: 500;
  font-size: 16px; 

}

.sign-page .el-form-item {
  position: relative;
  top: 20px;
   
}

.sign-page .input-wrapper {
  border-bottom: 1.5px solid #e7eaf1;
  border-radius: 0;
  position: relative;
  top: -30px;
  margin: 0px;
  height: 60px;
  padding: 0px;
  width: 96%;
  
}

.sign-page {
  background-image: url("../../assets/p3.png");
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
   
  
}

.sign-bg {
  background-image: url("/static/img/Christmas_Trees.png");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  z-index: -2;
  width: 100%;
  min-height: 100vh;
   
}

.el-container {
  padding-bottom: 54px;
  padding-left: 34.5%;
  position: fixed;
  z-index: 1;
  
}

.sign-content {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 
  width: 432px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
   background-image: url("../../assets/p7.png");
}

.sign-header {
  position: relative;
  top: -30px;
  
}

.sign-content h1 {
  font-weight: 470;
  font-size: 50px;
 color: #ffffff;
 
}
 
.sign-content p {
  position: relative;
  font-weight: 380;

  font-size: 22px;
  top: -30px;
  color: #ffffff;
}

.sign-group {
  position: relative;
  top: -60px;
  height: 335px;
  width: 92%;
  left: 24px;
  
}

.sign-btn {
  width: 97%;
  left: -8px;
  font-weight: 530;
  font-size: 17px;
  position: relative;
  top: -10px;
   background-image: url("../../assets/background4.png");
}

.sign-end {
  position: absolute;
  bottom: 30px;
  font-size: 18px;
  left: 32%;
  color: #303030;
}

.sign-to {
  color: #008b8b;
}
</style>