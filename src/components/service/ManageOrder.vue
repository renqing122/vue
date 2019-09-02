<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>订单管理<el-button @click="back">返回</el-button>
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
                label="订单ID"
                value="1"
              ></el-option>
              <el-option
                label="用户ID"
                value="2"
              ></el-option>
              <el-option
                label="全部"
                value="3"
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
          prop="orderId"
          label="订单ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="tenantId"
          label="用户ID"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="roomId"
          label="房间ID"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="rentType"
          label="租赁方式"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="rentTime"
          label="租赁时间(长租/月、短租/天)"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="开始时间"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束时间"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="rentMoney"
          label="当前需交租金"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="100"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
              >修改订单</el-button>
            </span>
            <span>
              <el-button
                size="small"
                @click="open(scope.$index, scope.row)"
              >生成合同
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
    <el-dialog
      title="修改订单状态"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="revform">
        <el-form-item label="订单状态">
          <el-select
            v-model="revform.region"
            placeholder="请选择订单状态"
          >
            <el-option
              label="未支付"
              value="未支付"
            ></el-option>
            <el-option
              label="进行中"
              value="进行中"
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
        region: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      value6: '',
      currentPage3: 1,
      currentIndex: '',
      select: '3',
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
        .post('/api/v1/operator/updateOrderStatusByOrderId', {          "orderId": this.form.orderId,
          "orderStatus": this.revform.region        })
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
        this.apiGet()
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
    open (index, row) {
      if (this.tableData[index].rentType == "长期")
        this.$router.push(`/contract/${this.tableData[index].orderId}`)
      else {
        this.$message('短租不能生成合同')
      }
    },
    apiGet () {
      this.$http
        .get('/api/v1/rentOrder/queryAll').then(result => {
          this.tableData = result.data
        })
    },
    search () {
      if (this.select === "1") {
        this.$http
          .post('/api/v1/operator/queryRentOrderListByOrderId', { "orderId": this.input })
          .then(result => {
            this.tableData = result.data
          })
      } else if (this.select === "2") {
        this.$http
          .post('/api/v1/rentOrder/tenantQueryRentOrderByTenantId', { "tenantId": this.input })
          .then(result => {
            this.tableData = result.data
          })
      } else {
        this.$http
          .get('/api/v1/rentOrder/queryAll').then(result => {
            this.tableData = result.data
          })
      }
    }
  }
}
</script>
