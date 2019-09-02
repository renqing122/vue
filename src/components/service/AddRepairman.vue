<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>导入师傅</el-button><el-button @click="back">返回</el-button></el-header>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <span>
          <el-table-column
            fixed
            prop="email"
            label="邮箱"
            width="200%"
          >
          </el-table-column>
        </span>
        <span>
          <el-table-column
            prop="password"
            label="密码"
          >
          </el-table-column>
        </span>
        <span>
          <el-table-column
            prop="name"
            label="姓名"
          >
          </el-table-column>
        </span>
        <span>
          <el-table-column
            prop="age"
            label="年龄"
          ></el-table-column>
        </span>
        <span>
          <el-table-column
            prop="sex"
            label="性别"
          ></el-table-column>
        </span>
        <span>
          <el-table-column
            prop="telephone"
            label="手机号"
            width="200%"
          >
          </el-table-column>
        </span>
        <span>
          <el-table-column
            prop="area"
            label="所属领域"
          >
          </el-table-column>
        </span>

      </el-table>
    </div>
    <div class="page"><span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </span><span>
        <el-button
          type="primary"
          @click="add"
        > 新 增 师 傅 </el-button>
      </span>
    </div>
    <el-dialog
      title="新增师傅信息"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="validateform"
        ref="validateform"
      >
        <el-form-item
          prop="email"
          label="邮箱"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ]"
        >
          <el-input
            v-model="validateform.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码至少6位数', trigger: 'blur' }
            ]"
        >
          <el-input
            v-model="validateform.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓名"
          :label-width="formLabelWidth"
          prop="name"
          :rules="[
            { required: true, message: '请输入师傅姓名', trigger: 'blur' }
            ]"
        >
          <el-input
            v-model="validateform.name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="sex"
          :label-width="formLabelWidth"
        >
          <el-radio
            v-model="validateform.sex"
            label="男"
          >男</el-radio>
          <el-radio
            v-model="validateform.sex"
            label="女"
          >女</el-radio>
        </el-form-item>
        <el-form-item
          label="年龄"
          prop="age"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入师傅年龄', trigger: 'blur' }
            ]"
        >
          <el-input
            v-model="validateform.age"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phonenumber"
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '请输入师傅手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
            ]"
        >
          <el-input
            v-model="validateform.phonenumber"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="所属领域"
          prop="major"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="validateform.major"
            placeholder="所属领域"
            :select-width="formLabelWidth"
          >
            <el-option
              label="电器"
              value="电器"
            ></el-option>
            <el-option
              label="管道"
              value="管道"
            ></el-option>
            <el-option
              label="装修"
              value="装修"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="update('validateform')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.el-header {
  /* background-image: url("../../assets/add2.png"); */
  color: #333;
  text-align: center;
  line-height: 60px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
</style>
<script>
export default {
  props: {
    "operatorId": String
  },
  data () {
    return {
      loading: true,
      validateform: {
        email: '',
        password: '',
        name: '',
        sex: '',
        age: '',
        phonenumber: '',
        major: ''
      },
      // tableData: [{
      //   email: '798789@qq.com',
      //   password: '2131dgbfg',
      //   name: '夏小花',
      //   sex: '女',
      //   age: '33',
      //   phonenumber: '15589796766',
      //   major: '电器',
      // }],
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      value6: '',
      form: {},
      currentPage3: 1,
      currentIndex: '',
    }
  },
     
  created () {
    setTimeout(() => {
      this.loading = false
    }, 1500),
      this.apiGet();
  },
  methods: {
    back(){
         this.$router.push(`/smain/${this.operatorId}`)
    },
    showTime () {
      this.$alert(this.value6, '起止时间', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已显示'
          })
        }
      })
    },
    add () {
      this.validateform = {
        email: '',
        password: '',
        name: '',
        sex: '男',
        age: '',
        phonenumber: '',
        major: '电器',
      }
      this.dialogFormVisible = true
    },
    update (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.apiPost(this.validateform);
        }
        else {
          return false
        }
      })
    },
    cancel () {
      this.dialogFormVisible = false
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
    },
    apiPost (validateform) {
      this.$http
        .post('/api/v1/operator/insertRepairman', {          "name": this.validateform.name, "age": this.validateform.age, "email": this.validateform.email,
          "password": this.validateform.password, "sex": this.validateform.sex, "area": this.validateform.major, "telephone": this.validateform.phonenumber        })
        .then(result => {
          if (result.data == "导入成功") {
            this.dialogFormVisible = false
            this.tableData.push(this.validateform)
            this.$message({
              message: '导入成功!',
              type: 'success'
            });
          } else {
            this.$message('已存在该邮箱！')
          }
        })
    },
    apiGet () {
      this.$http
        .get('/api/v1/operator/queryAllRepairman').then(result => {
          this.tableData = result.data;
        })
    }
  },
}
</script>
