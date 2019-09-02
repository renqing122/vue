<template>
  <el-container>
    <el-header>青 年 小 屋 ———— 专 属 于 你 的 房 屋 租 赁 平 台<el-button @click="back">返回</el-button>
    </el-header>
    <a>客服注册</a>
    <el-container>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="40%"
        class="demo-ruleForm"
      >
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          prop="pass"
        >
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item
          label="年龄"
          prop="age"
        >
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio
            v-model="ruleForm.radio"
            label="男"
          >男</el-radio>
          <el-radio
            v-model="ruleForm.radio"
            label="女"
          >女</el-radio>
        </el-form-item>

        <el-form-item
          label="手机号"
          prop="phone"
          :rules="{min:11,max:11, message:'请输入正确的手机号',trigger:'blur'}"
        >
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </el-container>
</template>
<style>
.el-container {
  height: 8px;
  line-height: 40px;
}
.el-header,
.el-footer {
  background-color: #379df7;
  color: #ffffff;
  font-weight: 800;
  text-align: center;
  line-height: 70px;
}
.a {
  background-color: #ffffff;
  font-weight: 700;
  text-align: center;
}
.el-form-item {
  text-align: center;
  width: 900px;
}

body > .el-container {
  margin-bottom: 40px;
  line-height: 400px;
}
.el-input {
  width: 400;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 300px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          }
          else if (value > 100) {
            callback(new Error('年龄不符合范围区间'));
          }
          else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        email: '',
        age: '',
        radio: '男',
        phone: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码不能少于六位数', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' },
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ]
      },

    };
  },
  methods: {
    back () {
      this.$router.push('/')    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiPost();
        } else {
          this.$message.error('提交失败，请检查您的信息！');
          return
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    apiPost () {
      this.$http
        .post('/api/v1/operator/insert', {          "email": this.ruleForm.email, "password": this.ruleForm.pass,
          "operatorName": this.ruleForm.name, "age": this.ruleForm.age,
          "sex": this.ruleForm.radio, "telephone": this.ruleForm.phone
        }).then(res => {
          if (res.data == "0") {
            this.$message({
              message: '注册成功，请等待管理员通过审核！',
              type: 'success'
            });
          } else {
            this.$message.error('注册失败，该邮箱已被注册！');
            return
          }
        })
    }
  }
}
</script>