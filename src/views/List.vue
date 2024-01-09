<script lang="ts">
import get from '@/composebels/Api';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {},
  async setup() {
    const { getSearchProducts } = get();
    const data = ref<any>();
    data.value = getSearchProducts('iphone', 1).then((res) => {
      console.log(res);
    });
    return { data };
  },
});
</script>

<template>
  <main>
    <div>
      test
      <ul>
      </ul>
    </div>
  </main>
</template>
