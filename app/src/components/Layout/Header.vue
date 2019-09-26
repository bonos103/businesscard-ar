<template lang="pug">
  div(:class="$style.header")
    h1(:class="$style.title")
      logo-simple-icon
    div(:class="$style.menu")
      div(:class="$style.buttonGroup")
        div(
          :class="$style.userMenu",
          @mouseenter.prevent="toggleMenu(true)",
          @mouseleave.prevent="toggleMenu(false)",
          @touchend.prevent="toggleMenu()",
        )
          user-circle-icon
          div(v-if="isMenu", :class="$style.userMenuBox")
            div(:class="$style.userMenuHeader")
              div(:class="$style.userMenuUser") tennisnowboarderyou@gmail.com
            div(:class="$style.userMenuBody")
              div
                div(:class="$style.userMenuItem") アカウント
                div(:class="$style.userMenuItem") ログアウト
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
    position: absolute;
    top: 100%;
    right: 0;
    width: 240px;
    background-color: #fff;
    border: 1px solid var(--gray-lighter);
    border-radius: 10px;
    box-shadow: 0 0 10px color-mod(var(--black) a(10%));
    &::before {
      position: absolute;
      content: '';
      top: -20px;
      left: 0;
      width: 100%;
      height: 20px;
    }
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
    toggleMenu(bool) {
      if (bool) {
        this.isMenu = bool
        return
      }
      this.isMenu = !this.isMenu
    },
  },
}
</script>
