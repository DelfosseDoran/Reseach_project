<script lang="ts">
import { ShoppingCart, UserRound } from 'lucide-vue-next';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Header',
  components: {
    ShoppingCart,
    UserRound,
  },
});
</script>

<template>
  <main class="bg-white flex justify-between p-2 px-4 shadow-md">
    <h1 class="text-xl font-medium">Webshop</h1>
    <input
      type="text"
      class="border border-gray-300 rounded-md p-1 w-1/3"
      placeholder="Search"
    />
    <ul class="flex gap-4 items-center">
      <li><router-link class="text-lg" to="/">Home</router-link></li>
      <li>
        <router-link to="/22"><ShoppingCart size="18" /></router-link>
      </li>
      <li>
        <router-link to="/22"><UserRound size="18" /></router-link>
      </li>
    </ul>
  </main>
</template>
