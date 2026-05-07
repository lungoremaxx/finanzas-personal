import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutDashboard, Layers, FileUp, Tag, CreditCard, Settings, Plus, Bell } from 'lucide-react'
import { Dashboard } from './components/modules/Dashboard'
import { Transacciones } from './components/modules/Transacciones'
import { Importar } from './components/modules/Importar'
import { Categorias } from './components/modules/Categorias'
import { Tarjetas } from './components/modules/Tarjetas'
import { Configuracion } from './components/modules/Configuracion'
import { QuickAdd } from './components/modules/QuickAdd'

const NAV = [
  { id: 'dashboard',     label: 'Inicio',      icon: LayoutDashboard },
  { id: 'transacciones', label: 'Movimientos',  icon: Layers },
  { id: 'tarjetas',      label: 'Tarjetas',     icon: CreditCard },
  { id: 'importar',      label: 'Importar',     icon: FileUp },
  { id: 'categorias',    label: 'Categorias',   icon: Tag },
]

const MODULES: Record<string, React.ComponentType<any>> = {
  dashboard: Dashboard, transacciones: Transacciones, importar: Importar,
  categorias: Categorias, tarjetas: Tarjetas, configuracion: Configuracion,
}

export default function App() {
  const [active, setActive] = useState('dashboard')
  const [quickAdd, setQuickAdd] = useState(false)
  const Module = MODULES[active] || Dashboard

  return (
    <div className="min-h-screen bg-black pb-32">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: 0, background: 'radial-gradient(circle at 70% 20%, rgba(124,58,237,0.12) 0%, transparent 60%)' }} />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] pointer-events-none" style={{ zIndex: 0, background: 'radial-gradient(circle at 30% 80%, rgba(236,72,153,0.07) 0%, transparent 60%)' }} />

      <header className="px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--slate-500)' }}>Finanzas Personales</span>
          <div className="flex items-center gap-4 mt-1">
            <h1 style={{ fontSize: 38, fontWeight: 300, color: 'white', lineHeight: 1 }}>Hola, <span style={{ fontWeight: 500 }}>Martin</span></h1>
            <button className="relative" style={{ padding: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12 }}>
              <Bell size={16} style={{ color: 'rgba(255,255,255,0.5)', display: 'block' }} />
              <span className="absolute" style={{ top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: 'var(--pink)', border: '1px solid black' }} />
            </button>
          </div>
        </div>
        <div className="flex p-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          {['Personal', 'Laboral'].map((s, i) => (
            <button key={s} style={{ padding: '8px 24px', borderRadius: '999px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Montserrat', cursor: 'pointer', border: 'none', transition: 'all 0.2s',
              background: i === 0 ? 'var(--violet)' : 'transparent', color: i === 0 ? 'white' : 'var(--slate-500)',
              boxShadow: i === 0 ? '0 0 15px rgba(124,58,237,0.4)' : 'none' }}>{s}</button>
          ))}
        </div>
        <div className="text-right">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--slate-500)' }}>Saldo Total</div>
          <div className="mono" style={{ fontSize: 28, color: 'var(--emerald)', fontFamily: 'Montserrat', fontWeight: 300 }}>$1.450.000</div>
          <div className="mono" style={{ fontSize: 13, color: 'var(--slate-500)', fontWeight: 500 }}>+ $820.00 USD</div>
        </div>
      </header>

      <main className="relative" style={{ zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
            <Module />
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed left-1/2 z-50 flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ bottom: 24, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
        {NAV.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button key={item.id} onClick={() => setActive(item.id)}
              className="flex items-center gap-2 rounded-full relative overflow-hidden"
              style={{ padding: '10px 20px', color: isActive ? 'white' : 'var(--slate-400)', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: 'Montserrat' }}>
              {isActive && (
                <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--violet)', boxShadow: '0 0 15px rgba(124,58,237,0.5)' }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
              )}
              <Icon size={15} style={{ position: 'relative', zIndex: 10, flexShrink: 0 }} />
              {isActive && <span style={{ position: 'relative', zIndex: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item.label}</span>}
            </button>
          )
        })}
        <button onClick={() => setActive('configuracion')} style={{ padding: '10px 12px', borderRadius: '999px', color: active === 'configuracion' ? 'white' : 'var(--slate-400)', cursor: 'pointer', border: 'none', background: 'transparent' }}>
          <Settings size={15} />
        </button>
      </nav>

      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setQuickAdd(true)}
        className="fixed z-50 flex items-center justify-center rounded-full"
        style={{ bottom: 24, right: 24, width: 56, height: 56, background: 'linear-gradient(135deg, var(--violet), var(--pink))', boxShadow: '0 0 20px rgba(139,92,246,0.5)', border: 'none', cursor: 'pointer' }}>
        <Plus size={24} color="white" />
      </motion.button>

      <AnimatePresence>{quickAdd && <QuickAdd onClose={() => setQuickAdd(false)} />}</AnimatePresence>

      <footer className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center relative" style={{ zIndex: 10 }}>
        <div className="flex gap-6" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--slate-600)' }}>
          <span>Sincronizado: Justo ahora</span>
          <span style={{ color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)', display: 'inline-block' }} />Conectado a Galicia
          </span>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--slate-600)' }}>v2.0</div>
      </footer>
    </div>
  )
}
