import { watch, ref, onMounted } from 'vue';
import { useSpeechSynthesis } from '@vueuse/core';
import data from './data';

const { voiceUIActive } = data();

const voice = ref<SpeechSynthesisVoice>(
  undefined as unknown as SpeechSynthesisVoice
);
let synth: SpeechSynthesis;

const pitch = ref(1);
const rate = ref(1);

const text = ref('');

const speker = useSpeechSynthesis(text, {
  voice,
  pitch,
  rate,
});

const voices = ref<SpeechSynthesisVoice[]>([]);

if (speker.isSupported.value) {
  // load at last
  setTimeout(() => {
    synth = window.speechSynthesis;
    voices.value = synth.getVoices();
    voice.value = voices.value[110];
  });
}
const play = async() => {
  if (speker.status.value === 'pause') {
    window.speechSynthesis.resume();
  } else {
    voiceUIActive.value = false;
    if (text.value === '') await new Promise((r) => setTimeout(r, 1000));
    speker.speak();
  }
};
watch(speker.status, (status) => {
  console.log(status);
  if (status === 'end') {
    text.value = '';
    voiceUIActive.value = true;
  }
});

export default () => {
  return {
    play,
    text,
    speker,
  };
};
