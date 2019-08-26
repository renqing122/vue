<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">登录</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">用户名</label>
                <md-input
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  v-model="form.firstName"
                  :disabled="sending"
                />
                <span
                  class="md-error"
                  v-if="!$v.form.firstName.required"
                >Please enter your name.</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.firstName.minlength"
                >Invalid  name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">密码</label>
                <md-input
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="form.lastName"
                  :disabled="sending"
                />
                <span
                  class="md-error"
                  v-if="!$v.form.lastName.required"
                >Please enter your PIN.</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.lastName.minlength"
                >Invalid name</span>
              </md-field>
            </div>
          </div>

        </md-card-content>
        <md-progress-bar
          md-mode="indeterminate"
          v-if="sending"
        />
        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="sending"
          >登录</md-button>
          <md-button
            class="md-primary"
            v-on:click="back"
          >返回</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      age: null,
      email: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        maxLength: maxLength(3)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    back () {
      this.$router.replace({ path: '/index' })
    },
    clearForm () {
      this.$v.$reset()
      this.form.firstName = null
      this.form.lastName = null
      this.form.age = null
      this.form.gender = null
      this.form.email = null
    },
    saveUser () {
      this.sending = true

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    },
  }
}
</script>

<style lang="css" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-layout-item.md-size-50.md-small-size-100 {
  margin-left: 27%;
}
</style>