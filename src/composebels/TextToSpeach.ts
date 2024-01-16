import { useSpeechSynthesis } from '@vueuse/core';
import { onMounted, ref } from 'vue';

const voice = ref<SpeechSynthesisVoice>(
  undefined as unknown as SpeechSynthesisVoice
);
const text = ref('Hello, everyone! Good morning!');
const pitch = ref(1);
const rate = ref(1);

const speech = useSpeechSynthesis(text, {
  voice,
  pitch,
  rate,
});

let synth: SpeechSynthesis;

const voices = ref<SpeechSynthesisVoice[]>([]);

onMounted(() => {
  if (speech.isSupported.value) {
    // load at last
    setTimeout(() => {
      synth = window.speechSynthesis;
      voices.value = synth.getVoices();
      voice.value = voices.value[0];
    });
  }
});

const play=()=> {
  if (speech.status.value === 'pause') {
    console.log('resume');
    window.speechSynthesis.resume();
  } else {
    speech.speak();
  }
}

const pause=()=> {
  window.speechSynthesis.pause();
}

const stop=()=> {
  speech.stop();
}

export default () => {
  return { text, pitch, rate, voices, voice, play, pause, stop };
};