<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>订单审核<el-button @click="back">返回</el-button>
    </el-header>
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
          label="房间号"
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
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="rentMoney"
          label="总租金"
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
            <span>
              <el-popover
                placement="right"
                width="800"
                trigger="click"
              >
                <el-form :model="gridData">
                  <el-form-item
                    fixed
                    v-model="gridData.tenantId"
                    label="用户ID:"
                    width="100"
                  >{{gridData.tenantId}}
                  </el-form-item>
                  <el-form-item
                    v-model="gridData.tenantName"
                    label="用户名:"
                    width="100"
                  >{{gridData.tenantName}}</el-form-item>
                  <el-form-item
                    v-model="gridData.age"
                    label="年龄:"
                  >{{gridData.age}}</el-form-item>
                  <el-form-item
                    v-model="gridData.sex"
                    label="性别:"
                  >{{gridData.sex}}</el-form-item>
                  <el-form-item
                    v-model="gridData.telephone"
                    label="手机号:"
                  >{{gridData.telephone}}</el-form-item>
                  <el-form-item
                    label="信用等级:"
                    v-model="gridData.level"
                  >{{gridData.level}}</el-form-item>
                </el-form>
                <el-button
                  size="small"
                  slot="reference"
                  @click="load(scope.$index, scope.row)"
                >查看</el-button>
              </el-popover>
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
.el-header {
  /* background-image: url("../../assets/add.png"); */
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 10%;
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
      // }
      // ],
      gridData: {
        tenantId: '',
        tenantName: '',
        age: '',
        sex: '',
        telephone: '',
        level: ''
      },
      // gridData: [{
      //   userid: '45542',
      //   name: '王小虎',
      //   age: '23',
      //   sex: '男',
      //   phonenumber: '18817762763',
      //   credit: '89'
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
    load (index, row) {
      this.$http
        .post('/api/v1/operator/queryTenantByTenantId', { "tenantId": row.tenantId })
        .then(result => {
          this.gridData = result.data
        })
    },
    changeinformation (index, row) {
    },
    handleDelete (index, row) {
      this.$confirm('此操作将拒绝生成订单且无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除订单成功!'
        })
        this.$http
          .post('/api/v1/operator/updateOrderStatusByOrderId', {            "orderId": this.tableData[index].orderId
            , "orderStatus": "未通过审核"          })
        this.tableData.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除订单'
        })
      })
    },
    back () {
      this.$router.push(`/smain/${this.operatorId}`)
    },
    handleAdd (index, row) {
      this.$confirm('此操作将立即生成账单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '订单生成成功!'
        })
        this.$http.post('/api/v1/operator/updateOrderStatusByOrderId', { "orderId": this.tableData[index].orderId, "orderStatus": "未支付" })
        this.tableData.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消生成订单'
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
        .post('/api/v1/operator/queryAllRentOrderByOrderStatus', { "orderStatus": "未审核" })
        .then(result => {
          this.tableData = result.data
        })
    }
  }

}
</script>
