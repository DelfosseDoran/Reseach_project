import { watch, ref } from 'vue';
import { useSpeechRecognition } from '@vueuse/core';
import TextToSpeech from './TextToSpeech';
import data from './data';

const { voiceUIActive } = data();

const lang = ref('en-US');
const speech = useSpeechRecognition({
  lang: 'en-US',
  continuous: true,
  interimResults: false,
});

const { speker } = TextToSpeech();

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
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'nine',
];

const grammar = `#JSGF V1.0;grammar colors;public <color> = ${listGramer.join(
  ' | '
)} ;`;

watch(speech.isSupported, (isSupported) => {
  if (!isSupported) {
    console.log('SpeechRecognition is not supported in your browser.');
  }
});
watch(speech.isListening, async (isListening) => {
  if (isListening) {
    console.log('Listening...');
  } else {
    console.log('Stopped listening.');
    if (voiceUIActive.value) {
      await new Promise((r) => setTimeout(r, 1000));
      speech.start();
    }
  }
});

const selectedLanguage = ref(lang.value);
watch(lang, (lang) =>
  speech.isListening.value ? null : (selectedLanguage.value = lang)
);
watch(speech.isListening, (isListening) =>
  isListening ? null : (selectedLanguage.value = lang.value)
);

if (speech.isSupported.value) {
  // @ts-expect-error missing types
  const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  speech.recognition!.grammars = speechRecognitionList;
}

watch(voiceUIActive, (active) => {
  if (active) {
    speech.start();
  } else {
    speech.stop();
  }
});

export default () => {
  return {
    speech,
  };
};
