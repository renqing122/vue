<template>
  <div>
    <el-header>
      <a
        id="logo"
        href=""
      ><img
          src="../../assets/logo.png"
          alt=""
        ></a>
      <el-menu
        router="true"
        :default-active="active-index"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color=""
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

        <el-menu-item>
          <el-dropdown><span class="el-dropdown-link">
              登录<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="rentlogin()">用户登录</el-dropdown-item>
              <el-dropdown-item @click.native="rlogin()">管理员登录</el-dropdown-item>
              <el-dropdown-item @click.native="serlogin()">客服登录</el-dropdown-item>
              <el-dropdown-item @click.native="replogin()">师傅登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item>
          <el-dropdown><span class="el-dropdown-link">
              注册<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="rentregister()">用户注册</el-dropdown-item>
              <el-dropdown-item @click.native="serregister()">客服注册</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
        <el-menu-item @click="order">房源查看</el-menu-item>
        <el-menu-item @click="open">联系我们</el-menu-item>
      </el-menu>
    </el-header>
    <el-carousel
      height="540px"
      width="100%"
      margin="0"
    >
      <el-carousel-item>
        <img
          src="../../assets/bg2.png"
          alt=""
          width="90%"
          height="600"
        >
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="../../assets/2.jpg"
          alt=""
          width="90%"
          height="600"
        >
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="../../assets/3.jpg"
          alt=""
          width="90%"
          height="600"
        >
      </el-carousel-item>
    </el-carousel>
    <!-- <img
      id="homePic"
      src="../../assets/bg1.png"
      alt=""
      width="100%"
    > -->
    <!-- <el-row>
      <el-col :span="2"><img
          src="../../assets/ren.jpg"
          alt=""
        ></el-col>
      <el-col
        :span="3"
        offset="13"
      >
        <el-link><span class="icon-wechat"></span> 公众微信</el-link>
      </el-col>
      <el-col :span="3">
        <el-link><span class="icon-mail"></span> 企业邮箱</el-link>
      </el-col>
      <el-col :span="3">
        <el-link><span class="icon-oa"></span> OA办公</el-link>
      </el-col>
    </el-row>
    <div id="footer">
      <el-row id="line">
        <el-col :span="14">1</el-col>
        <el-col :span="2">2</el-col>
        <el-col :span="8">3</el-col>
      </el-row> -->
    <el-row
      id="info"
      style="height:30px; font-size:1em"
    >
      <el-col :span="16">
        <el-row>2019/8/29</el-row>
      </el-col>
      <el-col :span="8">暑期小学期项目</el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  methods: {
    open () {
      this.$alert('电话：17876734212   邮箱：qingnianxiaowu@163.com', '联系方式', {

        confirmButtonText: '返回',
      });
    },
    rentlogin () {
      this.$router.push('/rentlogin')
    },
    rlogin () {
      this.$router.push('/rlogin')
    },
    serlogin () {
      this.$router.push('/serlogin')
    },
    replogin () {
      this.$router.push('/replogin')
    },
    rentregister () {
      this.$router.push('/rentregister')
    },
    serregister () {
      this.$router.push('/serregister')
    },
    order () {
      this.$router.push('/morder')
    }
  }
}

</script>

<style scoped>
.el-header,
.el-footer {
  background-color: aliceblue;
  color: #fbaf0d;
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
  background-color: #ffffff;
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
