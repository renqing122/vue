<template>
  <div class="main">
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
    </el-menu>
  <div class="smain">
  </div>
  </div>
</template>

<script>
export default {
  props: {
    "operatorId": String
  },
  data () {
    return {
      navList: [
        { name: `/sinformation/${this.operatorId}`, navItem: '修改个人信息' },
        { name: `/manageorder/${this.operatorId}`, navItem: '订单管理' },
        { name: `/checkorder/${this.operatorId}`, navItem: '订单审核' },
        { name: `/managereport/${this.operatorId}`, navItem: '报修管理' },
        { name: `/managecomplain/${this.operatorId}`, navItem: '投诉管理' },
        { name: `/managehouse/${this.operatorId}`, navItem: '房源管理' },
        { name: `/addrepairman/${this.operatorId}`, navItem: '导入师傅' },
        { name: `/managerinformation/${this.operatorId}`, navItem: '管理租户信息' },
        { name: `/sorder/${this.operatorId}`, navItem: '代订房间' }
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style>
#smain{
  background:image('../assets/background1.png')
  /* -image:image('../assets/background1.png') */
}
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