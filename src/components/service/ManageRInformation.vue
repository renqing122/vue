<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>管理租户信息<el-button @click="back">返回</el-button>
    </el-header>
    <el-form class="head1">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        class="searchClass"
      >
        <div slot="prepend">
          <div class="centerClass">
            <el-select
              v-model="select"
              placeholder="请选择"
              style="width: 90px"
            >
              <el-option
                label="用户ID"
                value="1"
              ></el-option>
              <el-option
                label="全部"
                value="2"
              ></el-option>
            </el-select>
          </div>
          <div class="centerClass">
            <div class="line"></div>
          </div>
        </div>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </el-form>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="tenantId"
          label="用户ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="tenantName"
          label="用户名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号码"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="level"
          label="信用等级"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
              >修改信用等级</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="修改信用等级"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="revform">
        <el-form-item
          label="信用等级"
          prop="level"
        >
          <el-input
            type="number"
            v-model="revform.number"
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
<style scoped>
.el-header,
.el-footer {
  background-image: url("../../assets/logo.png");
  color: #333;
  text-align: center;
  line-height: 60px;
}
.head {
  background-color: #b3c0d1;
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

.box-card {
  width: 480px;
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
      tableData: [],
      // tableData: [{
      //   orderid: 111,
      //   name: '王小虎',
      //   roomnumber: '787',
      //   way: '长租',
      //   totalday: '67天',
      //   stime: '2019-05-04',
      //   etime: '2019-07-18',
      //   totalmoney: '6700.00',
      //   orderstate: '审核中'
      // }],
      revform: {
        number: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '80px',
      value6: '',
      currentPage3: 1,
      currentIndex: '',
      select: '2',
      input: ''
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 1500)
    this.apiGet();
  },
  methods: {
    back () {
      this.$router.push(`/smain/${this.operatorId}`)
    },
    update () {
      this.dialogFormVisible = false
      this.$http
        .post('/api/v1/operator/updateLevelByTenantId', {          "tenantId": this.form.tenantId,
          "level": this.revform.number        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.search();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '修改失败'
          })
        })
    },
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
      this.revform.number = this.form.level
    },
    cancel () {
      this.dialogFormVisible = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    apiGet () {
      this.$http
        .get('/api/v1/tenant/queryAll').then(result => {
          this.tableData = result.data
        })
    },
    search () {
      if (this.select === "1") {
        this.$http
          .post('/api/v1/operator/queryTenantListByTenantId', { "tenantId": this.input })
          .then(result => {
            this.tableData = result.data
          })
      } else {
        this.$http
          .get('/api/v1/tenant/queryAll').then(result => {
            this.tableData = result.data
          })
      }
    }
  }
}
</script>
