<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import api from '@/composebels/Api';
import { useRouter } from 'vue-router';
import { ProductData } from '@/interface/productInterface';
export default defineComponent({
  components: {},
  setup() {
    const index = ref(0);
    const data = ref<ProductData>();
    const { currentRoute } = useRouter();
    const { getProducts } = api();
    const product = computed(() => currentRoute.value.params.id);
    console.log('Product parameter:', product.value);
    getProducts(product.value).then((response) => {
      console.log('API response:', response);
      data.value = response;
    });
    const changeImage = (i: number) => {
      index.value = i;
    };
     const addToLocalStorage = () => {
      // Get the existing products from local storage or initialize an empty array
      const existingProducts = JSON.parse(localStorage.getItem('productList') || '[]');

      // Check if the product is already in the list
      if (!existingProducts.some((existingProduct: ProductData) => existingProduct.id === data.value.id)) {
        // Add the current product to the list
        existingProducts.push(data.value);

        // Save the updated list to local storage
        localStorage.setItem('productList', JSON.stringify(existingProducts));

        // Notify the user or perform any other actions as needed
        console.log('Product added to the list:', data.value);
      } else {
        // Notify the user or perform any other actions as needed
        console.log('Product is already in the list:', data.value);
      }
    };
    return { data, index, changeImage,addToLocalStorage };
  },
});
</script>

<template>
  <main v-if="data" class="p-2 px-4">
    <div class=" bg-white rounded-md">
      <h1 class="text-lg font-medium p-4 py-2">{{ data.productTitle }}</h1>
      <div class="flex p-4">
      <div class=" w-2/3">
        <div class="h-96 w-96 mb-2 rounded-md bg-white">
          <img class="rounded-md h-96" :src="data.imageUrlList[index]" alt="" />
        </div>
        <div class="flex gap-2 w-full  bg-white p-2 rounded-md">
          <button
            class="rounded-md shadow-md"
            v-for="(img, i) in data.imageUrlList"
            @click="
              () => {
                changeImage(i);
              }
            "
          >
            <img class="rounded-md h-20" :src="img" alt="" />
          </button>
        </div>
      </div>
      <div class="w-1/3">
        <p class="text-right">{{ data.priceShippingInformation }}</p>
        <p class="text-right font-medium">€ {{ data.price }}</p>
        <p class="text-right">seller: {{ data.soldBy }}</p>
        <button @click="addToLocalStorage" class="rounded-md shadow-md mt-4">
          Add to List
        </button>
      </div></div>
    </div>
    <p>{{ data.productDescription }}</p>
  </main>
</template>
