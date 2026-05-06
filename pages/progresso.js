import Layout from '../components/Layout';
import DashboardProgresso from '../components/DashboardProgresso';
import Head from 'next/head';

export default function ProgressoPage() {
  return (
    <Layout>
      <Head>
        <title>Progresso | Letra Feijó</title>
      </Head>
      <div className="w-full flex flex-col items-center justify-center gap-8 max-w-2xl">
        <DashboardProgresso />
      </div>
    </Layout>
  );
}
