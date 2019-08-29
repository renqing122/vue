<template>
  <el-container>
    <el-header>订单管理</el-header>
    <el-header1> 
    <el-input placeholder="请输入内容" v-model="input" class="searchClass">
      <div slot="prepend">
        <div class="centerClass">
          <el-select v-model="select" placeholder="请选择" style="width: 90px">
            <el-option label="房间ID" value="1"></el-option>
            <el-option label="订单ID" value="2"></el-option>
          </el-select>
        </div>
        <div class="centerClass">
          <div class="line"></div>
        </div>
      </div>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </el-header1>
   


    <el-main>  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="orderid"
      label="订单ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="roomnumber"
      label="房间号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="way"
      label="租赁方式"
      width="100">
    </el-table-column>
    <el-table-column
      prop="totalday"
      label="租赁天数"
      width="100">
    </el-table-column>
    <el-table-column
      prop="stime"
      label="开始时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="etime"
      label="结束时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="totalmoney"
      label="总租金"
      width="100">
    </el-table-column>
     <el-table-column
      prop="orderstate"
      label="订单状态"
      width="100">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style>
.el-header,
.el-footer {
  background-image: url("../../assets/logo.png");
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header1{
  background-color: #b3c0d1;
   color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.searchClass{
  border: 1px solid #c5c5c5;
  border-radius: 20px;
  background: #f4f4f4;
}
.searchClass .el-input-group__prepend {
  border: none;
  background-color: transparent;
  padding: 0 10px 0 30px;
}
.searchClass .el-input-group__append {
  border: none;
  background-color: transparent;
}
.searchClass .el-input__inner {
  height: 36px;
  line-height: 36px;
  border: none;
  background-color: transparent;
}
.searchClass .el-icon-search{
  font-size: 16px;
}
.searchClass .centerClass {
  height: 100%;
  line-height: 100%;
  display: inline-block;
  vertical-align: middle;
  text-align: right;
}
.searchClass .line {
  width: 1px;
  height: 26px;
  background-color: #c5c5c5;
  margin-left: 14px;
}
.searchClass:hover{
  border: 1px solid #D5E3E8;
  background: #fff;
}
.searchClass:hover .line {
  background-color: #D5E3E8;
}
.searchClass:hover .el-icon-search{
  color: #409eff;
  font-size: 16px;
}
</style>

<script>
  export default {
    data() {
      return {
        tableData: [{
          orderid: 111,
          name: '王小虎',
          roomnumber: '787',
          way: '长租',
          totalday:'67天',
          stime:'2019-05-04',
          etime: '2019-07-18', 
          totalmoney: '6700.00',
          orderstate: '审核中'
        }
        ]
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      
    }
  }
</script>