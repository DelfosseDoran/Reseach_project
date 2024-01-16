<script lang="ts">
import { defineComponent, pushScopeId, ref, watch } from 'vue';
import { ProductData } from '@/interface/productInterface';
import data from '@/composebels/data';

export default defineComponent({
  setup() {
    const {updateCart} = data();
    const cart = ref<ProductData[]>([]);
    const price = ref<number>(0);

    const getPrice = () => {
      price.value = cart.value
        .map((product: ProductData) => product.price)
        .reduce((a: number, b: number) => a + b, 0);
    };

    const deleteProduct = (product: ProductData) => {
      const index = cart.value.indexOf(product);
      cart.value.splice(index, 1);
      localStorage.setItem('productList', JSON.stringify(cart.value));
      getPrice();
    };

    const updateCartFromLocalStorage = () => {
      const existingProducts = JSON.parse(
        localStorage.getItem('productList') || '[]'
      );
      cart.value = existingProducts;
      getPrice();
      updateCart.value = false;
    };

    watch(() => updateCart.value, () => {
      updateCartFromLocalStorage();
    });

    updateCartFromLocalStorage();

    return { cart, deleteProduct, price };
  },
});
</script>

<template>
  <div>
    <div class="flex justify-between p-4 text-lg font-medium">
      <h2>Shopping Cart</h2>
      <p>total: €{{ price }}</p>
      <RouterLink
        class="bg-sky-900 text-white p-4 py-2 rounded-md"
        to="/checkout"
        >details and pay</RouterLink
      >
    </div>
    <ul>
      <li v-for="(product, index) in cart" :key="product.id" class="m-4">
        <router-link :to="'/product/' + product.asin" class="w-full">
          <div class="flex gap-4 p-4 rounded-md justify-between bg-white">
            <div>
              <p>{{ index + 1 }}</p>
              <img :src="product.mainImage.imageUrl" class="h-60" alt="" />
            </div>
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
        </router-link>
      </li>
    </ul>
  </div>
</template>
