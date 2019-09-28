<template lang="pug">
  div(:class="$style.wrap")
    div(:class="$style.header")
      div(:class="$style.headerLeft")
        h1(:class="$style.logo")
          logo-simple-icon
        div(:class="$style.title")
          a-input(type="text", placeholder="プロジェクト名" value="はじめてのAR名刺")
      div(:class="$style.headerRight")
        div(:class="$style.item")
          minus-icon
          div(:class="$style.zoomLabel") 100%
          plus-icon
    div(:class="$style.toolHeader")
      div(:class="$style.headerRight")
        div(:class="$style.toolHeaderItem")
          label サイズ
          div(:class="$style.toolSize") 14
        div(:class="$style.toolHeaderItem")
          label カラー
          div(:class="$style.toolColor")
</template>
<style module>
  .wrap {
    background-color: color-mod(#fff a(90%));
    box-shadow: 0 0 10px color-mod(var(--black) a(10%));
  }
  .header,
  .toolHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid var(--gray-lighter);
  }
  .headerLeft {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    @media (--md) {
      padding-left: 30px;
    }
  }
  .headerRight {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .logo {
    color: var(--black);
    font-size: 2rem;
    margin-bottom: 0;
    margin-right: 5%;
  }
  .title {
    & input {
      font-size: 1.6rem;
      color: var(--black);
      &:not(:focus) {
        background-color: transparent;
        border: none;
      }
    }
  }
  .item {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: var(--gray-darker);
    & i {
      cursor: pointer;
    }
  }
  .zoomLabel {
    margin-left: 0.5em;
    margin-right: 0.5em;
    cursor: default;
  }
  .toolHeader {
    height: 60px;
  }
  .toolHeaderItem {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    color: var(--gray-darker);
    margin-right: 20px;
    & label {
      margin-right: 0.5em;
    }
  }
  .toolSize {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--black);
    cursor: pointer;
  }
  .toolColor {
    width: 28px;
    height: 28px;
    background-color: var(--coral);
    border: 1px solid var(--gray-lighter);
    border-radius: 15%;
    cursor: pointer;
  }
</style>
<script>
import LogoSimpleIcon from '@/components/Icon/LogoSimpleIcon.vue'
import MinusIcon from '@/components/Icon/MinusIcon.vue'
import PlusIcon from '@/components/Icon/PlusIcon.vue'

export default {
  components: {
    LogoSimpleIcon,
    MinusIcon,
    PlusIcon,
  },
}
</script>
