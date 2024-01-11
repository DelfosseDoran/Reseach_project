<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const paymentMethod = ref<number>(1);
    const information = ref({
      name: '',
      email: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      paymentMethod: 0,
      creditCardNumber: '',
      creditCardExpirationDate: '',
      creditCardSecurityCode: '',
      paypalEmail: '',
      paypalPassword: '',
    });
    const { push } = useRouter();
    const changePaymentMethod = (method: number) => {
      paymentMethod.value = method;
      console.log(paymentMethod.value);
    };
    const validateEmail = (email: string): boolean => {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateCreditCard = (creditCardNumber: string): boolean => {
      // Basic credit card number validation (you may want to use a library for a more thorough check)
      return /^\d{16}$/.test(creditCardNumber);
    };

    const validateExpirationDate = (expirationDate: string): boolean => {
      // Basic expiration date validation (you may want to use a library for a more thorough check)
      return /^\d{2}\/\d{2}$/.test(expirationDate);
    };

    const validateForm = (): boolean => {
      // Check if all required fields are filled in
      const requiredFields = [
        'name',
        'email',
        'address',
        'city',
        'country',
        'postalCode',
      ];

      if (requiredFields.some((field) => !information.value[field])) {
        console.error('Please fill in all required fields');
        return false;
      }

      // Additional validation based on payment method
      if (paymentMethod.value === 1) {
        // Credit card validation
        if (!validateCreditCard(information.value.creditCardNumber)) {
          console.error('Invalid credit card number');
          return false;
        }

        if (
          !validateExpirationDate(information.value.creditCardExpirationDate)
        ) {
          console.error('Invalid credit card expiration date');
          return false;
        }
      } else if (paymentMethod.value === 2) {
        // PayPal validation (you can add validation logic for PayPal fields if needed)
      }

      return true;
    };
    const pay = () => {
      if (!validateForm()) {
        console.log('Validation failed, do not proceed with payment')
        return;
      }
      localStorage.removeItem('productList');
      push('/');
    };
    return { paymentMethod, changePaymentMethod, information, pay };
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

      <label for="country">country</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.country"
        id="country"
      />

      <label for="postalCode">postalCode</label>
      <input
        class="rounded-md p-1 mb-2"
        type="text"
        v-model="information.postalCode"
        id="postalCode"
      />
      <label for="paymentMethod">paymentMethod</label>
      <select
        class="rounded-md p-1 mb-2"
        @change="(e) => changePaymentMethod(Number(e.target.value))"
        id="paymentMethod"
      >
        <option value="0" disabled>select payment method</option>
        <option value="1">credit</option>
        <option value="2">paypal</option>
      </select>
      <div class="grid" v-if="paymentMethod === 1">
        <label for="creditCardNumber">creditCardNumber</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.creditCardNumber"
          id="creditCardNumber"
        />

        <label for="creditCardExpirationDate">creditCardExpirationDate</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.creditCardExpirationDate"
          id="creditCardExpirationDate"
        />

        <label for="creditCardSecurityCode">creditCardSecurityCode</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.creditCardSecurityCode"
          id="creditCardSecurityCode"
        />
      </div>
      <div class="grid" v-if="paymentMethod === 2">
        <label for="paypalEmail">paypalEmail</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.paypalEmail"
          id="paypalEmail"
        />

        <label for="paypalPassword">paypalPassword</label>
        <input
          class="rounded-md p-1 mb-2"
          type="text"
          v-model="information.paypalPassword"
          id="paypalPassword"
        />
      </div>
      <div class="flex justify-center">
        <button class="bg-sky-900 text-white p-2 px-4 w-fit rounded-md" @click="pay">
          pay
        </button>
      </div>
    </div>
  </main>
</template>
