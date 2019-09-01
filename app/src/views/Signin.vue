<template lang="pug">
  div(:class="$style.wrapper")
    div
      h1(:class="$style.title")
        span 名刺作成ツール
        | QRAR
      form
        form-control
          label(:class="$style.label") Email
          a-input(placeholder="input your email address.", type="email")
        form-control
          label(:class="$style.label") Password
          a-input(placeholder="半角英数 6文字以上", type="password")
        div(:class="$style.buttonBlock")
          a-button(size="large", ghost) ログイン
</template>
<style module>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #000031;
    padding-left: 20px;
    padding-right: 20px;
  }
  .title {
    color: #fff;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0;
    margin-bottom: 2em;
    @media (--md) {
      font-size: 2.4rem;
    }
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
import FormControl from '@/components/Form/Control.vue'

export default {
  components: {
    FormControl,
  },
}
</script>
