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
    getProducts(product.value).then((response) => {
      data.value = response;
    });
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
      if (!listasin.includes(data.value.asin)) {
        existingProducts.push(data.value);
        localStorage.setItem('productList', JSON.stringify(existingProducts));
      } else {
        // Notify the user or perform any other actions as needed
        return
      }
    };
    const getVariations = (asin:string) => {
      getProducts(asin).then((response) => {
        data.value = response;
      });
    };
    return { data, index, changeImage, addToLocalStorage,getVariations };
  },
});
</script>

<template>
  <main v-if="data" class="p-2 px-4">
    <div class="bg-white rounded-md">
      <h1 class="text-lg font-medium p-4 py-2">{{ data.productTitle }}</h1>
      <div class="flex p-4">
        <div class="w-2/3">
          <div class="h-96 w-96 mb-2 rounded-md bg-white">
            <img
              class="rounded-md h-96"
              :src="data.imageUrlList[index]"
              alt=""
            />
          </div>
          <div class="flex gap-2 w-full bg-white p-2 rounded-md">
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
        <div class="w-1/3 flex flex-col items-end">
          <p class="text-right">{{ data.priceShippingInformation }}</p>
          <p class="text-right font-medium">€ {{ data.price }}</p>
          <p class="text-right">seller: {{ data.soldBy }}</p>
          <select
          @change="(e)=>{getVariations(e.target.value)}"
            v-for="variations in data.variations"
            :name="variations"
            id=""
          >
            <option v-for="option in variations.values" :value="option.asin">
              <div>
                <img :src="option.imageUrl" alt="" />
                <p>{{ option.value }}</p>
              </div>
            </option>
          </select>

          <button
            @click="addToLocalStorage"
            class="w-fit rounded-md shadow-md mt-4 bg-sky-900 text-white p-2 px-4"
          >
            Add to List
          </button>
        </div>
      </div>
    </div>
    <p>{{ data.productDescription }}</p>
  </main>
</template>
