<template lang="pug">
  div(:class="$style.wrapper")
    div(:class="$style.eyecatch")
      div
        h1
          | QRコードを設置するだけ。
          br
          | ARでちょっと楽しく。
        router-link(to="Signin")
          a-button(
            type="primary",
            size="large",
          ) オリジナルARを作成する(無料)

    div(:class="$style.step")
      div(:class="$style.stepItem")
        img(:class="$style.stepImage", src="@/assets/images/top/step1.png")
        div 読み込む
      div(:class="$style.stepItem")
        img(:class="$style.stepImage", src="@/assets/images/top/step2.png")
        div かざす
      div(:class="$style.stepItem")
        img(:class="$style.stepImage", src="@/assets/images/top/step3.png")
        div 体験する

    div(:class="$style.section")
      h2(:class="$style.sectionTitle") 試してみる？
      div(:class="$style.try")
        div(:class="$style.tryCode")
          img(src="@/assets/images/top/businesscard.png")
        div(:class="$style.trySection")
          div
            div(:class="$style.tryLabel") スマホでQRコードを読み込んでください。
            div(:class="$style.tryText")
              | QRコードを読み込むとWebブラウザを開きます。
              br
              | ブラウザ上で起動したカメラをこちらのQRコードに向けてください。

    div(:class="$style.section")
      h2(:class="$style.sectionTitle") QRARの特徴
      div(:class="$style.feature")
        div(:class="$style.featureSection")
          h3(:class="$style.featureTitle") アプリ不要
          div(:class="$style.featureDescription")
            | QRARでは、専用アプリをインストールする必要はありません。普段お使いのブラウザでARを表示できるので、気軽に楽しんでいただけます。
        div(:class="$style.featureSection")
          h3(:class="$style.featureTitle") QRコードにかざすだけ
          div(:class="$style.featureDescription")
            | QRコードが、ARを認識するためのARマーカーとなっているので。QRコードを設置するだけで、ARの表示を実現させました。
        div(:class="$style.featureSection")
          h3(:class="$style.featureTitle") 作成後でもデータを更新可
          div(:class="$style.featureDescription")
            | 発行したQRコードに表示される内容は、リアルタイムに更新可能です。入力した内容が古くなる心配はありません。

    div(:class="$style.signupSection")
      router-link(to="Signin")
        a-button(
          type="primary",
          size="large",
        ) オリジナルARを作成する(無料)
</template>
<style module>
  .wrapper {
    width: 100%;
  }
  .eyecatch {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding-top: 80px;
    padding-bottom: 40px;
    @media (--md) {
      height: 400px;
      padding-top: 60px;
      padding-bottom: 60px;
    }
    & h1 {
      font-size: 7vw;
      font-weight: bold;
      text-align: center;
      line-height: 1.75;
      margin-bottom: 1.5em;
      @media (--md) {
        font-size: 4.6rem;
      }
      @media (--xs) {
        font-size: 7.4vw;
      }
    }
  }

  .section {
    padding-top: 40px;
    @media (--md) {
      padding-top: 80px;
    }
  }
  .sectionTitle {
    font-size: 2.4rem;
    font-weight: bold;
    text-align: center;
    padding-top: 1em;
    padding-bottom: 1em;
    @media (--md) {
      font-size: 3.2rem;
    }
  }
  .step {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 700px;
    padding-top: 30px;
    padding-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    @media (--md) {
      max-width: 700px;
      padding-top: 30px;
      padding-bottom: 60px;
    }
    @media (--lg) {
      max-width: 900px;
    }
  }
  .stepItem {
    position: relative;
    flex: 1 1 33.33%;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    @media (--md) {
      font-size: 2.4rem;
    }
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 35%;
      right: -7px;
      width: 0;
      height: 0;
      border-left: 12px solid var(--black);
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      transform: translateY(-50%);
    }
  }
  .stepImage {
    width: 100%;
    max-width: 180px;
    padding: 0 10%;
    margin-bottom: 20px;
    @media (--md) {
      max-width: 190px;
    }
    @media (--lg) {
      min-width: 220px;
    }
  }
  .registerButton {
    text-align: center;
  }

  .try {
    max-width: 672px;
    padding: 0 16px;
    margin: 0 auto;
  }
  .tryCode {
    max-width: 455px;
    box-shadow: 0 10px 20px -8px color-mod(var(--black) a(15%));
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 30px;
    & img {
      width: 100%;
    }
  }
  .trySection {
    display: flex;
    justify-content: center;
  }
  .tryLabel {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.8em;
  }
  .tryText {
    font-size: 1.4rem;
  }

  .featureSection {
    max-width: calc(var(--section-width) + 32px);
    padding: 0 16px;
    margin-left: auto;
    margin-right: auto;
    & + .featureSection {
      margin-top: 40px;
    }
  }
  .featureTitle {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 1em;
  }
  .featureDescription {
    font-size: 1.6rem;
  }

  .signupSection {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 80px;
  }
</style>
<script>

export default {
  name: 'home',
  metaInfo() {
    return {
      meta: [
        {
          vmid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0',
        },
      ],
    }
  },
}
</script>
