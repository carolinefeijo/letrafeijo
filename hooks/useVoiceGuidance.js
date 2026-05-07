import { useRef, useEffect } from 'react';

export default function useVoiceGuidance() {
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
      // "Acorda" as vozes para o navegador
      synthRef.current.getVoices();
    }
  }, []);

  function speak(text, lang = 'pt-BR') {
    // 1. TESTE DE DEBUG: Veja se o texto aparece no console (F12)
    console.log("Tentando narrar:", text);

    if (!synthRef.current || !text) {
      console.error("Erro: Sintetizador não encontrado ou texto vazio.");
      return;
    }

    // Cancela qualquer fala que esteja rolando antes de começar a nova
    synthRef.current.cancel();

    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.9; // Velocidade um pouco mais lenta para alfabetização

    // 2. Tenta forçar a escolha de uma voz brasileira
    const voices = synthRef.current.getVoices();
    const brVoice = voices.find(v => v.lang.includes('pt-BR'));
    if (brVoice) utter.voice = brVoice;

    synthRef.current.speak(utter);
  }

  function stop() {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  }

  return { speak, stop };
}