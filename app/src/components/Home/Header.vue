<template lang="pug">
  div(:class="$style.header")
    h1(:class="$style.title")
      span QRコード型WebAR作成ツール
      logo-icon
    div(:class="$style.menu")
      div(:class="$style.buttonGroup")
        //- router-link(to="/signup", :class="$style.button") 新規登録
        router-link(to="/signin", :class="$style.button") ログイン
</template>
<style module>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  .title {
    color: var(--black);
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: 0;
    & span {
      display: block;
      font-size: 1.2rem;
    }
    @media (--sm) {
      & span {
        font-size: 1rem;
      }
    }
  }
  .menu {}
  .buttonGroup {
    display: flex;
    align-items: center;
  }
  .button {
    color: var(--black);
    font-size: 1.2rem;
    padding: 0 5px;
    @media (--md) {
      font-size: 1.4rem;
    }
  }
</style>
<script>
import LogoIcon from '@/components/Icon/LogoIcon.vue'

export default {
  components: {
    LogoIcon,
  },
}
</script>
