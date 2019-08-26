<template>
  <el-form
    :model="inputForm"
    ref="inputForm"
  >
    <el-input
      v-model="input"
      placeholder="账号"
    ></el-input>
    <el-input
      v-model="number"
      placeholder="密码"
    ></el-input>
    <el-button
      type="danger"
      @click="apiPost()"
    >Post</el-button>
    <span v-text="apiPostResult"></span>
  </el-form>
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {
      inputForm: {
      },
      input: '',
      number: '',
      apiPostResult: ''
    }
  },
  created () { },
  methods: {
    apiPost () {
      if (this.input === '') {
        this.$message.error('Required!')
        return
      }
      this.$http
        .post('/api/v1/greeting', { name: this.input })
        .then(res => {
          this.apiPostResult = res.data
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
<style>
</style>
