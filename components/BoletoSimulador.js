import { useState } from 'react';
import useVoiceGuidance from '../hooks/useVoiceGuidance';

const boletoData = {
  nome: 'João da Silva',
  valor: 'R$ 250,00',
  vencimento: '10/05/2026',
  codigo: '23790.12345 12345.678901 12345.678901 1 12340000025000',
};

const campos = [
  { label: 'Nome do Beneficiário', value: boletoData.nome, key: 'nome' },
  { label: 'Valor', value: boletoData.valor, key: 'valor' },
  { label: 'Data de Vencimento', value: boletoData.vencimento, key: 'vencimento' },
  { label: 'Código de Barras', value: boletoData.codigo, key: 'codigo' },
];

export default function BoletoSimulador() {
  const { speak, stop } = useVoiceGuidance();
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const pergunta = 'Onde está a data de vencimento?';

  function handleCampoClick(key) {
    setSelected(key);
    if (key === 'vencimento') {
      setFeedback('Correto!');
      speak('Correto!');
    } else {
      setFeedback('Tente novamente.');
      speak('Tente novamente.');
    }
  }

  return (
    <div className="w-full max-w-lg bg-gray-50 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200" role="region" aria-label="Simulador de Boleto Bancário">
      <h2 className="text-xl font-bold text-gray-700 mb-2" tabIndex={0}>Simulador de Boleto Bancário</h2>
      <p className="text-base text-gray-600 mb-4 font-medium" tabIndex={0}>{pergunta}</p>
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
