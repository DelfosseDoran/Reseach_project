<script lang="ts">
import { ShoppingCart, UserRound } from 'lucide-vue-next';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import data from '../../composebels/data';
export default defineComponent({
  name: 'Header',
  components: {
    ShoppingCart,
    UserRound,
  },
  setup() {
    const { push, currentRoute } = useRouter()
    const {searchinput}=data()
    const search=()=>{
      //go to search page whit searchinput.value
      push('/search/'+searchinput.value+'/1')
    }
    return {searchinput,search};
  },
});
</script>

<template>
  <header class="bg-white flex justify-between p-2 px-4 shadow-md ">
    <router-link class="text-xl font-medium" to="/">Webshop</router-link>
    <div class="flex gap-4"><input
      type="text"
      class="border border-gray-300 rounded-md p-1 "
      placeholder="Search"
      v-model="searchinput"
    />
    <button class="bg-sky-900 text-gray-100 p-1 px-4 rounded-md" @click="search">
      search
    </button>
  </div>
    <ul class="flex gap-4 items-center">
      <li>
        <router-link to="/cart"><ShoppingCart class="h-5" /></router-link>
      </li>
    </ul>
  </header>
</template>
