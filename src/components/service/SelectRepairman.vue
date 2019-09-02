<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>选择维修师傅<el-button @click="back">返回</el-button>
    </el-header>
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
            prop="task"
            label="任务量"
            width="200%"
          >
          </el-table-column>
        </span>
        <span>
          <el-table-column
            prop="area"
            label="所属领域"
            :filters="[{text: '电器', value: '电器'}, {text: '装修', value: '装修'}, {text: '管道', value: '管道'}]"
            :filter-method="filterHandler"
          >
          </el-table-column>
        </span>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleAdd(scope.$index, scope.row)">选择师傅</el-button>
          </template></el-table-column>
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
      </span>
    </div>

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
    "fixOrderId": String,
    "operatorId": String
  },
  data () {
    return {
      loading: true,
      email: '',
      password: '',
      name: '',
      sex: '1',
      age: '',
      phonenumber: '',
      major: '',
      tableData: [],
      // tableData: [{
      //   email: '798789@qq.com',
      //   password: '2131dgbfg',
      //   name: '夏小花',
      //   sex: '女',
      //   age: '33',
      //   phonenumber: '15589796766',
      //   major: '电器',
      // }],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      value6: '',
      currentPage3: 1,
      currentIndex: '',
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
    handleAdd (index, row) {
      this.$confirm('确认选择该师傅进行维修？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/operator/chooseRepairman', {          "fixOrderId": this.fixOrderId,
          "repairmanId": this.tableData[index].repairmanId, "orderStatus": "进行中"        })
        this.$message({
          type: 'success',
          message: '选择成功!'
        })
        this.$router.push(`/managereport/${this.operatorId}`)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '选择失败！'
        })
      })
    },
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
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
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter();
    },
    formatter (row, column) {
      return row.address;
    },
    filterTag (value, row) {
      return row.tag === value;
    },
    filterHandler (value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    apiGet () {
      this.$http
        .get('/api/v1/operator/queryAllRepairman')
        .then(result => {
          this.tableData = result.data
        })
    }
  },
}
</script>
