<template>
<div>
  <el-menu
    :default-active="navList"
    router
    mode="horizontal"
    class="el-menu-demo"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item
      v-for="(item,i) in navList"
      :key="i"
      :index="item.name"
    >
      {{ item.navItem }}
    </el-menu-item>
    <div>Hi,{{this.tenantName}}</div> 
    <!-- 修改位置 -->
  </el-menu>
</div>
</template>

<script>
export default {
  props: {
    "tenantId": String
  },
  data () {
    return {
      navList: [
        { name: `/rinformation/${this.tenantId}`, navItem: '修改个人信息' },
        { name: `/order/${this.tenantId}`, navItem: '查询房源' },
        { name: `/myorder/${this.tenantId}`, navItem: '我的订单' },
        { name: `/myreport/${this.tenantId}`, navItem: '我的报修' },
        { name: `/mycomplain/${this.tenantId}`, navItem: '我的投诉' }
      ],
      tenantName:''
    }
  },
  created(){
    this.apiPost();
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    apiPost(){
      this.$http
      .post('/api/v1/operator/queryTenantByTenantId',{"tenantId":this.tenantId})
      .then(result=>{
        this.tenantName=result.data.tenantName
      })
    }
  }
}
</script>

<style>
.el-header,
.el-footer {
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
</style>