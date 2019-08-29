<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>订单审核</el-header>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="orderid"
          label="订单ID"
          width="150"
        >
        </el-table-column>

        <el-table-column
          prop="name"
          label="用户名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="roomnumber"
          label="房间号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="way"
          label="租赁方式"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="totalday"
          label="租赁天数"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="stime"
          label="开始时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="etime"
          label="结束时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="totalmoney"
          label="总租金"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="orderstate"
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
                <el-table :data="gridData">
                  <el-table-column
                    fixed
                    prop="userid"
                    label="用户ID"
                    width="100"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="用户名"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    prop="age"
                    label="年龄"
                  ></el-table-column>
                  <el-table-column
                    prop="sex"
                    label="性别"
                  ></el-table-column>
                  <el-table-column
                    prop="phonenumber"
                    label="手机号"
                  ></el-table-column>
                  <el-table-column
                    prop="credit"
                    label="信用度"
                  ></el-table-column>
                </el-table>
                <el-button
                  slot="reference"
                  @click="load(scope.$index, scope.row)"
                >查看用户信息</el-button>
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
  data () {
    return {
      loading: true,
      tableData: [{
        orderid: 111,
        name: '王小虎',
        roomnumber: '787',
        way: '长租',
        totalday: '67天',
        stime: '2019-05-04',
        etime: '2019-07-18',
        totalmoney: '6700.00',
        orderstate: '审核中'
      }, {
        orderid: 323,
        name: '李小萌',
        roomnumber: '177',
        way: '长租',
        totalday: '47天',
        stime: '2019-05-04',
        etime: '2019-06-18',
        totalmoney: '4400.40',
        orderstate: '审核中'
      }, {
        orderid: 431,
        name: '郝文婷',
        roomnumber: '827',
        way: '短租',
        totalday: '7天',
        stime: '2019-07-04',
        etime: '2019-07-18',
        totalmoney: '700.00',
        orderstate: '审核通过'
      }, {
        orderid: 111,
        name: '王小虎',
        roomnumber: '787',
        way: '长租',
        totalday: '67天',
        stime: '2019-05-04',
        etime: '2019-07-18',
        totalmoney: '6700.00',
        orderstate: '审核中'
      }],

      gridData: [{
        userid: '45542',
        name: '王小虎',
        age: '23',
        sex: '男',
        phonenumber: '18817762763',
        credit: '89'

      }],


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
  },
  methods: {
    load (index, row) {

    },

    handleDelete (index, row) {
      this.$confirm('此操作将拒绝生成订单且无法找回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除订单成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除订单'
        })
      })
    },

    handleAdd (index, row) {
      this.$confirm('此操作将立即生成账单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '订单生成成功!'
        })
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
  }

}
</script>
