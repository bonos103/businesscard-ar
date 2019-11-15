<template lang="pug">
  div(:class="$style.header")
    h1(:class="$style.title")
      logo-simple-icon
    div(:class="$style.menu")
      div(:class="$style.buttonGroup")
        a-dropdown(v-model="isMenu")
          div(:class="$style.userMenu")
            user-circle-icon
          div(:class="$style.userMenuBox", slot="overlay")
            div(:class="$style.userMenuHeader")
              div(:class="$style.userMenuUser") tennisnowboarderyou@gmail.com
            div(:class="$style.userMenuBody")
              div
                div(:class="$style.userMenuItem") アカウント
                div(:class="$style.userMenuItem", @click="logout()") ログアウト
</template>
<style module>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    background-color: #fff;
    box-shadow: 0 0 10px color-mod(var(--black) a(10%));
    padding: 0 20px;
    @media (--md) {
      padding: 0 30px;
    }
  }
  .title {
    color: var(--black);
    font-size: 2.4rem;
    margin-bottom: 0;
  }
  .menu {}
  .buttonGroup {
    display: flex;
    align-items: center;
  }
  .userMenu {
    position: relative;
    font-size: 3.6rem;
  }
  .userMenuBox {
    position: relative;
    width: 240px;
    background-color: #fff;
    border: 1px solid var(--gray-lighter);
    border-radius: 10px;
    box-shadow: 0 0 10px color-mod(var(--black) a(10%));
  }
  .userMenuHeader {
    font-size: 1.2rem;
    border-bottom: 1px solid var(--gray-lightest);
    padding: 10px;
  }
  .userMenuUser {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .userMenuBody {
    padding: 10px;
  }
  .userMenuItem {
    font-size: 1.4rem;
    padding: 0.3em 0;
  }
</style>
<script>
import { mapActions } from 'vuex'
import { notification } from 'ant-design-vue'
import { USER_LOGOUT } from '@/store/modules/users/types'
import LogoSimpleIcon from '@/components/Icon/LogoSimpleIcon.vue'
import UserCircleIcon from '@/components/Icon/UserCircleIcon.vue'

export default {
  components: {
    LogoSimpleIcon,
    UserCircleIcon,
  },
  data() {
    return {
      isMenu: false,
    }
  },
  methods: {
    ...mapActions('users', {
      USER_LOGOUT,
    }),
    toggleMenu(bool) {
      if (bool) {
        this.isMenu = bool
        return
      }
      this.isMenu = !this.isMenu
    },
    async logout() {
      const result = await this.USER_LOGOUT()
      if (result) {
        notification.success({ message: result.data.message })
        this.toggleMenu(false)
        this.$router.push({ name: 'Signin' })
      }
    },
  },
}
</script>
