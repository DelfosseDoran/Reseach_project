import { ref } from 'vue';

const listResult = ref < ProductData[]>([]);
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

export default () => {
  return { listResult, detailResult, searchinput, updateCart, information };
};
