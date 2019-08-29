<<template>
  <div class="sign-page">
    <div class="sign-bg"></div>
    <!-- <canvas-js src="//cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.js"></canvas-js> -->
    <el-container>
      <div class="sign-content">
        <div class="sign-header">
          <h1>管理员登陆</h1>
          <p>管理，就是这么简单</p>
        </div>
        <el-main class="sign-group" v-show="isShow">
          <el-form :model="SigninForm" :rules="rule" status-icon ref="SigninForm" label-width="0px" class="demo-ruleForm">
            <div class="input-wrapper">
              <el-form-item prop="name">
                <el-input type="text" v-model="SigninForm.name" suffix-icon="iconfont icon-account" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </div>
            <div class="input-wrapper">
              <el-form-item prop="password">
                <el-input type="password" v-model="SigninForm.password" auto-complete="off" suffix-icon="iconfont icon-password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button class="sign-btn" type="primary" @click="Signin('SigninForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-main>

          </el-form>
        </el-main>

      </div>
    </el-container>
  </div>
</template>

<script>
let axios = require('axios')
export default {
  components: {
    'canvas-js': {
      render(createElement) {
        return createElement('script', { attrs: { zIndex: 0, type: 'text/javascript', src: this.src }});
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  name: 'SigninPage',
  data() {
    var validateSamePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.SignupForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isShow: true,
      notShow: false,
      csrftoken:'',
      instance: Object,
      SigninForm: {
        name: '',
        password: ''
      },
      SignupForm: {
        name: '',
        password: '',
        checkPwd: ''
      },
      rule: {
        name: [
          { required: true, message: ' ', trigger: 'blur' },
          { type: 'string',
            min: 2,
            max: 6,
            message: '请输入2至6个字符的用户名',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' },
          { type: 'string',
            min: 6,
            max: 10,
            message: '请输入6至10位的密码',
            trigger: 'blur'
          }
        ],
        checkPwd: [
          { required: true, message: ' ', trigger: 'blur' },
          { validator: validateSamePwd, trigger: 'blur' }
        ]
      }
    };
  },
  
  methods: {
    Signup(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
          });
          instance.post('/api/login/', this.SignupForm).then(res => {
          let data = res.data
          console.log(data);
            if(data.status !== '1') {
              console.log(data.msg)
              this.$message.error(data.msg);
            } else {
              this.nowuser = {name:data.name, id:data.id}
              this.$cookie.set('nowuser',
              base64encode(this.nowuser.id.toString()), 1)

              this.$store.commit('login', this.nowuser)
              console.log(this.$store.state.nowuser)

              this.$message('welcome, '+ this.SignupForm.name);
              setTimeout(()=>{
                this.$store.commit('first')
                this.$router.push('/');
              },500)
            }
          });
        } else {
          this.$message.warning('请正确填写信息')
        }}
      );
    },
    Signin(formName) {
      this.$refs[formName].validate(valid => {
        if(valid) {
          console.log(this.SigninForm);
          let instance = axios.create({
            headers: {"X-CSRFToken": this.csrftoken}
          });
          console.log(this.csrftoken)
          instance.post('/api/login/', this.SigninForm).then(res => {
            let data = res.data;
            console.log(data)
            if(data.status !== '1') {
              this.$message.error(data.msg)
            } else {
              this.nowuser = {name:data.name, id:data.id}
              // 将当前用户保存到cookie
              this.$cookie.set('nowuser',
              base64encode(this.nowuser.id.toString()), 1)

              // console.log("she zhi d   " + this.$cookie.get('nowuser'))
              this.$store.commit('login', this.nowuser)
              // console.log(this.$store.state.nowuser)

              this.$message('welcome, '+ this.SigninForm.name);
              setTimeout(()=>{
                this.$store.commit('first')
                this.$router.push('/');
              },500)
            }
          }).catch((error) => {
            console.log(error)
            this.$message('服务器故障');
          })
          } else {
            this.$message.warning('请正确填写信息');
          }
      });
    }
  }
}
</script>

<style>

.sign-page .el-input__inner {
  font-size: 16px;
  outline: none;
  border: none;
  padding: 0px;
  font-weight: 500;
}

.sign-page .el-input__inner[type="password"] {
  letter-spacing: 5px;
  font-weight: 900;
  font-size: 22px;
}

.sign-page .el-input__inner[type="text"] {
  letter-spacing: 0.6px;
}

.sign-page .el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
    letter-spacing: 0px;
    font-weight: 500;
    font-size: 16px;
}
.sign-page .el-input__inner::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    letter-spacing: 0px;
    font-weight: 500;
    font-size: 16px;
}
.sign-page .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
    letter-spacing: 0px;
    font-weight: 500;
    font-size: 16px;
}
.sign-page .el-input__inner::-ms-input-placeholder { /* Internet Explorer 10+ */
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
  min-height: 100vh;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
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
  position:fixed;
  z-index: 1;
}

.sign-content {
  
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);
  background-color: #fff;
  width: 432px;
  height: 550px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

.sign-header {
  position: relative;
  top: -30px;
}

.sign-content h1 {
  
  font-weight: 300;
  font-size: 50px;
  color: #008B8B;
}

.sign-content p {
  position: relative;
  font-weight: 380;
  font-size: 22px;
  top: -40px;
  color: #008B8B;
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
}

.sign-end {
  position: absolute;
  bottom: 30px;
  font-size: 18px;
  left: 32%;
  color: #303030;
}

.sign-to {
  color: #008B8B;
}


</style>