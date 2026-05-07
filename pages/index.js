import WideButton from '../components/WideButton';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function Home() {
  const falar = (texto) => {
   if (window.speechSynthesis) {
    window.speechSynthesis.cancel(); // Isso "limpa" o gargalo
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  }
  };

  return (
    <Layout>
      <Head>
        <title>Letra Feijó - Alfabetização</title>
      </Head>
      
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        <h1 className="text-5xl font-bold text-pastelOrange mb-4 text-center" 
         onMouseEnter={() => falar("Bem vindo")}
          tabIndex={0}
        >
          Bem-vindo!
        </h1>
        
        <WideButton voiceText="Começar exercício" onClick={() => console.log('Iniciando...')}>
          Começar exercício
        </WideButton>
        
        <WideButton voiceText="Ver progresso" onClick={() => console.log('Indo para progresso...')}>
          Ver progresso
        </WideButton>

        <p className="text-gray-500 text-sm mt-4 italic" 
         onMouseEnter={() => falar("Passe o mouse nos botões para ouvir")}
          tabIndex={0}
        >
          Passe o mouse nos botões para ouvir
        </p>
      </div>
    </Layout>
  );
}