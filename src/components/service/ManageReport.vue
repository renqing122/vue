<template>
  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>报修管理<el-button @click="back">返回</el-button>
    </el-header>

    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="fixOrderId"
          label="报修订单ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="tenantId"
          label="租客ID"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="roomId"
          label="房间ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="期望维修时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="area"
          label="报修领域"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="问题简述"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="状态"
          width="150"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="open(scope.$index, scope.row)"
            >分配师傅
            </el-button>
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
    "operatorId": String
  },
  data () {
    return {
      loading: true,
      tableData: [],
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
    open (index, row) {
      this.$router.push(`/selectrepairman/${this.tableData[index].fixOrderId}/${this.operatorId}`)
    },
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    apiGet () {
      this.$http
        .post('/api/v1/operator/queryFixOrderByOrderStatus', { "orderStatus": "未分配" })
        .then(result => {
          this.tableData = result.data
        })
    }
  }
}
</script>
