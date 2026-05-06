import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { Dashboard } from '@/components/modules/Dashboard'
import { Transacciones } from '@/components/modules/Transacciones'
import { Importar } from '@/components/modules/Importar'
import { Analisis } from '@/components/modules/Analisis'
import { Tarjetas } from '@/components/modules/Tarjetas'
import { Categorias } from '@/components/modules/Categorias'
import { Configuracion } from '@/components/modules/Configuracion'

const MODULES: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  transacciones: Transacciones,
  importar: Importar,
  analisis: Analisis,
  tarjetas: Tarjetas,
  categorias: Categorias,
  configuracion: Configuracion,
}

export default function App() {
  const [active, setActive] = useState('dashboard')
  const Module = MODULES[active] || Dashboard

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00c896, transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', filter: 'blur(80px)' }} />
      </div>
      <div className="relative z-10 border-r" style={{ borderColor: 'var(--border)' }}>
        <Nav active={active} onChange={setActive} />
      </div>
      <main className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-5 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Module />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
