<template>
  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>已完成工单<el-button
        @click="back"
        style="float:right;"
      >未完成工单</el-button>
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
            >查看评价
            </el-button>
          </template>
        </el-table-column>

      </el-table>
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
        title="客户评价"
        :visible.sync="dialogFormVisible"
      >{{this.review}}
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="cancel"
            type="primary"
          >返 回</el-button>
        </div>
      </el-dialog>
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
      review: '',
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
      this.$router.push(`/getreport/${this.repairmanId}`)
    },
    open (index, row) {
      this.dialogFormVisible = true
      this.$http
        .post('/api/v1/repairman/findFixOrderByFixOrderId', { "fixOrderId": this.tableData[index].fixOrderId })
        .then(result => {
          this.review = result.data.tenantComment
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
          "orderStatus": "已完成"        })
        .then(result => {
          this.tableData = result.data
          this.review = result.data.tenantComment
        })
    }
  }

}
</script>
