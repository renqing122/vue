<template>
  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>我的报修<el-button @click="back">返回</el-button>
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
          prop="area"
          label="问题所属领域"
          width="150"
        >
        </el-table-column>

        <el-table-column
          prop="description"
          label="问题描述"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="状态"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >立即评价</el-button>
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
      title="我的评价"
      :visible.sync="dialogFormVisible"
    >
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入对本次处理的评价"
        v-model="textarea"
      >
      </el-input>

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
    "tenantId": String
  },
  data () {
    return {
      loading: true,
      textarea: '',
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
      this.$router.push(`/rmain/${this.tenantId}`)    },
    update () {
      this.dialogFormVisible = false
      this.$http.post('/api/v1/tenant/updateTenantCommentByFixOrderId', {        "fixOrderId": this.form.fixOrderId,
        "tenantComment": this.textarea      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '处理成功!'
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
    apiGet () {
      this.$http
        .post('/api/v1/tenant/findFixOrderByTenantId', { "tenantId": this.tenantId })
        .then(result => {
          this.tableData = result.data
        })
    }
  }

}
</script>
