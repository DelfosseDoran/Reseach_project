<script lang="ts">
import Header from './components/layout/Header.vue';
import { defineComponent, watch, ref } from 'vue';
import { useSpeechRecognition } from '@vueuse/core';
import { useRouter, RouterView } from 'vue-router';
import data from './composebels/data';
import { ProductData } from '@interface/productInterface';
import { info } from 'console';

export default defineComponent({
  components: { Header },
  setup() {
    const { push, back } = useRouter();
    const lang = ref('en-US');

    const { detailResult, listResult, searchinput, updateCart, information } =
      data();

    const speech = useSpeechRecognition({
      lang: 'en-US',
      continuous: true,
      interimResults: false,
    });

    const listGramer: String[] = [
      'go back',
      'navigate to basket',
      'navigate to home',
      'search',
      'show product',
      'add product',
      'delete',
      'variant',
      'scroll up',
      'scroll down',
      'scroll to top',
      'scroll to bottom',
      'pay',
    ];

    const grammar = `#JSGF V1.0;grammar colors;public <color> = ${listGramer.join(
      ' | '
    )} ;`;

    if (speech.isSupported.value) {
      // @ts-expect-error missing types
      const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;
      const speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      speech.recognition!.grammars = speechRecognitionList;

      watch(speech.result, () => {
        if (!speech.isFinal.value) {
          return;
        }
        let result: string = speech.result.value.trim().toLocaleLowerCase();
        console.log(result);
        if (result.includes('payment methods') && window.location.href.includes('checkout')) {
          
        } else
        if (result.includes('postal code') && window.location.href.includes('checkout')) {
          information.value.postalCode = result.replace('postal code ', '').trim();
        } else
        if (result.includes('country') && window.location.href.includes('checkout')) {
          information.value.country = result.replace('country ', '').trim();
        }
        else
        if (
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
          result.includes('details and pay') &&
          window.location.href.includes('cart')
        ) {
          push('/checkout');
        } else if (
          result.includes('delete') &&
          window.location.href.includes('cart')
        ) {
          const numberPart = result.replace('delete ', '').trim();
          const numberResult = parseWordOrNumber(numberPart);
          let cart = JSON.parse(localStorage.getItem('productList') || '[]');
          cart.splice(numberResult - 1, 1);
          localStorage.setItem('productList', JSON.stringify(cart));
          updateCart.value = true;
        } else if (
          result.includes('show product') &&
          window.location.href.includes('cart')
        ) {
          const numberPart = result.replace('show product', '').trim();
          const numberResult = parseWordOrNumber(numberPart);
          const local: ProductData[] = JSON.parse(
            localStorage.getItem('productList') || '[]'
          );
          console.log({ local });
          if (!isNaN(numberResult)) {
            if (local) push('/product/' + local[numberResult - 1].asin);
          } else {
            console.log('Number part:', numberPart);
          }
        } else if (
          result.includes('add product') &&
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
          detailResult.value.variations.find((variant) => {
            list.map((word) => {
              if (variant.variationName.includes(word)) {
                variant.values.map((value) => {
                  if (value.value.toLowerCase().includes(list[1])) {
                    console.log(value.asin);
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
            push('/product/' + listResult.value[numberResult - 1].asin);
          } else {
            console.log('Number part:', numberPart);
          }
        } else if (result.includes('search')) {
          result = result.replace('search ', '');
          searchinput.value = result;
          push('/search/' + result + '/1');
        }

        //navigation
        else if (result.includes('go back')) {
          back();
        } else if (result.includes('navigate to basket')) {
          push('/cart');
        } else if (result.includes('navigate to home')) {
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
        }
        if (result != '') if (speech.isListening.value) speech.stop();
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

    watch(speech.isSupported, (isSupported) => {
      if (!isSupported) {
        console.log('SpeechRecognition is not supported in your browser.');
      }
    });
    watch(speech.isListening, async (isListening) => {
      if (isListening) {
        console.log('Listening...');
      } else {
        await new Promise((r) => setTimeout(r, 1000));
        speech.start();
      }
    });

    const selectedLanguage = ref(lang.value);
    watch(lang, (lang) =>
      speech.isListening.value ? null : (selectedLanguage.value = lang)
    );
    watch(speech.isListening, (isListening) =>
      isListening ? null : (selectedLanguage.value = lang.value)
    );
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
