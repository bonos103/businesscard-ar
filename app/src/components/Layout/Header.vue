<template lang="pug">
  div(:class="$style.header")
    h1(:class="$style.title")
      span 名刺作成ツール
      br
      | QRAR
    div(:class="$style.menu")
      div(:class="$style.buttonGroup")
        a(href="#", :class="$style.button") 新規登録
        a(href="#", :class="$style.button") ログイン
</template>
<style module>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    color: #fff;
    font-style: 2rem;
    margin-bottom: 0;
    @media (--md) {
      & br {
        display: none;
      }
    }
    @media (--sm) {
      font-size: 1.6rem;
      line-height: 1.2;
      letter-spacing: 8px;
      & span {
        font-size: 1rem;
        letter-spacing: 0;
      }
    }
  }
  .menu {}
  .buttonGroup {
    display: flex;
    align-items: center;
  }
  .button {
    color: #fff;
    font-size: 1.2rem;
    padding: 0 5px;
    @media (--md) {
      font-size: 1.4rem;
    }
  }
</style>
