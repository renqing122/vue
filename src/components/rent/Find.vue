<template>
  <el-container>
    <el-header>可租房间</el-header>
    <el-header1> 
    <el-input placeholder="请输入内容" v-model="input" class="searchClass">
      <div slot="prepend">
        <div class="centerClass">
          <el-select v-model="select" placeholder="请选择" style="width: 90px">
            <el-option label="单人间" value="1"></el-option>
            <el-option label="双人间" value="2"></el-option>
            <el-option label="四人间" value="3"></el-option>
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
      prop="roomid"
      label="房间ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="roomnumber"
      label="房间号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="peoplenumber"
      label="房间可住人数"
      width="150">
    </el-table-column>
   
    <el-table-column
      prop="money"
      label="每日租金"
      width="150">
    </el-table-column>

    <el-table-column
      prop="dsc"
      label="房间简介"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
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
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          roomid: 111,
          roomnumber: '123',
          peoplenumber: '4人间',
          money: '200.00',
          dsc: ''
        
        }, {
          roomid: 41,
          roomnumber: '933',
          peoplenumber: '1人间',
          money: '120.00',
           dsc: ''
        }, {
           roomid: 143,
          roomnumber: '123',
          peoplenumber: '4人间',
          money: '680.00',
           dsc: ''
        }, {
           roomid: 431,
          roomnumber: '123',
          peoplenumber: '2人间',
          money: '150.00',
           dsc: ''
        }]
      }
    }
  }
</script>