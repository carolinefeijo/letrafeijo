import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function Layout({ children }) {
  
  // Esta função "acorda" o sintetizador de voz
  useEffect(() => {
    const ativarVoz = () => {
      window.speechSynthesis.cancel();
      const despertar = new SpeechSynthesisUtterance(""); 
      window.speechSynthesis.speak(despertar);
      console.log("Áudio liberado pelo clique");
      // Remove o evento após o primeiro clique para não pesar
      window.removeEventListener('click', ativarVoz);
    };

    window.addEventListener('click', ativarVoz);
    return () => window.removeEventListener('click', ativarVoz);
  }, []);

  const falar = (texto) => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(texto);
      msg.lang = 'pt-BR';
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-quicksand">
      <header className="relative z-50 w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-gray-100 shadow-sm">
        <span 
          className="text-2xl font-bold text-pastelOrange cursor-pointer select-none"
          onMouseEnter={() => falar("Letra Feijó")}
          tabIndex={0}
        >
          Letra Feijó
        </span>
        <nav className="flex gap-6">
          {['Início', 'Simulador', 'Traço Digital', 'Progresso'].map((item) => (
            <Link 
              key={item}
href={item === 'Início' ? '/' : `/${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')}`}              className="text-gray-700 hover:text-pastelOrange font-medium transition-colors"
              onMouseEnter={() => falar(item)}
            >
              {item}
            </Link>
          ))}
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key="main-content"
          className="flex-1 flex flex-col items-center justify-center px-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}