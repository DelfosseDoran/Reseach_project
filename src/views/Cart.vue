<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ProductData } from '@/interface/productInterface';

export default defineComponent({
  setup() {
    const existingProducts = JSON.parse(
      localStorage.getItem('productList') || '[]'
    );
    const price = ref<number>(
      existingProducts
        .map((product: ProductData) => product.price)
        .reduce((a: number, b: number) => a + b, 0)
    );
    const cart = ref<ProductData[]>(existingProducts);

    const deleteProduct = (product: ProductData) => {
      const index = cart.value.indexOf(product);
      cart.value.splice(index, 1);
      localStorage.setItem('productList', JSON.stringify(cart.value));
      price.value = cart.value
        .map((product: ProductData) => product.price)
        .reduce((a: number, b: number) => a + b, 0);
    };

    return { cart, deleteProduct, price };
  },
});
</script>

<template>
  <div>
    <div class="flex justify-between p-4 text-lg font-medium">
      <h2>Shopping Cart</h2>
      <p>total: €{{ price }}</p>
      <RouterLink class="bg-sky-900 text-white p-4 py-2 rounded-md" to="/checkout"
        >details and pay</RouterLink
      >
    </div>
    <ul>
      <li v-for="product in cart" :key="product.id" class="m-4">
        <div class="flex gap-4 p-4 rounded-md bg-white">
          <img :src="product.mainImage.imageUrl" class="h-60" alt="" />
          <div class="text-right">
            <p>{{ product.productTitle }}</p>
            <p>€{{ product.price }}</p>
            <button
              class="bg-sky-900 text-white p-4 py-2 rounded-md"
              @click="deleteProduct(product)"
            >
              delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
