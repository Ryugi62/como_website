<template>
  <div class="order-management">
    <h2>주문 관리</h2>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>고객명</th>
          <th>상품명</th>
          <th>주문수량</th>
          <th>총액</th>
          <th>주문일자</th>
          <th>작업</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.totalPrice }}</td>
          <td>{{ order.orderDate }}</td>
          <td class="actions">
            <button @click="editOrder(order)" class="edit-button">수정</button>
            <button @click="deleteOrder(order.id)" class="delete-button">
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
  name: "OrderManagement",
  data() {
    return {
      orders: [
        {
          id: 1,
          customerName: "고객 A",
          productName: "상품 1",
          quantity: 2,
          totalPrice: 2000,
          orderDate: "2023-01-01",
        },
        {
          id: 2,
          customerName: "고객 B",
          productName: "상품 2",
          quantity: 1,
          totalPrice: 1000,
          orderDate: "2023-01-02",
        },
      ],
    };
  },
  methods: {
    editOrder(order) {
      // 주문 수정 로직 (예시)
      alert(`주문 ${order.id} 수정 기능 구현 필요`);
    },
    deleteOrder(orderId) {
      this.orders = this.orders.filter((order) => order.id !== orderId);
    },
  },
};
</script>

<style scoped>
.order-management {
  color: #333;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
}

.order-management h2 {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.edit-button {
  background-color: #f9a825;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.delete-button {
  background-color: #d32f2f;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.actions {
  gap: 10px;
  display: flex;
  justify-content: space-between;
}
.actions button {
  flex-grow: 1;
}
</style>
