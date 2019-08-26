<style lang="css" scoped>
	.login-msg {
		padding: 40px;
		text-align: center;
	}
	.msg {
		padding: 100px;
		text-align: center;
		font-size: 40px;
    color: rgb(1, 1, 2);
    }
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }


</style>
<template>
	<div>
    <md-button class="md-primary" v-on:click="login">登录</md-button>
    <md-button class="md-primary" v-on:click="register">注册</md-button>
    <md-button class="md-primary">维修中心</md-button>
    <md-button disabled>联系客服</md-button>
  
		<v-header title="青年小屋-只属于年轻人的房屋租赁平台">
		<router-link slot="right" v-if="user.id" to="/home">{{user.name}}</router-link>
		</v-header>
    <div>
    <md-card>
      <md-card-media-cover>
        <md-card-media md-ratio="16:9">
          <img src="https://vuematerial.io/assets/examples/card-sky.jpg" alt="Skyscraper">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">Without text background</span>
            <span class="md-subhead">I bet you can't read this</span>
          </md-card-header>

          <md-card-actions>
            <md-button>Neither this</md-button>
            <md-button>Or this</md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <md-card>
      <md-card-media-cover md-text-scrim>
        <md-card-media md-ratio="16:9">
          <img src="https://vuematerial.io/assets/examples/card-sky.jpg" alt="Skyscraper">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">Gradient background</span>
            <span class="md-subhead">16/9 image</span>
          </md-card-header>

          <md-card-actions>
            <md-button>Action</md-button>
            <md-button>Action</md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <md-card>
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="4:3">
          <img src="https://vuematerial.io/assets/examples/card-sky.jpg" alt="Skyscraper">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">Solid background</span>
            <span class="md-subhead">4/3 image</span>
          </md-card-header>
        </md-card-area>
      </md-card-media-cover>
    </md-card>

    <md-card>
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="1:1">
          <img src="https://vuematerial.io/assets/examples/card-sky.jpg" alt="Skyscraper">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">Solid background</span>
            <span class="md-subhead">1/1 image</span>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>share</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </div>
		<!-- <div class="login-msg" v-if="!user.id">
			<router-link to="/login">你还未登录，请先登录</router-link>
		</div> -->
		<div class="msg" v-if="user.id">
			<img width="200" :src="logo" alt=""> <br>
			欢迎入住青年小屋！
		</div>
	</div>
</template>
<script>
    import { mapState } from 'vuex'
  	import logo from './logo.png'
    export default {
      methods: {
        login() {
           this.$router.push({ path: '/login' })
        },
        register() {
           this.$router.push({ path: '/register' })
        },
        
      },
		  data() {
		  	return {
		  		logo
		  	}
      },
      computed: mapState({ user: state => state.user }),
    }
    data: () => ({
      selectedEmployee: null,
      employees: [
        'Jim Halpert',
        'Dwight Schrute',
        'Michael Scott',
        'Pam Beesly',
        'Angela Martin',
        'Kelly Kapoor',
        'Ryan Howard',
        'Kevin Malone',
        'Creed Bratton',
        'Oscar Nunez',
        'Toby Flenderson',
        'Stanley Hudson',
        'Meredith Palmer',
        'Phyllis Lapin-Vance'
      ]
    })
</script>
