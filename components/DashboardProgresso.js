import { useState } from 'react';
import { motion } from 'framer-motion';
import useVoiceGuidance from '../hooks/useVoiceGuidance';

const conquistasExemplo = [
  {
    titulo: 'Leitura de Boleto',
    descricao: 'Você já consegue identificar a data de vencimento em um boleto bancário!',
    concluido: true,
  },
  {
    titulo: 'Identificação de Destino',
    descricao: 'Você já consegue encontrar o destino no visor de ônibus!',
    concluido: true,
  },
  {
    titulo: 'Palavra-chave em Mensagem',
    descricao: 'Você já consegue localizar palavras importantes em conversas!',
    concluido: true,
  },
  {
    titulo: 'Traço Digital',
    descricao: 'Você já consegue desenhar letras digitalmente!',
    concluido: true,
  },
  {
    titulo: 'Etiqueta de Supermercado',
    descricao: 'Você já consegue ler etiquetas de supermercado!',
    concluido: false,
  },
];

export default function DashboardProgresso() {
  const { speak, stop } = useVoiceGuidance();
  const [conquistas] = useState(conquistasExemplo);

  return (
    <div className="w-full max-w-lg bg-gray-50 rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200" role="region" aria-label="Dashboard de Progresso">
      <h2 className="text-xl font-bold text-gray-700 mb-2" tabIndex={0}>Seu Progresso</h2>
      <ul className="flex flex-col gap-3" role="list">
        {conquistas.map((c, i) => (
          <motion.li
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${c.concluido ? 'bg-pastelOrange/10 border-l-4 border-pastelOrange' : 'bg-white border-l-4 border-gray-200'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onMouseEnter={() => speak(c.titulo)}
            onFocus={() => speak(c.titulo)}
            onMouseLeave={stop}
            onBlur={stop}
            tabIndex={0}
            aria-label={c.titulo + (c.concluido ? ' concluído' : ' em progresso')}
          >
            <span className={`text-2xl ${c.concluido ? 'text-green-500' : 'text-gray-400'}`}>{c.concluido ? '✔️' : '⬜️'}</span>
            <div>
              <div className="font-bold text-gray-800">{c.titulo}</div>
              <div className="text-sm text-gray-600">{c.descricao}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
