<template>
  <div class="pricing-view">
    <HeaderComponent />
    <div class="pricing-container">
      <h1 class="pricing-title">Pricing</h1>
      <p class="pricing-description">
        Our pricing is not volatile, but it's not stagnant either, it's exactly
        what it should be.
      </p>
      <div class="pricing-list">
        <div
          :key="item.plan"
          v-for="item in pricingData"
          class="pricing-item"
          :class="{ 'popular-item': item.popular }"
        >
          <div class="item-plan">{{ item.plan }}</div>
          <div class="item-price">
            <span>{{ item.price.toLocaleString("ko-KR") }}원</span> / 월
          </div>
          <div class="item-detail">{{ item.detail }}</div>
          <button class="btn-start">Get Started</button>

          <div v-if="item.popular" class="popular">Most Popular</div>
        </div>
      </div>
    </div>

    <div class="feature-container">
      <h1 class="feature-title">Compare Features</h1>

      <div class="feature-list">
        <div class="feature-item" v-for="item in pricingData" :key="item.plan">
          <h1 class="feature-plan-title">{{ item.plan }}</h1>

          <div
            v-for="feature in item.features"
            :key="feature.title"
            class="feature-detail"
          >
            <span class="feature-title">
              <i
                v-if="feature.available"
                class="fas fa-check-circle"
                style="color: #ffc025"
              ></i>

              {{ feature.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "PricingView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      pricingData: [
        {
          plan: "Basic",
          price: 10000,
          detail: "For individuals and small teams",
          popular: false,
          features: [
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
          ],
        },
        {
          plan: "Pro",
          price: 1000000,
          detail: "For individuals and small teams",
          popular: true,
          features: [
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
          ],
        },
        {
          plan: "Basic",
          price: 10000000,
          detail: "For individuals and small teams",
          popular: false,
          features: [
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
            {
              title: "Market Forecasting",
              available: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
.pricing-container,
.feature-container {
  margin: 0 auto;
  padding: 20px;
  max-width: 1440px;
}

.pricing-title,
.feature-title {
  margin: 40px 0;
  font-size: 2.5rem;
  text-align: center;
}

.pricing-description {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 40px;
}

.pricing-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pricing-item {
  width: 300px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #282828;
}
.pricing-item:nth-child(2) {
  background-color: inherit;
}

.pricing-item .item-plan {
  font-size: 1.8rem;
  margin-bottom: 15px;
}

.pricing-item .item-price {
  margin-bottom: 15px;
}
.pricing-item .item-price span {
  font-size: 2.5rem;
  font-weight: bold;
}

.pricing-item .item-detail {
  margin-bottom: 20px;
}

.btn-start {
  width: 100%;
  border: none;
  cursor: pointer;
  display: block;
  padding: 10px 20px;
  transition: background-color 0.3s;
  border-radius: 5px;
  background-color: #ffc025;
}

.btn-start:hover {
  background-color: #ff9f00;
}

.popular-item {
  position: relative;
}

.popular {
  top: 0;
  right: 0;
  color: white;
  padding: 5px 10px;
  position: absolute;
  font-size: 0.85rem;
  background: #ffc025;
  border-radius: 5px;
}

.feature-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-item {
  width: 300px;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
}

.feature-item .feature-plan-title {
  font-size: 1.8rem;
  padding-bottom: 10px;
}

.feature-item .feature-detail {
  margin-bottom: 10px;
}

.feature-item .feature-title {
  font-size: 1.1rem;
  margin-left: 10px;
}
</style>
