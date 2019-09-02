<template>
  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>我的订单<el-button @click="back">返回</el-button>
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
          width="50%"
        >
        </el-table-column>
        <el-table-column
          prop="tenantId"
          label="用户ID"
        >
        </el-table-column>
        <el-table-column
          prop="roomId"
          label="房间号"
        >
        </el-table-column>
        <el-table-column
          prop="rentType"
          label="租赁方式"
        >
        </el-table-column>
        <el-table-column
          prop="rentTime"
          label="租赁时间(长租/月、短租/天)"
          width="200%"
        >
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="endDate"
          label="结束时间"
        >
        </el-table-column>
        <el-table-column
          prop="rentMoney"
          label="当前需交租金"
        >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="订单状态"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >续租</el-button>
            </span>

            <span>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </span>

          </template>
        </el-table-column>

        <el-table-column
          label="反馈"
          width="150%"
        >
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                type="success"
                round
                @click="repair(scope.$index, scope.row)"
              >报修</el-button>
            </span>

            <span>
              <el-button
                size="small"
                type="success"
                round
                @click="complain(scope.$index, scope.row)"
              >投诉
              </el-button>
            </span>
          </template>
        </el-table-column>

        <el-table-column
          label="合同"
          width="150%"
        >
          <template slot-scope="scope">
            <span>
              <el-button
                slot="reference"
                round
                type="mini"
                @click="open(scope.$index, scope.row)"
              >导出</el-button>
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
      title="续租时间"
      :visible.sync="dialogFormVisible"
    >
      <el-input
        type="number"
        v-model="number"
        placeholder="请输入续租时间"
      ></el-input>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="update()"
        >确 定</el-button>
      </div>
    </el-dialog>
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
.text {
  font-size: 14px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
    "tenantId": String
  },
  data () {
    return {
      loading: true,
      imageUrl: '',
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
      number: ''
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 1500)
    this.apiGet();
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    back () {
      this.$router.push(`/rmain/${this.tenantId}`)
    },
    update () {
      this.dialogFormVisible = false
      if (this.form.rentType == "长期") {
        this.$http
          .post('/api/v1/rentOrder/reRentLongLeaseRoom', { "orderId": this.form.orderId, "rentTime": this.number })
          .then(() => {
            this.$message({
              message: '续租成功!',
              type: 'success'
            });
            this.apiGet();
          })
      }
      else {
        this.$message.warning('短租不能续租，续租失败！')
      }
    },
    handleEdit (index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    cancel () {
      this.dialogFormVisible = false
    },
    repair (index, row) {
      this.currentIndex = index
      this.$router.push(`/repair/${this.tableData[index].orderId}`)
    },
    complain (index, row) {
      this.currentIndex = index
      this.$router.push(`/complain/${this.tableData[index].orderId}`)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除订单且无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/rentOrder/abandonedRentOrderByRentOrder',
          { "orderId": this.tableData[index].orderId })
          .then(() => {
            this.tableData.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除订单成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '删除订单失败！'
            })
          })
      })
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
        .post('/api/v1/rentOrder/tenantQueryRentOrderByTenantId', { "tenantId": this.tenantId })
        .then(result => {
          this.tableData = result.data
        })
    }
  }
}
</script>
