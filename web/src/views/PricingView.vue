<template>
  <div class="pricing-view">
    <HeaderComponent />
    <section class="pricing-section">
      <h1 class="pricing-title">Pricing</h1>
      <p class="pricing-description">
        Our pricing is not volatile, but it's not stagnant either, it's exactly
        what it should be
      </p>
      <div class="pricing-cards">
        <div
          v-for="plan in pricingPlans"
          :key="plan.name"
          class="card-pricing"
          :class="{ 'is-popular': plan.isPopular }"
        >
          <p class="plan-name">{{ plan.name }}</p>
          <p class="plan-price">
            <strong>{{ plan.price.toLocaleString("ko-KR") }}원</strong> / 월
          </p>
          <p class="plan-details">{{ plan.details }}</p>
          <button class="button-get-started">Get Started</button>
          <div v-if="plan.isPopular" class="label-popular">Most Popular</div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <h1 class="features-title">Compare Features</h1>
      <div class="features-cards">
        <div v-for="plan in pricingPlans" :key="plan.name" class="card-feature">
          <h2 class="plan-name">{{ plan.name }}</h2>
          <div
            v-for="feature in plan.features"
            :key="feature.name"
            class="feature-item"
          >
            <span v-if="feature.isAvailable" class="icon-check">
              <i class="fas fa-check"></i>
              {{ feature.name }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "PricingView",
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      pricingPlans: [
        {
          name: "Basic",
          price: 10000,
          details: "For hobby projects or small teams.",
          isPopular: false,
          features: [
            { name: "1 User", isAvailable: true },
            { name: "Unlimited Projects", isAvailable: true },
            { name: "2GB Storage", isAvailable: true },
            { name: "Community Support", isAvailable: true },
          ],
        },
        {
          name: "Pro",
          price: 1000000,
          details: "For ambitious individuals.",
          isPopular: true,
          features: [
            { name: "5 Users", isAvailable: true },
            { name: "Unlimited Projects", isAvailable: true },
            { name: "50GB Storage", isAvailable: true },
            { name: "Community Support", isAvailable: true },
          ],
        },
        {
          name: "Business",
          price: 100000000,
          details: "For small to medium-sized businesses.",
          isPopular: false,
          features: [
            { name: "10 Users", isAvailable: true },
            { name: "Unlimited Projects", isAvailable: true },
            { name: "100GB Storage", isAvailable: true },
            { name: "Community Support", isAvailable: true },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.pricing-section,
.features-section {
  margin: 0 auto;
  padding: 20px;
  max-width: 1440px;
}

.pricing-section {
  margin-bottom: 40px;
}

.pricing-title,
.features-title {
  margin: 50px 0;
  font-size: 2.5rem;
  text-align: center;
}

.pricing-description {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 40px;
}

.pricing-cards,
.features-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card-pricing,
.card-feature {
  width: 300px;
  margin: 10px;
  padding: 20px;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-pricing:nth-child(odd) {
  background-color: #282828;
}

.card-feature .plan-name {
  font-size: 1.8rem;
  margin-bottom: 30px;
}

.card-pricing .plan-price {
  margin-top: 40px;
  margin-bottom: 15px;
}

.card-pricing .plan-price strong {
  font-size: 2.5rem;
  font-weight: bold;
}

.button-get-started {
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 50px;
  transition: background-color 0.3s;
  border-radius: 5px;
  background-color: #ffc025;
}
.button-get-started:hover {
  background-color: #ff9f00;
}

.label-popular {
  top: 0;
  right: 0;
  color: #282828;
  padding: 5px 10px;
  position: absolute;
  font-size: 0.85rem;
  background: #ffc025;
  border-radius: 5px;
}

.feature-item {
  margin-bottom: 15px;
}
.feature-item .icon-check {
  display: flex;
  align-items: center;
}
.feature-item .icon-check i {
  color: white;
  padding: 5px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: #ffc025;
}
</style>
