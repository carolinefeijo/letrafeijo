import { useState } from 'react';
import useVoiceGuidance from '../hooks/useVoiceGuidance';

const visorData = {
  linha: '870 - Terminal Central',
  destino: 'Vila Esperança',
  horario: '14:35',
  numero: 'B1234',
};

const campos = [
  { label: 'Número do Ônibus', value: visorData.numero, key: 'numero' },
  { label: 'Linha', value: visorData.linha, key: 'linha' },
  { label: 'Destino', value: visorData.destino, key: 'destino' },
  { label: 'Horário', value: visorData.horario, key: 'horario' },
];

const falar = (texto) => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  }
};

export default function OnibusSimulador() {
  const { speak, stop } = useVoiceGuidance();
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const pergunta = 'Onde está o destino do ônibus?';

  function handleCampoClick(key) {
    setSelected(key);
    if (key === 'destino') {
      setFeedback('Correto!');
      speak('Correto!');
    } else {
      setFeedback('Tente novamente.');
      speak('Tente novamente.');
    }
  }

  return (
    <div className="w-full max-w-md bg-gray-50 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200" role="region" aria-label="Simulador de Visor de Ônibus">
      <h2 className="text-xl font-bold text-gray-700 mb-2" tabIndex={0} 
        onMouseEnter={() => falar('Simulador de Visor de Ônibus')}
      >Simulador de Visor de Ônibus</h2>
      <p className="text-base text-gray-600 mb-4 font-medium" tabIndex={0} 
        onMouseEnter={() => falar(pergunta)}
      >{pergunta}</p>
      <div className="flex flex-col gap-2">
        {campos.map((campo) => (
          <button
            key={campo.key}
            className={`w-full text-left px-4 py-3 rounded border transition-colors font-medium text-gray-800 bg-white hover:bg-pastelOrange/20 focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark ${selected === campo.key ? 'ring-2 ring-pastelOrange' : ''}`}
            onClick={() => handleCampoClick(campo.key)}
            onMouseEnter={() => speak(campo.label)}
            onFocus={() => speak(campo.label)}
            onMouseLeave={stop}
            onBlur={stop}
            tabIndex={0}
            aria-label={campo.label}
          >
            <span className="block text-xs text-gray-500">{campo.label}</span>
            <span className="block text-lg">{campo.value}</span>
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`mt-4 text-lg font-bold ${feedback === 'Correto!' ? 'text-green-600' : 'text-red-600'}`} tabIndex={0}>{feedback}</div>
      )}
    </div>
  );
}
