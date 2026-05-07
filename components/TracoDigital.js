import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useVoiceGuidance from '../hooks/useVoiceGuidance';

const letras = ['A', 'B', 'C', 'D', 'E'];

export default function TracoDigital() {
  const canvasRef = useRef(null);
  const [desenhando, setDesenhando] = useState(false);
  const [pontos, setPontos] = useState([]);
  const [letraAtual, setLetraAtual] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const { speak, stop } = useVoiceGuidance();


const falar = (texto) => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  }
};

  function startDesenho(e) {
    setDesenhando(true);
    setPontos([[getPos(e)]]);
  }

  function desenhar(e) {
    if (!desenhando) return;
    setPontos((prev) => {
      const novo = [...prev];
      novo[novo.length - 1] = [...novo[novo.length - 1], getPos(e)];
      return novo;
    });
  }

  function endDesenho() {
    setDesenhando(false);
    if (pontos.flat().length > 20) {
      setFeedback('Ótimo traço!');
      speak('Ótimo traço!');
    } else {
      setFeedback('Tente traçar novamente.');
      speak('Tente traçar novamente.');
    }
  }

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return [clientX - rect.left, clientY - rect.top];
  }

  function limpar() {
    setPontos([]);
    setFeedback(null);
  }

  function proximaLetra() {
    setLetraAtual((prev) => (prev + 1) % letras.length);
    setPontos([]);
    setFeedback(null);
  }

  return (
    <div className="w-full max-w-md bg-gray-50 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200 items-center" role="region" aria-label="Prática de Traço Digital">
      <h2 className="text-xl font-bold text-gray-700 mb-2" tabIndex={0} 
        onMouseEnter={() => falar('Prática de Traço Digital')}
      >Prática de Traço Digital</h2>
      <p className="text-base text-gray-600 mb-2 font-medium" tabIndex={0} 
        onMouseEnter={() => falar('Copie a letra abaixo:')}
      >Copie a letra abaixo:</p>
      <motion.div
        className="text-7xl font-bold text-pastelOrange select-none mb-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        onMouseEnter={() => speak(`Letra ${letras[letraAtual]}`)}
        onFocus={() => speak(`Letra ${letras[letraAtual]}`)}
        tabIndex={0}
        aria-label={`Letra ${letras[letraAtual]}`}
      >
        {letras[letraAtual]}
      </motion.div>
      <div className="relative w-full flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border-2 border-pastelOrange rounded bg-white touch-none cursor-crosshair"
          onMouseDown={startDesenho}
          onMouseMove={desenhar}
          onMouseUp={endDesenho}
          onMouseLeave={endDesenho}
          onTouchStart={startDesenho}
          onTouchMove={desenhar}
          onTouchEnd={endDesenho}
          tabIndex={0}
          aria-label="Área de desenho da letra"
        />
        {/* Desenhar os traços sobre o canvas usando SVG para animação */}
        <svg className="absolute top-0 left-0 pointer-events-none" width={300} height={300} style={{zIndex:1}} aria-hidden="true">
          {pontos.map((linha, i) => (
            <motion.polyline
              key={i}
              points={linha.map(([x, y]) => `${x},${y}`).join(' ')}
              fill="none"
              stroke="#FFB877"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </svg>
      </div>
      <div className="flex gap-2 mt-2">
        <button className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" onClick={limpar} tabIndex={0} aria-label="Limpar desenho">Limpar</button>
        <button className="px-4 py-2 rounded bg-pastelOrange text-white font-medium hover:bg-pastelOrange-dark" onClick={proximaLetra} tabIndex={0} aria-label="Próxima letra">Próxima Letra</button>
      </div>
      {feedback && (
        <motion.div
          className={`mt-4 text-lg font-bold ${feedback === 'Ótimo traço!' ? 'text-green-600' : 'text-red-600'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          tabIndex={0}
        >
          {feedback}
        </motion.div>
      )}
    </div>
  );
}
