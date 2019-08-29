<template>
  <el-container>
    <el-header>青年小屋————专属于你的房屋租赁平台</el-header>
    <el-container >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="500px"
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
          :rules="{ required: true, message:'请输入密码', trigger:'blur' }"
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
          :rules="{ required: true, message:'请输入密码', trigger:'blur' }"
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
          :rules="{ required: true, message:'请输入年龄', trigger:'blur' }"
        >
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>

        <el-form-item  label="性别">
        <el-radio
          v-model="ruleForm.radio"
          label="1"
        >男</el-radio>
        <el-radio
          v-model="ruleForm.radio"
          label="2"
        >女</el-radio>
        </el-form-item>

        <el-form-item label="手机号">
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
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<style>
.el-header,
.el-footer {
  background-image: url("../../assets/add.png");
  color: rgb(24, 21, 15);
  text-align: center;
  line-height:70px;
  font-weight: 700
  
}
.el-form{
   text-align: center;
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
          } else {
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
        radio: '1',
        phone: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },

    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>