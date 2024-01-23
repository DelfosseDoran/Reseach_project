import { ref } from 'vue';
import { useRouter } from 'vue-router';

const voiceUIActive = ref<boolean>(true);

const listResult = ref<ProductData[]>([]);
const detailResult = ref<any>(0);
const searchinput = ref<string>('');
const updateCart = ref<boolean>(false);
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
const paymentMethod = ref<number>(1);

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

    if (!validateExpirationDate(information.value.creditCardExpirationDate)) {
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
    console.log('Validation failed, do not proceed with payment');
    return false;
  }
  localStorage.removeItem('productList');
    return true;
};

export default () => {
  return {
    pay,
    listResult,
    detailResult,
    searchinput,
    updateCart,
    information,
    paymentMethod,
    voiceUIActive,
  };
};
