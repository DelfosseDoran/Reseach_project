<script lang="ts">
import get from '@/composebels/Api';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  components: {},
  setup() {
    const { currentRoute } = useRouter();
    const page = ref(1);
    const product = computed(() => currentRoute.value.params.search);
    const { getSearchProducts } = get();
    const data = ref<any>();
    const result = ref<any>();
    const fetchData = async () => {
      try {
        const response = await getSearchProducts(product.value, page.value);
        data.value = response;
        result.value = response.searchProductDetails;
        console.log('API response:', response);
      } catch (error) {
        console.error('Error fetching search products:', error);
      }
    };

    onMounted(fetchData);

    watch(product, fetchData);

    return { data, result };
  },
});
</script>

<template>
  <main class="">
      <div
        class="bg-white p-4 m-4 rounded-md shadow-md w-[80vw] mx-auto"
        v-if="data"
        v-for="item in result"
        :key="item.id"
      >
        <h1
          class="font-medium text-xl overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ item.productDescription }}
        </h1>
        <div class="flex items-end justify-between">
          <img :src="item.imgUrl" alt="" />
          <div class="grid gap-2 justify-end">
            <p class="text-right">€ {{ item.price }}</p>
            <router-link
              :to="'/product/' + item.asin"
              class="shadow-md bg-sky-900 text-gray-100 p-1 px-4 rounded-md font-medium"
            >
              detail
            </router-link>
          </div>
      </div>
    </div>
  </main>
</template>
