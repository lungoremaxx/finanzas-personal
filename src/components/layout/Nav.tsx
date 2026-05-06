import { motion } from 'framer-motion'
import {
  LayoutDashboard, ArrowLeftRight, Upload,
  BarChart3, CreditCard, Tag, Settings
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard',      label: 'Inicio',        icon: LayoutDashboard },
  { id: 'transacciones',  label: 'Movimientos',   icon: ArrowLeftRight },
  { id: 'importar',       label: 'Importar',      icon: Upload },
  { id: 'analisis',       label: 'Análisis',      icon: BarChart3 },
  { id: 'tarjetas',       label: 'Tarjetas',      icon: CreditCard },
  { id: 'categorias',     label: 'Categorías',    icon: Tag },
  { id: 'configuracion',  label: 'Config',        icon: Settings },
]

interface NavProps {
  active: string
  onChange: (id: string) => void
}

export function Nav({ active, onChange }: NavProps) {
  return (
    <>
      <nav className="hidden md:flex flex-col gap-1 w-56 shrink-0 py-6 px-3">
        <div className="px-3 mb-6">
          <div className="text-xs" style={{ color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Finanzas
          </div>
          <div className="text-lg mt-0.5" style={{ color: 'var(--text)', fontWeight: 800 }}>
            Martín Trejo
          </div>
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all duration-200"
              style={{
                fontWeight: 600,
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border2)' }}
                  transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                />
              )}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                  style={{ background: 'var(--green)' }}
                />
              )}
              <Icon size={16} className="relative z-10 shrink-0" style={{ color: isActive ? 'var(--green)' : undefined }} />
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong px-2 py-2 flex items-center justify-around"
        style={{ borderTop: '1px solid var(--border2)', borderRadius: '20px 20px 0 0' }}>
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
              style={{ color: isActive ? 'var(--green)' : 'var(--text-muted)' }}
            >
              <Icon size={20} />
              <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
