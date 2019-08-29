<template>
 
  <el-menu :default-active="navList" router mode="horizontal" class="el-menu-demo" @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b"> 
 <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
  {{ item.navItem }}
 </el-menu-item>
</el-menu>  
</template>

<script>
  export default {
   data() {
  return {
  navList:[
    {name:'/order',navItem:'订单管理'},
    {name:'/find',navItem:'报修与投诉'},
    {name:'/manageroom',navItem:'房源管理'},
    {name:'/find',navItem:'导入师傅'},
    
  ]
  }
 },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
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
</style>