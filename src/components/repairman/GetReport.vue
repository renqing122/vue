<template>
  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>我的工单<el-button
        @click="back"
        style="float:right;"
      >查看已完成</el-button>
    </el-header>

    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="fixOrderId"
          label="报修ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="tenantId"
          label="租客ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="希望维修时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="问题描述"
          width="200"
        >
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="open(scope.$index, scope.row)"
            >确认完成
            </el-button>

          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<style scoped>
.el-header,
.el-footer {
  /* background-image: url("../../assets/add2.png"); */
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
    "repairmanId": String
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
    }, 1500),
      this.apiGet();
  },
  methods: {
    back () {
      this.$router.push(`/completedreport/${this.repairmanId}`)    },
    update () {
      this.tableData.push(this.form)
      this.dialogFormVisible = false
    },
    open (index, row) {
      this.$confirm('确认完成工单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/repairman/updateOrderStatusByRepairmanId', {          "fixOrderId": this.tableData[index].fixOrderId,
          "repairmanId": this.tableData[index].repairmanId, "orderStatus": "已完成"        })
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '处理成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '处理失败!'
        })
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
        .post('/api/v1/repairman/queryFixOrderByOrderStatus', {          "repairmanId": this.repairmanId,
          "orderStatus": "进行中"        })
        .then(result => {
          this.tableData = result.data
        })
    }
  }

}
</script>
