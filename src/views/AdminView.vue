<template>
  <HeaderComponent />

  <div class="admin-view">
    <div class="content">
      <h1 class="content-title">관리자 페이지</h1>
      <div class="feature-container">
        <div class="features">
          <div
            class="feature"
            v-for="feature in features"
            :key="feature.title"
            @click="selectFeature(feature.title)"
          >
            <i :class="feature.icon"></i>
            <p>{{ feature.title }}</p>
          </div>
        </div>
      </div>

      <hr />

      <div class="selected-feature-content">
        <component v-if="currentComponent" :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import UserManagement from "@/components/admin/UserManagement.vue";
import ProductManagement from "@/components/admin/ProductManagement.vue";

export default {
  name: "AdminView",

  components: {
    HeaderComponent,
    UserManagement,
    ProductManagement,
  },

  data() {
    return {
      features: [
        {
          icon: "fas fa-users",
          title: "회원 관리",
          component: UserManagement,
        },
        {
          icon: "fas fa-box",
          title: "상품 관리",
          component: ProductManagement,
        },
        // {
        //   icon: "fas fa-shopping-cart",
        //   title: "주문 관리",
        //   component: OrderManagement,
        // },
      ],

      selectedFeature: "회원 관리",
    };
  },

  computed: {
    currentComponent() {
      const feature = this.features.find(
        (f) => f.title === this.selectedFeature
      );

      return feature ? feature.component : null;
    },
  },

  methods: {
    selectFeature(title) {
      this.selectedFeature = title;
    },
  },
};
</script>

<style scoped>
.admin-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #fafafa;
  padding: 50px 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 1440px;
}

.content-title {
  margin: 50px 0;
  font-size: 36px;
  font-weight: bold;
  color: #333;
}

.feature-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
}

.features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 120px;
  cursor: pointer;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0;
}
.feature:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.feature i {
  font-size: 40px;
  margin-bottom: 15px;
  color: #005f73;
}

.feature p {
  font-size: 18px;
  color: #333;
}

hr {
  width: 100%;
  margin: 50px 0;
  border: 1px solid #e0e0e0;
}

.selected-feature-content {
  width: 100%;
  margin-bottom: 50px;
}

.selected-feature-content h2 {
  color: #005f73;
  margin-top: 20px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}

@media screen and (max-width: 768px) {
  .content-title {
    font-size: 28px;
  }

  .feature {
    width: 140px;
    height: 140px;
  }

  .feature i {
    font-size: 30px;
  }

  .feature p {
    font-size: 16px;
  }
}
</style>
