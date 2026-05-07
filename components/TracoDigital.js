import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PALAVRAS = [
  { termo: 'CASA', imagem: '🏠' },
  { termo: 'BOLA', imagem: '⚽' },
  { termo: 'DADO', imagem: '🎲' },
  { termo: 'GATO', imagem: '🐱' },
  { termo: 'SOL', imagem: '☀️' }
];

export default function TracoDigital() {
  const canvasRef = useRef(null);
  const hiddenCanvasRef = useRef(null);
  
  const [abaAtiva, setAbaAtiva] = useState('alfabeto');
  const [desenhando, setDesenhando] = useState(false);
  const [pontos, setPontos] = useState([]);
  const [posicaoAtual, setPosicaoAtual] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [feedback, setFeedback] = useState(null);
  
  const [concluidas, setConcluidas] = useState(0);
  const [itemResolvido, setItemResolvido] = useState(false);

  // Ajuste de tamanho: Alfabeto continua grande, Palavras agora são maiores que antes
  const tamanhoFonte = abaAtiva === 'alfabeto' ? '180px' : '85px';

  const itemAtual = abaAtiva === 'alfabeto' ? ALFABETO[indiceAtual] : PALAVRAS[indiceAtual].termo;
  const imagemAtual = abaAtiva === 'palavras' ? PALAVRAS[indiceAtual].imagem : null;

  const falar = (texto) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    falar(abaAtiva === 'alfabeto' ? `Desenhe a letra ${itemAtual}` : `Desenhe a palavra ${itemAtual}`);
    prepararGabarito();
  }, [indiceAtual, abaAtiva]);

  const prepararGabarito = () => {
    const canvas = hiddenCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.clearRect(0, 0, 300, 300);
    ctx.fillStyle = 'black';
    ctx.font = `bold ${tamanhoFonte} Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 35; // Margem de erro maior para palavras grandes
    ctx.lineJoin = 'round';
    ctx.strokeText(itemAtual, 150, 150);
    ctx.fillText(itemAtual, 150, 150);
  };

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return [clientX - rect.left, clientY - rect.top];
  }

  function startDesenho(e) {
    setDesenhando(true);
    const pos = getPos(e);
    setPosicaoAtual(pos);
    setPontos((prev) => [...prev, [pos]]);
  }

  function desenhar(e) {
    if (!desenhando) return;
    const pos = getPos(e);
    setPosicaoAtual(pos);
    setPontos((prev) => {
      const novo = [...prev];
      novo[novo.length - 1] = [...novo[novo.length - 1], pos];
      return novo;
    });
  }

  function validarAcerto() {
    const canvasH = hiddenCanvasRef.current;
    const ctxH = canvasH.getContext('2d', { willReadFrequently: true });
    const todosOsPontos = pontos.flat();
    
    if (todosOsPontos.length < 15) return false;

    let acertos = 0;
    todosOsPontos.forEach(([x, y]) => {
      const pixel = ctxH.getImageData(x, y, 1, 1).data;
      if (pixel[3] > 0) acertos++; 
    });

    const taxaAcerto = acertos / todosOsPontos.length;
    // Para palavras, somos um tiquinho mais flexíveis (75%) pois o traço é mais longo
    return taxaAcerto > (abaAtiva === 'alfabeto' ? 0.80 : 0.75);
  }

  function endDesenho() {
    if (!desenhando) return;
    setDesenhando(false);
    setPosicaoAtual(null);

    if (validarAcerto()) {
      setFeedback('Incrível!');
      if (!itemResolvido) {
        setConcluidas(prev => prev + 1);
        setItemResolvido(true);
        falar('Muito bem! Você conseguiu.');
      }
    } else {
      setFeedback('Siga o desenho!');
    }
  }

  function proximo() {
    const lista = abaAtiva === 'alfabeto' ? ALFABETO : PALAVRAS;
    setIndiceAtual((prev) => (prev + 1) % lista.length);
    setPontos([]);
    setFeedback(null);
    setItemResolvido(false);
  }

  function resetTudo(novaAba) {
    setAbaAtiva(novaAba);
    setIndiceAtual(0);
    setPontos([]);
    setFeedback(null);
    setItemResolvido(false);
  }

  return (
    <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-6 flex flex-col gap-4 border-b-[12px] border-gray-200 items-center mx-auto select-none font-sans">
      
      {/* Menu Superior */}
      <div className="flex gap-2 w-full p-1.5 bg-gray-100 rounded-2xl">
        <button 
          onClick={() => resetTudo('alfabeto')}
          onMouseEnter={() => falar('Alfabeto')}
          className={`flex-1 py-3 rounded-xl font-black transition-all ${abaAtiva === 'alfabeto' ? 'bg-white text-orange-400 shadow-md' : 'text-gray-400'}`}
        >
          ABC
        </button>
        <button 
          onClick={() => resetTudo('palavras')}
          onMouseEnter={() => falar('Palavras')}
          className={`flex-1 py-3 rounded-xl font-black transition-all ${abaAtiva === 'palavras' ? 'bg-white text-orange-400 shadow-md' : 'text-gray-400'}`}
        >
          PALAVRAS
        </button>
      </div>

      <div className="w-full flex justify-between items-center px-4">
        <h1 className="text-3xl font-black text-gray-800 tracking-tighter"
        onMouseEnter={()=> falar("Desenhe")}
        >DESENHE</h1>
        <div className="flex items-center gap-2 bg-yellow-400 text-white px-4 py-1.5 rounded-full shadow-lg" 
        
        onMouseEnter={() => falar(`${concluidas} itens concluídos`)}
        >
          <span className="text-lg font-black">{concluidas}</span>
          <span className="text-xs font-bold uppercase">🏆</span>
        </div>
      </div>

      {/* Area de Desenho */}
      <div className="relative flex flex-col items-center w-full">
        <div className="h-20 flex items-center justify-center mb-2">
          <AnimatePresence mode="wait">
            <motion.span 
              key={itemAtual}
              initial={{ scale: 0.5, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-7xl drop-shadow-sm"
            >
              {imagemAtual || '🖊️'}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative p-2 bg-orange-50 rounded-[45px] border-2 border-orange-100 shadow-inner">
          <div className="relative bg-white rounded-[38px] overflow-hidden" style={{ width: 300, height: 300 }}>
            
            {/* Guia Pontilhada Maior */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
              <svg width="300" height="300">
                <text 
                  x="150" y="150" textAnchor="middle" dominantBaseline="middle"
                  style={{ 
                    fontSize: tamanhoFonte,
                    fill: 'none', stroke: '#000', strokeWidth: '3',
                    strokeDasharray: '12,10', fontFamily: 'Arial Black'
                  }}
                >
                  {itemAtual}
                </text>
              </svg>
            </div>

            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="absolute inset-0 z-10 touch-none"
              onMouseDown={startDesenho} onMouseMove={desenhar} onMouseUp={endDesenho} onMouseLeave={endDesenho}
              onTouchStart={startDesenho} onTouchMove={desenhar} onTouchEnd={endDesenho}
            />
            
            <svg className="absolute inset-0 z-20 pointer-events-none" width={300} height={300}>
              {pontos.map((linha, i) => (
                <polyline key={i} points={linha.map(([x, y]) => `${x},${y}`).join(' ')} fill="none" stroke="#FFB877" strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
              ))}
              {posicaoAtual && <circle cx={posicaoAtual[0]} cy={posicaoAtual[1]} r="12" fill="#FFB877" />}
            </svg>
          </div>

          {itemResolvido && (
            <motion.div 
              initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-2 -right-2 bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-4 border-white z-30 text-2xl"
            >
              ⭐
            </motion.div>
          )}
        </div>
      </div>

      <div className="w-full flex gap-4 mt-2">
        <button 
          className="flex-1 py-4 rounded-3xl bg-gray-100 text-gray-400 font-black uppercase text-sm tracking-widest active:bg-gray-200 transition-colors" 
          onClick={() => { setPontos([]); setFeedback(null); setItemResolvido(false); }}
        >
          Limpar
        </button>
        <button 
          className="flex-1 py-4 rounded-3xl bg-orange-400 text-white font-black uppercase text-sm tracking-widest shadow-xl shadow-orange-100 active:scale-95 transition-transform" 
          onClick={proximo}
        >
          Próximo
        </button>
      </div>

      <div className="h-8">
        <AnimatePresence>
          {feedback && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className={`text-lg font-black uppercase ${itemResolvido ? 'text-green-500' : 'text-orange-300'}`}
            >
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <canvas ref={hiddenCanvasRef} width={300} height={300} style={{ display: 'none' }} />
    </div>
  );
}