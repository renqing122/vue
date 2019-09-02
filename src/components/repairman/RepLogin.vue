<template>
  <div class="sign-page">
    <div class="sign-bg"></div>
    <el-container>
      <div class="sign-content">
        <div class="sign-header">
          <h1>师傅登录</h1>
          <p>工作，就是这么简单</p>
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
              <el-form-item prop="email">
                <el-input
                  v-model="SigninForm.email"
                  suffix-icon="iconfont icon-account"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
            </div>
            <div class="input-wrapper">
              <el-form-item prop="pass">
                <el-input
                  type="password"
                  v-model="SigninForm.pass"
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
        pass: ''
      },
      rule: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于六位数', trigger:'blur' }
        ]
      }
    };
  },

  methods: {
    apiPost () {
      this.$http
        .post('/api/v1/repairman/login', { "email": this.SigninForm.email, "password": this.SigninForm.pass })
        .then(result => {
          if (result.data == "0") {
            this.$message({
              message: '登录成功!',
              type: 'success'
            });
            this.$http
              .post('/api/v1/repairman/getId', {                "email": this.SigninForm.email,
                "password": this.SigninForm.pass             })
              .then(result => {
                this.repairmanId = result.data
                this.$router.push(`/getreport/${this.repairmanId}`)
              })
          } else if (result.data == "1") {
            this.$message.error('您的账号或密码错误！');
          } else {
            this.$message.error('该邮箱未注册！');
          }
        })
    },
    Signin (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.apiPost();
        }else{
          return false;
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
  font-weight: 90;
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
  background-image: url("../../assets/background2.png");
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 40vh;
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
  background-color: #fff;
  width: 432px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
   background-image: url("../../assets/background4.png");
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