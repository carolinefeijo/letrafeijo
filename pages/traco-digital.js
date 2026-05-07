import Layout from '../components/Layout';
import TracoDigital from '../components/TracoDigital';
import Head from 'next/head';

export default function TracoPage() {
  return (
    <Layout>
      <Head>
        <title>Prática de Traço Digital | Letra Feijó</title>
      </Head>
      <div className="w-full flex flex-col items-center justify-center gap-8 max-w-2xl">
        <TracoDigital />
      </div>
    </Layout>
  );
}
