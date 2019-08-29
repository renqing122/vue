<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>订单管理</el-header>
    <el-header1>
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
                label="房间ID"
                value="1"
              ></el-option>
              <el-option
                label="用户ID"
                value="2"
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
    </el-header1>
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
          label="租赁天数"
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
                @click="handleEdit(scope.$index, scope.row)"
              >修改订单</el-button>
            </span>
            <span>
              <el-button
                size="small"
                @click="open"
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
      <el-form :model="form">
        <el-form-item label="订单状态">
          <el-select
            v-model="form.region"
            placeholder="请选择订单状态"
          >
            <el-option
              label="未审核"
              value=0
            ></el-option>
            <el-option
              label="未通过审核"
              value=1
            ></el-option>
            <el-option
              label="审核通过"
              value=2
            ></el-option>
            <el-option
              label="未支付"
              value=3
            ></el-option>
            <el-option
              label="逾期未支付"
              value=4
            ></el-option>
            <el-option
              label="进行中"
              value=5
            ></el-option>
            <el-option
              label="已结束"
              value=6
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
      select: '1',
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
    add () {
      this.form = {
        date: '',
        name: '',
        region: '',
        address: ''
      }
      this.dialogFormVisible = true
    },
    update () {
      this.form.date = reformat(this.form.date)
      this.tableData.push(this.form)
      this.dialogFormVisible = false
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
    open () {
      this.$alert('这是一段内容', '用户长租合同', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          });
        }
      })
    },
    apiGet () {
      this.$http
        .get('/api/v1/rentOrder/queryAll').then(result => {
          console.log('success')
          this.tableData = result.data
        })
    },
    search () {
      if (select == '1'){
        //按照房间id查询
      }else{
        //按照用户id查询
      }
    }
  }

}
</script>
