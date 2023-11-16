<template>
  <Header />

  <div class="main">
    <div class="intro">
      <div class="intro__title">
        코모는 “코인의 모든것“ 이라는 뜻에서 나온 이름입니다.
      </div>
      <div class="intro__content">
        가상화폐 시장은 단순한 거래소 매매 뿐만 아니라 다양한 방식의 수익화
        기회가 존재합니다. 하지만 많은 사람들은 아직도 단순한 차트매매와 본인의
        감에 의존하는 매매를 하고 있습니다. 우리는 이러한 비이성적, 비효율적
        매매를 개선하고 아래와 같이 사람들이 투자하고 거래하는 방식에 혁명을
        일으키려 합니다.
      </div>
      <div class="intro__content">
        <div class="intro__content__title">
          첫째 시장의 방향성을 예측할수 없음을 인정하고 효율적인 대응이 가능한
          최고의 툴을 개발합니다.
        </div>
        <div class="intro__content__title">
          둘째 가상화폐의 다양한 수익창출 기회를 개발하고 그 기회들을 봇을 통해
          수익으로 연결합니다.
        </div>
      </div>
      <div class="intro__content">
        이러한 혁명을 이루고자 하는 열망에서 두명의 창립자 이창희 와 이정호는
        코모(COMO)를 설립했으며 아래와 같이 사업을 운영하겠습니다.
      </div>
      <div class="intro__content">
        <div class="intro__content__title">
          첫째 사용자가 암호화폐 수입을 안정화하고 합리적인 의사결정으로 매매를
          하는데 도움이 되는 신뢰할 수 있는 플랫폼을 구축하기 위해 최선을
          다하겠습니다.
        </div>
        <div class="intro__content__title">
          둘째 우리는 사용자 피드백을 수용하여 개선을 추진하고 플랫폼을
          성장시키며 여러 뛰어난 제품으로 개발하겠습니다.
        </div>
        <div class="intro__content__title">
          셋째 우리는 고객 중심을 유지하고 모든 코모의 제품군에 반영될 수 있도록
          노력하겠습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "IntroView",

  components: {
    Header,
  },
};
</script>

<style>
* {
  /* border: 1px solid red; */
}

.main {
  width: 100%;
  height: 100vh;
}

.intro {
  width: 100%;
  height: 100%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.intro__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.intro__content {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.intro__content__title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
