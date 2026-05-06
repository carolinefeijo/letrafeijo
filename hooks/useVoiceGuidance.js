import { useRef } from 'react';

/**
 * Hook para narração de textos ao focar ou passar o mouse em elementos.
 * Uso: const { speak, stop } = useVoiceGuidance();
 * Chame speak(text) para narrar, stop() para interromper.
 */
export default function useVoiceGuidance() {
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

  function speak(text, lang = 'pt-BR') {
    if (!synthRef.current || !text) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    synthRef.current.cancel();
    synthRef.current.speak(utter);
  }

  function stop() {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }

  return { speak, stop };
}
