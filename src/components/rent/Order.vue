<template>
  <el-container>
    <el-header>
      <a
        id="logo"
        href=""
      ><img
          src="../../assets/logo.png"
          alt=""
        ></a>
      <div class="header-top">

        <el-menu
          router="true"
          :default-active="active-index"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#ffffff"
        >
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item></el-menu-item>
          <el-menu-item @click="primary">我的主页</el-menu-item>
          <el-menu-item @click="info">退出登录</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main>
      <div class="index-container">
        <div>
          <el-row>
       
            <div class="tableMain">
              <el-table
                :data="tableData"
                style="width: 100%"
              >
                <el-table-column
                  fixed
                  prop="roomId"
                  label="房间ID"
        
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="房间号"
              
                >
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="房间类型"
              
                >
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="房间价格"
         
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="房间地址"
                  width="300%"
                >
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span>
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                      >了解详情</el-button>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </el-row>
        </div>
      </div>
    </el-main>  
   
  </el-container>

</template>

<script>
export default {
  props:{
    "tenantId":String
  },
  name: "Index",
  data () {
    return {
      imageUrl: '',
      tableData: [],
    }
  },
  created () {
    this.apiGet();
  },
  mounted () { },
  methods: {
    apiGet () {
      this.$http.get('/api/v1/room/tenantQueryAll').then(result => {
        this.tableData = result.data
      })
    },
    handleEdit (index, row) {
      this.$router.push(`/detail/${this.tenantId}/${this.tableData[index].roomId}`)
    },  
    info(){
     this.$router.push('/')
    },
    primary(){
      this.$router.push(`/rmain/${this.tenantId}`)
    }
  }}

</script>

<style scoped>

.el-header {
  background-color: #ffffff;
  text-align: center;
   line-height: 70px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  /* margin-top: 10px; */
}
a > img {
  width: 150px;
  height: 60px;
}
#logo {
  position: absolute;
  left: 10px;
}
.el-header {
  margin: 0;
  height: 60px;
}
.el-menu {
  background-color: #ffffff;
  position: absolute;
  left: 13%;
}
.el-main {
  padding: 0;
  margin: 0;
}
.el-input {
  position: absolute;
  /* height: 1px; */
  width: 150px;
  right: 5%;
  margin-top: 15px;
  border-radius: 10px;
}
.el-footer {
  padding: 0;
}
.el-carousel__item h3 {
  color: #ffffff;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ffffff;
}
#homePic {
  margin-top: 20px;
}
#footer {
  margin: 0px;
  padding: 0;
}
#line {
  margin: 0px;
}
#line > .el-col:nth-child(1) {
  background: brown;
  color: brown;
}
#line > .el-col:nth-child(2) {
  background: rgb(219, 141, 39);
  color: rgb(219, 141, 39);
}
#line > .el-col:nth-child(3) {
  background: rgb(46, 33, 33);
  color: rgb(46, 33, 33);
}
#line {
  height: 2px;
  font-size: 0.1em;
}
#info > .el-col > .el-row {
  text-align: left;
}
</style>