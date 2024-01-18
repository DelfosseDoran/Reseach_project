<script lang="ts">
import data from '@/composebels/data';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const { push } = useRouter();
    const {information,paymentMethod ,pay} = data();
    const changePaymentMethod = (method: number) => {
      paymentMethod.value = method;
      console.log(paymentMethod.value);
    };
    const payment=()=>{
    if(pay())
      push('/');
    }
    
    return { paymentMethod, changePaymentMethod, information, payment };
  },
});
</script>

<template>
  <main>
    <div class="grid w-2/3 mx-auto">
      <label for="name">name:</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.name"
        id="name"
      />

      <label for="email">email</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.email"
        id="email"
      />

      <label for="address">address</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.address"
        id="address"
      />

      <label for="city">city</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.city"
        id="city"
      />

      <label for="postalCode">postalCode</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.postalCode"
        id="postalCode"
      />
      <label for="country">country</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.country"
        id="country"
      />

      <label for="paymentMethod">payment methods</label>
      <select
        class="rounded-md p-1 mb-2"
        v-model="paymentMethod"
        
        id="paymentMethod"
      >
        <option :value="0" disabled>select payment method</option>
        <option :value="1">credit card</option>
        <option :value="2">paypal</option>
      </select>
      <div class="grid" v-if="paymentMethod === 1">
        <label for="creditCardNumber">credit card number</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.creditCardNumber"
          id="creditCardNumber"
        />

        <label for="creditCardExpirationDate">credit card expiration date</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.creditCardExpirationDate"
          id="creditCardExpirationDate"
        />

        <label for="creditCardSecurityCode">credit card security code</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.creditCardSecurityCode"
          id="creditCardSecurityCode"
        />
      </div>
      <div class="grid" v-if="paymentMethod === 2">
        <label for="paypalEmail">paypal email</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.paypalEmail"
          id="paypalEmail"
        />

        <label for="paypalPassword">paypal password</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.paypalPassword"
          id="paypalPassword"
        />
      </div>
      <div class="flex justify-center">
        <button class="bg-sky-900 text-white p-2 px-4 w-fit rounded-md" @click="payment">
          pay
        </button>
      </div>
    </div>
  </main>
</template>
