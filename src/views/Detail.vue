<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import api from '@/composebels/Api';
import { useRouter } from 'vue-router';
import { ProductData } from '@/interface/productInterface';
import data from '../composebels/data';
export default defineComponent({
  components: {},
  setup() {
    const { detailResult } = data();
    const index = ref(0);
    // const data = ref<>();
    const { currentRoute } = useRouter();
    const { getProducts } = api();
    const product = computed(() => currentRoute.value.params.id);
    const changeImage = (i: number) => {
      index.value = i;
    };
    const addToLocalStorage = () => {
      const existingProducts = JSON.parse(
        localStorage.getItem('productList') || '[]'
      );
      const listasin = existingProducts.map(
        (existingProduct: ProductData) => existingProduct.asin
      );
      if (!listasin.includes(detailResult.value.asin)) {
        existingProducts.push(detailResult.value);
        localStorage.setItem('productList', JSON.stringify(existingProducts));
      } else {
        // Notify the user or perform any other actions as needed
        return;
      }
    };
    onMounted(() => {
      getProducts(product.value);
    });
    watch(product, () => {
      getProducts(product.value);
    });
    const getVariations = (asin: string) => {
      getProducts(asin)
    };
    return { detailResult, index, changeImage, addToLocalStorage, getVariations };
  },
});
</script>

<template>
  <main v-if="detailResult" class="p-2 px-4">
    <div class="bg-white rounded-md">
      <h1 class="text-lg font-medium p-4 py-2">
        {{ detailResult.productTitle }}
      </h1>
      <div class="flex p-4">
        <div class="w-2/3">
          <div class="h-96 w-96 mb-2 rounded-md bg-white">
            <img
              class="rounded-md h-96"
              :src="detailResult.imageUrlList[index]"
              alt=""
            />
          </div>
          <div class="flex gap-2 w-full bg-white p-2 rounded-md">
            <button
              class="rounded-md shadow-md"
              v-for="(img, i) in detailResult.imageUrlList"
              @click="changeImage(i)"
            >
              <img class="rounded-md h-20" :src="img" alt="" />
            </button>
          </div>
        </div>
        <div class="w-1/3 flex flex-col items-end">
          <p class="text-right">{{ detailResult.priceShippingInformation }}</p>
          <p class="text-right font-medium">€ {{ detailResult.price }}</p>
          <p class="text-right">seller: {{ detailResult.soldBy }}</p>
          <div v-for="variations in detailResult.variations" class="flex w-full justify-between">
            <p>{{ variations.variationName.trim().replace("variation_",'').replace('_name','') }}</p>
            <div class="flex gap-2">
              <button v-for="value in variations.values" @click="getVariations(value.asin)">
                {{ value.value }}
              </button>
            </div>
          </div>
          <button
            @click="addToLocalStorage"
            class="w-fit rounded-md shadow-md mt-4 bg-sky-900 text-white p-2 px-4"
          >
            Add to List
          </button>
        </div>
      </div>
    </div>
    <p>{{ detailResult.productDescription }}</p>
  </main>
</template>
