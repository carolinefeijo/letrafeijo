import WideButton from '../components/WideButton';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Letra Feijó</title>
        <meta name="description" content="Alfabetização funcional para adultos" />
      </Head>
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-pastelOrange mb-8">Letra Feijó</h1>
        <WideButton voiceText="Começar exercício">Começar exercício</WideButton>
        <WideButton voiceText="Ver progresso">Ver progressdsdso</WideButton>
      </div>
    </Layout>
  );
}
