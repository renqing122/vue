<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="900px">Aside</el-aside>
      <el-main>
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
         <el-image
      style="width: 100px; height: 100px"
      :src="url"
      :fit="fit"></el-image>
          <el-form-item
            prop="email"
            label="邮箱"
            :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
            hide-required-asterisk: false
          >
            <el-input v-model="dynamicValidateForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pass"
            :rules="{ required: true, message:'请输入密码', trigger:'blur' }"
          >
            <el-input
              type="password"
              v-model="dynamicValidateForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('dynamicValidateForm')"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      dynamicValidateForm: {
        email: '',
        pass: '',
        src: ''
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiPost();
        } else {
          console.log('提交失败!');
          return false;
        }
      });
    },
    apiPost () {
      this.$http
      .post('/tenant/login', {"email": this.email,
      "password": this.pass})
        .then(res => {
          this.apiPostResult = res.data
          if (this.apiPostResult === "1") {
            console.log('登录成功！')
          }else if(this.apiPostResult === "0"){
            console.log('您的账号或密码错误！')
          }else{
            console.log('该邮箱未注册！')
          }
        })
    }
  }
}
</script>
<style>
.el-header,
.el-footer {
  background-image: url("../../assets/add2.png");
  color: #333;
  text-align: center;
  line-height: 60px;
  font-weight: 700
}
.el-aside {
  background-image: url("../../assets/background3.png");
  color: #333;
  text-align: center;
  line-height: 400px;
}
.el-main {
  background-color: #e9eef3;
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
</style>