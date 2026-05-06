import { useState } from 'react';
import useVoiceGuidance from '../hooks/useVoiceGuidance';

const chatData = [
  { sender: 'Maria', text: 'Oi! Você pode comprar pão?' },
  { sender: 'Você', text: 'Posso sim!' },
  { sender: 'Maria', text: 'Obrigado! Pegue o troco na gaveta.' },
  { sender: 'Você', text: 'Ok, vou pegar.' },
];

const pergunta = 'Onde está a palavra troco?';

export default function WhatsAppSimulador() {
  const { speak, stop } = useVoiceGuidance();
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function handleWordClick(word, idx) {
    setSelected(idx);
    if (word.toLowerCase() === 'troco') {
      setFeedback('Correto!');
      speak('Correto!');
    } else {
      setFeedback('Tente novamente.');
      speak('Tente novamente.');
    }
  }

  return (
    <div className="w-full max-w-md bg-gray-50 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200" role="region" aria-label="Simulador de Chat WhatsApp">
      <h2 className="text-xl font-bold text-gray-700 mb-2" tabIndex={0}>Simulador de Chat WhatsApp</h2>
      <p className="text-base text-gray-600 mb-4 font-medium" tabIndex={0}>{pergunta}</p>
      <div className="flex flex-col gap-2">
        {chatData.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'Você' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 mb-1 max-w-xs ${msg.sender === 'Você' ? 'bg-pastelOrange text-white' : 'bg-gray-200 text-gray-800'}`}>
              <span className="block text-xs font-semibold mb-1">{msg.sender}</span>
              {msg.text.split(' ').map((word, idx) => (
                <button
                  key={idx}
                  className={`inline-block mx-0.5 px-1 rounded focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark ${selected === `${i}-${idx}` ? 'ring-2 ring-pastelOrange' : ''}`}
                  onClick={() => handleWordClick(word.replace(/[^\wÀ-ÿ]/g, ''), `${i}-${idx}`)}
                  onMouseEnter={() => speak(word.replace(/[^\wÀ-ÿ]/g, ''))}
                  onFocus={() => speak(word.replace(/[^\wÀ-ÿ]/g, ''))}
                  onMouseLeave={stop}
                  onBlur={stop}
                  tabIndex={0}
                  aria-label={word.replace(/[^\wÀ-ÿ]/g, '')}
                >
                  {word + ' '}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {feedback && (
        <div className={`mt-4 text-lg font-bold ${feedback === 'Correto!' ? 'text-green-600' : 'text-red-600'}`} tabIndex={0}>{feedback}</div>
      )}
    </div>
  );
}
