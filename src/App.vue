<script lang="ts">
import Header from './components/layout/Header.vue';
import { defineComponent, watch, ref, onMounted } from 'vue';
import { useSpeechRecognition, useSpeechSynthesis } from '@vueuse/core';
import { useRouter, RouterView } from 'vue-router';
import data from './composebels/data';
import gpt from './composebels/Gpt';
import textToSpeech from './composebels/TextToSpeech';
import VoiceUi from './composebels/VoiceUI';
import { ProductData } from './interface/productInterface';

export default defineComponent({
  components: { Header },
  setup() {
    const { main, advice, diverece } = gpt();
    // advice('what is the best laptop for a gamer');
    // main();
    const { play, text } = textToSpeech();

    const { speech } = VoiceUi();
    const { push, back } = useRouter();

    const {
      detailResult,
      listResult,
      searchinput,
      updateCart,
      information,
      paymentMethod,
      pay,
    } = data();

    if (speech.isSupported.value) {
      watch(speech.result, async () => {
        if (!speech.isFinal.value) {
          return;
        }
        let result: string = speech.result.value
          .trim()
          .toLocaleLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, '');
        console.log(result);
        if (result.includes('show the difference between product ')) {
          const listNumber: string[] = result
            .replace('show the difference between product ', '')
            .replace(' and', '')
            .split(' ');
          const number = parseWordOrNumber(listNumber[0]);
          const number2 = parseWordOrNumber(listNumber[1]);
          console.log(number);
          console.log(number2);
          if (!isNaN(number) && !isNaN(number2)) {
            const divereceText = await diverece(
              listResult.value[number - 1],
              listResult.value[number2 - 1]
            );
            if (divereceText) {
              text.value = divereceText;
            } else {
              text.value = 'sorry i dont know the answer to that question';
            }
          } else {
            text.value = "didn't understand the number";
          }
        } else if (result.includes('hey shop')) {
          console.log('hey shopbot');
          const adviceresponce = await advice(result.replace('hey shop ', ''));
          console.log(adviceresponce);
          if (adviceresponce) {
            text.value = adviceresponce;
          } else {
            text.value = 'sorry i dont know the answer to that question';
          }
        } else if (
          result.includes('credit card number') &&
          window.location.href.includes('checkout') &&
          paymentMethod.value == 1
        ) {
          information.value.creditCardNumber = result
            .replace('credit card number ', '')
            .trim();
        } else if (
          result.includes('credit card expiration date') &&
          window.location.href.includes('checkout') &&
          paymentMethod.value == 1
        ) {
          let test = result
            .replace('credit card expiration date', '')
            .replace(/[^0-9]/g, '')
            .trim();

          if (test.length >= 4) {
            let month = test.substring(0, 2);
            let day = test.substring(2, 4);
            information.value.creditCardExpirationDate = `${month}/${day}`;
          }
        } else if (
          result.includes('credit card security code') &&
          window.location.href.includes('checkout') &&
          paymentMethod.value == 1
        ) {
          information.value.creditCardSecurityCode = result
            .replace('credit card security code ', '')
            .replace(/[^0-9]/g, '')
            .trim();
        } else if (
          result.includes('paypal email') &&
          window.location.href.includes('checkout') &&
          paymentMethod.value == 1
        ) {
          information.value.paypalEmail = result
            .replace('paypal email ', '')
            .trim();
        } else if (
          result.includes('paypal password') &&
          window.location.href.includes('checkout') &&
          paymentMethod.value == 1
        ) {
          information.value.paypalPassword = result
            .replace('paypal password ', '')
            .trim();
        } else if (
          result.includes('place order') &&
          window.location.href.includes('checkout')
        ) {
          if (pay()) push('/');
          else text.value = 'payment failed the details are not correct';
        } else if (
          result.includes('payment methods') &&
          window.location.href.includes('checkout')
        ) {
          if (result.includes('credit card')) {
            paymentMethod.value = 1;
          } else if (result.includes('paypal')) {
            paymentMethod.value = 2;
          }
        } else if (
          result.includes('postal code') &&
          window.location.href.includes('checkout')
        ) {
          information.value.postalCode = result
            .replace('postal code ', '')
            .trim();
        } else if (
          result.includes('country') &&
          window.location.href.includes('checkout')
        ) {
          information.value.country = result.replace('country ', '').trim();
        } else if (
          result.includes('city') &&
          window.location.href.includes('checkout')
        ) {
          information.value.city = result.replace('city ', '').trim();
        } else if (
          result.includes('address') &&
          window.location.href.includes('checkout')
        ) {
          information.value.address = result.replace('address ', '').trim();
        } else if (
          result.includes('email') &&
          window.location.href.includes('checkout')
        ) {
          information.value.email = result.replace('email ', '').trim();
        } else if (
          result.includes('name') &&
          window.location.href.includes('checkout')
        ) {
          information.value.name = result.replace('name ', '').trim();
        } else if (
          result.includes('check out') &&
          window.location.href.includes('cart')
        ) {
          text.value = 'give your details and pay';
          push('/checkout');
        } else if (
          result.includes('delete') &&
          window.location.href.includes('cart')
        ) {
          const numberPart = result.replace('delete ', '').trim();
          const numberResult = parseWordOrNumber(numberPart);
          let cart = JSON.parse(localStorage.getItem('productList') || '[]');
          if (!isNaN(numberResult)) {
            text.value =
              'deleted ' +
              cart[numberResult - 1].productTitle +
              ' from your shopping cart. Now you have ' +
              (cart.length - 1) +
              ' items in your shopping cart';
            cart.splice(numberResult - 1, 1);
            localStorage.setItem('productList', JSON.stringify(cart));
            updateCart.value = true;
          } else {
            text.value = "didn't understand the number";
          }
        } else if (
          result.includes('show product') &&
          window.location.href.includes('cart')
        ) {
          const numberPart = result.replace('show product', '').trim();
          const numberResult = parseWordOrNumber(numberPart);
          const local: ProductData[] = JSON.parse(
            localStorage.getItem('productList') || '[]'
          );
          if (!isNaN(numberResult)) {
            if (local) push('/product/' + local[numberResult - 1].asin);
            text.value =
              'show product ' +
              numberResult +
              local[numberResult - 1].productTitle;
          } else {
            text.value = "didn't understand the number";
          }
        } else if (
          result.includes('Add to List') &&
          window.location.href.includes('product')
        ) {
          const existingProducts = JSON.parse(
            localStorage.getItem('productList') || '[]'
          );
          const listasin = existingProducts.map(
            (existingProduct: ProductData) => existingProduct.asin
          );
          if (!listasin.includes(detailResult.value.asin)) {
            existingProducts.push(detailResult.value);
            text.value =
              'added ' +
              detailResult.value.productDescription +
              ' to your basket. Now you have ' +
              (JSON.parse(localStorage.getItem('productList') || '[]').length +
                1) +
              ' items in your basket';
            localStorage.setItem(
              'productList',
              JSON.stringify(existingProducts)
            );
          }
          if (speech.isListening.value) speech.stop();
        } else if (
          result.includes('variant') &&
          window.location.href.includes('product')
        ) {
          const list: String[] = result.replace('variant ', '').split(' ');
          detailResult.value.variations.find((variant: any) => {
            list.map((word) => {
              if (variant.variationName.includes(word)) {
                variant.values.map((value: any) => {
                  if (value.value.toLowerCase().includes(list[1])) {
                    text.value = word + value.value;
                    push('/product/' + value.asin);
                  }
                });
              }
            });
          });
        } else if (
          result.includes('show product') &&
          window.location.href.includes('search')
        ) {
          const numberPart = result.replace('show product', '').trim();
          const numberResult = parseWordOrNumber(numberPart);

          if (!isNaN(numberResult)) {
            console.log(listResult.value[numberResult - 1]);
            text.value =
              'show product ' +
              numberResult +
              listResult.value[numberResult - 1].productDescription;
            push('/product/' + listResult.value[numberResult - 1].asin);
          } else {
            text.value = "didn't understand the number";
          }
        } else if (result.includes('search')) {
          result = result.replace('search ', '');
          searchinput.value = result;
          text.value = 'searching ' + result;
          push('/search/' + result + '/1');
        }

        //navigation
        else if (result.includes('go back')) {
          back();
        } else if (result.includes('navigate to shopping cart')) {
          text.value =
            'navigate to shopping cart. There are ' +
            JSON.parse(localStorage.getItem('productList') || '[]').length +
            ' items in your basket';
          push('/cart');
        } else if (result.includes('navigate to home')) {
          text.value = 'navigate to home';
          push('/');
        }

        // Scroll
        else if (result.includes('scroll up')) {
          const screenHeight = window.innerHeight;
          window.scrollBy(0, -screenHeight / 2);
        } else if (result.includes('scroll down')) {
          const screenHeight = window.innerHeight;
          window.scrollBy(0, screenHeight / 2);
        } else if (result.includes('scroll to top')) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (result.includes('scroll to bottom')) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          });
        } else if (result != '') {
          if (speech.isListening.value) {
            text.value = result + 'is not a valid command';
          }
        }
        play();
      });
    }

    const parseWordOrNumber = (input: string): number => {
      // Probeer het direct te converteren naar een getal
      const asNumber = Number(input);
      if (!isNaN(asNumber)) {
        return asNumber;
      }
      const wordNumberMap: { [key: string]: number } = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        // Voeg meer mappings toe zoals nodig
      };

      return wordNumberMap[input.toLowerCase()] || NaN;
    };
    speech.start();
    return {};
  },
});
</script>

<template>
  <div class="grid h-screen grid-rows-[min-content_1fr]">
    <Header />
    <RouterView class="bg-slate-200" />
  </div>
</template>

<style scoped></style>
