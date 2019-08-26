<template>
  <div>
      <md-dialog-prompt
      :md-active.sync="active"
      v-model="value"
      md-title="姓名"
      md-input-maxlength="10"
      md-input-placeholder="Type your name..."
      md-confirm-text="确认修改" />
    <md-list>
      <md-list-item>姓名：</md-list-item>
      <md-list-item>性别：</md-list-item>
      <md-list-item>年龄：</md-list-item>
      <md-list-item>邮箱：</md-list-item>
      <md-list-item>手机号：</md-list-item>
      <md-list-item ><md-button class="md-primary md-raised" @click="active = true">修改个人信息</md-button></md-list-item>
      <span v-if="value">Value: {{ value }}</span>
      <md-list-item ><md-button class="md-primary md-raised" @click="active = true">修改个人密码</md-button></md-list-item>
      <span v-if="value">Value: {{ value }}</span>>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'ListTypes',
  methods: {
    change () {
    this.$router.push({ path: '/userchange' })
    },
    alert () {
      window.alert('...')
    },
  },
  data: () => ({
      active: false,
      value: null
    })
}
</script>

<style lang="css" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>