<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>客服审核</el-header>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="email"
          label="邮箱"
          width="300"
        >
        </el-table-column>
        <el-table-column
          prop="operatorName"
          label="用户名"
          width="120"
        ></el-table-column>

        <el-table-column
          prop="sex"
          label="性别"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号"
          width="300"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                @click="handleAdd(scope.$index, scope.row)"
                type="success"
              >通过</el-button>
            </span>
            <span>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >不通过
              </el-button>
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
.el-header1 {
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
    "rootname": String
  },
  data () {
    return {
      loading: true,
      tableData: [],
      // tableData: [{
      //   email: this.rootname,
      //   name: '大鹏',
      //   sex: '男',
      //   age: '23',
      //   phonenumber: '18817762763',
      // }],
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 1500),
      this.apiGet();
  },
  methods: {
    load (index, row) {

    },

    handleDelete (index, row) {
      this.$confirm('是否驳回该客服申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/systemMaster/updateOperatorActivationStatus', {          "email": this.tableData[index].email,
          "isActivation": "2"        })
        this.tableData.splice(index, 1)
        this.$message({
          type: 'info',
          message: '申请已驳回!'
        })
      }).catch(() => {
      })
    },

    handleAdd (index, row) {
      this.$confirm('是否添加该客服?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/systemMaster/updateOperatorActivationStatus', {          "email": this.tableData[index].email,
          "isActivation": "1"        })
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '成功添加客服!'
        })
      }).catch(() => {
      })
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
        .get('/api/v1/systemMaster/queryAllOperatorByActivationStatus0').then(result => {
          this.tableData = result.data
        })
    }
  }

}
</script>
