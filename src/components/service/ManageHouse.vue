<template>

  <div
    class="basetable"
    v-loading="loading"
    element-loading-text="拼命加载中"
  >
    <el-header>房源管理<el-button @click="back">返回</el-button>
      <el-button @click="add">添加房源</el-button>
    </el-header>
    <el-form class="head1">
    </el-form>
    <div class="tableMain">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="roomId"
          label="房间ID"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="房间号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="type"
          label="房间类型/人"
          width="100"
        >
        </el-table-column>

        <el-table-column
          prop="price"
          label="房间价格"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="房间地址"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="isAbandoned"
          label="是否禁用"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="isAvailable"
          label="是否可租"
          width="200"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
              >修改房源状态</el-button>
            </span>

          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<style scoped>
.el-header,
.el-footer {
  /* background-image: url("../../assets/add.png"); */
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
      image: '',
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
    handleEdit (index, row) {
      this.$confirm('确认修改该房源状态？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/api/v1/room/reSetRoomIsAbandoned', { "roomId": this.tableData[index].roomId })
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.apiGet();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '修改失败'
        })
      })
    },
    back () {
      this.$router.push(`/smain/${this.operatorId}`)
    },
    add () {
      this.$router.push(`/add/${this.operatorId}`)
      this.apiGet();
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
        .get('/api/v1/room/operatorQueryAll').then(result => {
          this.tableData = result.data
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].isAbandoned == "0") {
              this.tableData[i].isAbandoned = "否"
            }
            else {
              this.tableData[i].isAbandoned = "是"
            }
            if (this.tableData[i].isAvailable == "0") {
              this.tableData[i].isAvailable = "是"
            }
            else {
              this.tableData[i].isAvailable = "否"
            }
          }
        })
    },

  }

}
</script>
