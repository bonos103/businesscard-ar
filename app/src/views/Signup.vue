<template lang="pug">
  div(:class="$style.wrapper")
    div(:class="$style.inner")
      h1(:class="$style.title")
        logo-svg

      div(:class="$style.social")
        div(:class="$style.socialList")
          div(:class="$style.socialItem")
            img(src="@/assets/images/icons/facebook.png", @click="handleSocial('facebook')")
          div(:class="$style.socialItem")
            img(src="@/assets/images/icons/twitter.png", @click="handleSocial('twitter')")

      div(:class="$style.divider")

      validation-observer(
        tag="form",
        ref="observer",
        @submit.prevent="handleSubmit",
        :class="$style.form",
        novalidate,
      )
        form-control
          label(:class="$style.label") E-mail
          text-field(
            label="E-mail",
            name="email",
            rules="required|email",
            v-model="email",
            placeholder="input your email address.",
            type="email",
          )
        form-control
          label(:class="$style.label") Password
          text-field(
            label="Password",
            name="password",
            rules="required|alpha_dash|min:6",
            vid="password",
            v-model="password",
            placeholder="半角英数 6文字以上",
            type="password",
          )
        form-control
          label(:class="$style.label") Confirm Password
          text-field(
            label="Password",
            name="password",
            rules="required|confirmed:password",
            v-model="passwordConfirm",
            type="password",
          )
        div(:class="$style.buttonBlock")
          a-button(htmlType="submit", size="large", ghost) 登録(無料)
</template>
<style module>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    background-color: #000031;
    padding: 40px 10%;
  }
  .inner {
    width: 100%;
  }
  .title {
    color: #fff;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0;
    margin-bottom: 3em;
    @media (--md) {
      font-size: 2.4rem;
    }
    & svg {
      fill: #fff;
      width: 180px;
      height: 38.78px;
    }
  }
  .social {
    margin-bottom: 30px;
  }
  .socialList {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .socialItem {
    padding-left: 15px;
    padding-right: 15px;
    & img {
      width: 40px;
      height: 40px;
    }
  }
  .divider {
    border-bottom: 1px solid var(--gray-darker);
    max-width: 400px;
    padding-top: 10px;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
  }
  .form {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  .label {
    color: #fff;
    font-size: 1.4rem;
  }
  .buttonBlock {
    text-align: center;
    margin-top: 40px;
  }
</style>
<script>
import _get from 'lodash/get'
import { mapActions } from 'vuex'
import { ValidationObserver } from 'vee-validate'
import { notification } from 'ant-design-vue'
import { USER_REGISTER, USER_SOCIAL } from '@/store/modules/users/types'
import FormControl from '@/components/Form/Control.vue'
import TextField from '@/components/Form/TextField.vue'
import LogoSvg from '@/assets/images/icons/logo.svg?component'

export default {
  components: {
    ValidationObserver,
    FormControl,
    LogoSvg,
    TextField,
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },
  methods: {
    ...mapActions('users', {
      USER_REGISTER,
      USER_SOCIAL,
    }),
    async submit() {
      const data = {
        email: this.email,
        password: this.password,
      }
      const response = await this.USER_REGISTER(data).catch((err) => {
        const message = _get(err, 'response.data[0].message')
        notification.error({
          message,
        })
      })
      if (response) {
        notification.success({
          message: '登録ありがとうございます。',
          description: '入力いただいたメールアドレスに登録完了メールを送信しました。',
          duration: 6,
        })
        console.log(response)
      }
    },
    async handleSubmit() {
      const isValid = await this.$refs.observer.validate()
      Object.values(this.$refs.observer.refs).forEach(provider => provider.setFlags({
        dirty: true,
        touched: true,
      }))
      if (isValid) {
        await this.submit()
      }
    },
    async handleSocial(source) {
      await this.USER_SOCIAL(source)
      this.$router.push({ name: 'Project' })
    },
  },
}
</script>
