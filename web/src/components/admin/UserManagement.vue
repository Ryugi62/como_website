<template>
  <div class="user-management">
    <h2>사용자 관리</h2>
    <button @click="toggleAddUserForm" class="add-user-button">
      {{ showAddUserForm ? "폼 숨기기" : "사용자 추가" }}
    </button>

    <div v-if="showAddUserForm" class="add-user-form">
      <h3>새 사용자 추가</h3>
      <form @submit.prevent="addUser">
        <!-- 기존 입력 필드 (이름, 이메일) -->
        <div class="form-group">
          <label for="name">이름</label>
          <input
            v-model="newUser.name"
            type="text"
            id="name"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input
            v-model="newUser.email"
            type="email"
            id="email"
            required
            class="form-control"
          />
        </div>
        <!-- 추가 입력 필드 -->
        <div class="form-group">
          <label for="contact">연락처</label>
          <input
            v-model="newUser.contact"
            type="text"
            id="contact"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="subscriptionStatus">구독 여부</label>
          <select
            v-model="newUser.subscriptionStatus"
            id="subscriptionStatus"
            required
            class="form-control"
          >
            <option disabled value="">구독 여부 선택</option>
            <option>구독 중</option>
            <option>구독 안함</option>
          </select>
        </div>
        <!-- 나머지 입력 필드 추가 -->
        <div class="form-group">
          <label for="subscribedProduct">결제상품</label>
          <input
            v-model="newUser.subscribedProduct"
            type="text"
            id="subscribedProduct"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="subscriptionStartDate">구독시작일</label>
          <input
            v-model="newUser.subscriptionStartDate"
            type="date"
            id="subscriptionStartDate"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="subscriptionEndDate">구독종료일</label>
          <input
            v-model="newUser.subscriptionEndDate"
            type="date"
            id="subscriptionEndDate"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="subscriptionAmount">구독결제금액</label>
          <input
            v-model="newUser.subscriptionAmount"
            type="number"
            id="subscriptionAmount"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="referralLink">레퍼럴링크</label>
          <input
            v-model="newUser.referralLink"
            type="text"
            id="referralLink"
            required
            class="form-control"
          />
        </div>
        <button type="submit" class="submit-button">추가</button>
      </form>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>이메일</th>
          <th>연락처</th>
          <th>구독 여부</th>
          <th>결제상품</th>
          <th>구독시작일</th>
          <th>구독종료일</th>
          <th>구독결제금액</th>
          <th>레퍼럴링크</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.contact }}</td>
          <td>{{ user.subscriptionStatus }}</td>
          <td>{{ user.subscribedProduct }}</td>
          <td>{{ user.subscriptionStartDate }}</td>
          <td>{{ user.subscriptionEndDate }}</td>
          <td>{{ user.subscriptionAmount }}</td>
          <td>{{ user.referralLink }}</td>
          <td class="actions">
            <button @click="editUser(user)" class="edit-button">수정</button>
            <button @click="deleteUser(user.id)" class="delete-button">
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserManagement",

  data() {
    return {
      users: [
        {
          id: 1,
          name: "홍길동",
          email: "hong@example.com",
          contact: "010-1234-5678",
          subscriptionStatus: "구독 중",
          subscribedProduct: "프리미엄 패키지",
          subscriptionStartDate: "2021-01-01",
          subscriptionEndDate: "2022-01-01",
          subscriptionAmount: 50000,
          referralLink: "https://example.com/ref=hong",
        },
        {
          id: 2,
          name: "김철수",
          email: "dflk@gmail.com",
          contact: "010-1234-5678",
          subscriptionStatus: "구독 중",
          subscribedProduct: "프리미엄 패키지",
          subscriptionStartDate: "2021-01-01",
          subscriptionEndDate: "2022-01-01",
          subscriptionAmount: 50000,
          referralLink: "https://example.com/ref=hong",
        },
      ],
      newUser: {
        name: "",
        email: "",
        contact: "",
        subscriptionStatus: "",
        subscribedProduct: "",
        subscriptionStartDate: "",
        subscriptionEndDate: "",
        subscriptionAmount: 0,
        referralLink: "",
      },

      showAddUserForm: false,
    };
  },

  methods: {
    toggleAddUserForm() {
      this.showAddUserForm = !this.showAddUserForm;
    },

    addUser() {
      const newId = this.users.length + 1;
      this.users.push({ ...this.newUser, id: newId });
      this.resetNewUserForm();
    },

    editUser(user) {
      console.log("Edit feature implementation required:", user);
    },

    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },

    resetNewUserForm() {
      // 모든 필드를 초기화
      Object.keys(this.newUser).forEach((key) => {
        this.newUser[key] = key === "subscriptionAmount" ? 0 : "";
      });
      this.showAddUserForm = false;
    },
  },
};
</script>

<style scoped>
/* 추가한 스타일 */
.form-group {
  gap: 10px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

/* 기존 스타일 유지 */
.user-management {
  color: #333;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.user-management h2,
h3 {
  color: #333;
}

.add-user-button,
.submit-button {
  background-color: #005f73;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
}

.edit-button {
  background-color: #005f73;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.delete-button {
  background-color: #d72323;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.add-user-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
}

.user-management table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.user-management th,
td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

.user-management th {
  color: white;
  text-align: center;
  background-color: #005f73;
}

.actions {
  display: flex;
  gap: 10px;
}
.actions button {
  flex: 1;
}
</style>
