
import Layout from '../components/Layout';
import BoletoSimulador from '../components/BoletoSimulador';
import OnibusSimulador from '../components/OnibusSimulador';
import WhatsAppSimulador from '../components/WhatsAppSimulador';
import Head from 'next/head';

export default function SimuladorPage() {
  return (
    <Layout>
      <Head>
        <title>Simulador de Boleto | Letra Feijó</title>
      </Head>
      <div className="w-full flex flex-col items-center justify-center gap-8 max-w-2xl">
        <BoletoSimulador />
        <OnibusSimulador />
        <WhatsAppSimulador />
      </div>
    </Layout>
  );
}
