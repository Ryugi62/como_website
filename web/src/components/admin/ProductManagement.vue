<template>
  <div class="product-management">
    <h2>상품 관리</h2>
    <button @click="toggleProductForm" class="add-product-button">
      {{ showProductForm ? "폼 숨기기" : "상품 추가" }}
    </button>

    <div v-if="showProductForm" class="product-form">
      <h3>{{ editableProduct ? "상품 수정" : "새 상품 추가" }}</h3>
      <form @submit.prevent="handleFormSubmit">
        <input
          v-model="editableProduct.name"
          type="text"
          placeholder="상품명"
          required
        />
        <input
          v-model.number="editableProduct.price"
          type="number"
          placeholder="가격"
          required
        />
        <input
          v-model.number="editableProduct.stock"
          type="number"
          placeholder="재고"
          required
        />
        <textarea
          v-model="editableProduct.description"
          placeholder="설명"
        ></textarea>
        <button type="submit" class="submit-button">저장</button>
      </form>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>상품명</th>
          <th>가격</th>
          <th>재고</th>
          <th>설명</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.description }}</td>
          <td class="actions">
            <button @click="setEditableProduct(product)" class="edit-button">
              수정
            </button>
            <button @click="deleteProduct(product.id)" class="delete-button">
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
  name: "ProductManagement",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Sample Product 1",
          price: 1000,
          stock: 50,
          description: "Description for product 1",
        },
        // Additional product data...
      ],
      showProductForm: false,
      editableProduct: { name: "", price: 0, stock: 0, description: "" },
    };
  },
  methods: {
    toggleProductForm() {
      this.showProductForm = !this.showProductForm;
      if (!this.showProductForm) {
        this.resetEditableProduct();
      }
    },
    setEditableProduct(product) {
      this.editableProduct = { ...product };
      this.showProductForm = true;
    },
    handleFormSubmit() {
      if (this.editableProduct.id) {
        const index = this.products.findIndex(
          (p) => p.id === this.editableProduct.id
        );
        this.products.splice(index, 1, this.editableProduct);
      } else {
        const newProduct = { ...this.editableProduct, id: Date.now() };
        this.products.push(newProduct);
      }
      this.toggleProductForm();
    },
    deleteProduct(productId) {
      this.products = this.products.filter(
        (product) => product.id !== productId
      );
    },
    resetEditableProduct() {
      this.editableProduct = { name: "", price: 0, stock: 0, description: "" };
    },
  },
};
</script>

<style scoped>
.product-management {
  color: #333;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.product-management h3 {
  text-align: center;
}

.add-product-button,
.submit-button {
  background-color: #005f73;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  cursor: pointer;
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

.product-management table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.product-management th,
.product-management td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

.product-management th {
  background-color: #f4f4f4;
}

form input[type="text"],
form input[type="number"],
form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  box-sizing: border-box;
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
