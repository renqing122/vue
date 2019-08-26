<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar
        class="md-primary"
        md-elevation="0"
      >
        <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          菜单
        </md-button>
        <span class="md-title">管理员主页</span>
      </md-app-toolbar>

      <md-app-drawer
        :md-active.sync="menuVisible"
        md-persistent="mini"
      >
        <md-toolbar
          class="md-transparent"
          md-elevation="0"
        >
          <span>我的事项</span>

          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button md-dense"
              @click="toggleMenu"
            >

            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-button
              class="md-primary"
              v-on:click="order"
            >
              客服审核
            </md-button>
          </md-list-item>

          <md-list-item>
            <md-button
              class="md-primary"
              v-on:click="order"
            >
              其他事务
            </md-button>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        欢迎来到管理平台，工作就是如此简单。
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'PersistentMini',
  data: () => ({
    menuVisible: false
  }),
  methods: {
    order () {
      this.$router.push({ path: '/order' })
    },
    userimformation () {
      this.$router.push({ path: '/userimformation' })
    },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  },

}
</script>

<style lang="css" scoped>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(rgb(56, 172, 95), 0.12);
}
.md-drawer {
  width: 230px;
  max-width: calc(130vw - 125px);
}

.md-list {
  width: 140px;
}
</style>