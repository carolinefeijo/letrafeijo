import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-gray-100" role="banner">
        <span className="text-2xl font-bold text-pastelOrange select-none" tabIndex={0} aria-label="Letra Feijó">Letra Feijó</span>
          <nav className="flex gap-4" aria-label="Navegação principal">
            <Link href="/" className="text-gray-700 hover:text-pastelOrange font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark" tabIndex={0}>Início</Link>
            <Link href="/simulador" className="text-gray-700 hover:text-pastelOrange font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark" tabIndex={0}>Simulador</Link>
            <Link href="/traco" className="text-gray-700 hover:text-pastelOrange font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark" tabIndex={0}>Traço Digital</Link>
            <Link href="/progresso" className="text-gray-700 hover:text-pastelOrange font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark" tabIndex={0}>Progresso</Link>
          </nav>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          className="flex-1 flex flex-col items-center justify-center px-4 outline-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          tabIndex={0}
          aria-live="polite"
        >
          dsds
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}