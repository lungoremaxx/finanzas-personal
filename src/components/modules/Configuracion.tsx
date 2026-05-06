import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'

export function Configuracion() {
  const [equilibrioARS, setEquilibrioARS] = useState(1200000)
  const [equilibrioUSD, setEquilibrioUSD] = useState(500)
  const [cotizacion, setCotizacion] = useState(1050)
  const [monedaPpal, setMonedaPpal] = useState<'ARS' | 'USD'>('ARS')

  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-xl" style={{ color: 'var(--text)', fontWeight: 800 }}>Configuración</h2>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>Perfil</p>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: 'var(--green-dim)', border: '1px solid var(--green)' }}>🏡</div>
          <div>
            <p className="text-base" style={{ color: 'var(--text)', fontWeight: 800 }}>Martín Trejo</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Agente Inmobiliario · Córdoba, Argentina</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass rounded-2xl p-5">
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>Punto de equilibrio mensual</p>
        <p style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 16 }}>El mínimo que necesitás ganar para cubrir tus costos fijos</p>
        <div className="space-y-3">
          <div>
            <label style={{ fontSize: 10, display: 'block', marginBottom: 4, color: 'var(--text-muted)', fontWeight: 700 }}>En pesos (ARS)</label>
            <input type="number" value={equilibrioARS} onChange={e => setEquilibrioARS(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mono"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            <p style={{ fontSize: 10, color: 'var(--green)', marginTop: 4 }}>= {formatCurrency(equilibrioARS, 'ARS')}</p>
          </div>
          <div>
            <label style={{ fontSize: 10, display: 'block', marginBottom: 4, color: 'var(--text-muted)', fontWeight: 700 }}>En dólares (USD)</label>
            <input type="number" value={equilibrioUSD} onChange={e => setEquilibrioUSD(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mono"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            <p style={{ fontSize: 10, color: 'var(--green)', marginTop: 4 }}>= {formatCurrency(equilibrioUSD, 'USD')}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5">
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>Monedas</p>
        <div className="space-y-4">
          <div>
            <label style={{ fontSize: 10, display: 'block', marginBottom: 8, color: 'var(--text-muted)', fontWeight: 700 }}>Moneda principal del dashboard</label>
            <div className="flex gap-2">
              {(['ARS', 'USD'] as const).map(m => (
                <button key={m} onClick={() => setMonedaPpal(m)} className="flex-1 py-2.5 rounded-xl text-sm transition-all"
                  style={{ fontWeight: 700, background: monedaPpal === m ? 'var(--green-dim)' : 'var(--surface2)',
                    color: monedaPpal === m ? 'var(--green)' : 'var(--text-muted)',
                    border: `1px solid ${monedaPpal === m ? 'var(--green)' : 'transparent'}` }}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 10, display: 'block', marginBottom: 4, color: 'var(--text-muted)', fontWeight: 700 }}>Cotización USD / ARS (manual)</label>
            <input type="number" value={cotizacion} onChange={e => setCotizacion(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none mono"
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            <p style={{ fontSize: 10, color: 'var(--text-soft)', marginTop: 4 }}>1 USD = {formatCurrency(cotizacion, 'ARS')}</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-5">
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>Cuentas conectadas</p>
        <div className="space-y-2">
          {[
            { nombre: 'Banco Galicia', color: '#0066cc', emoji: '🏦', estado: 'Activa' },
            { nombre: 'Mercado Pago', color: '#00bcd4', emoji: '📱', estado: 'Activa' },
            { nombre: 'Payoneer', color: '#ff4d4d', emoji: '💸', estado: 'Activa' },
            { nombre: 'Belo', color: '#8b5cf6', emoji: '⚡', estado: 'Activa' },
            { nombre: 'Efectivo', color: '#00c896', emoji: '💵', estado: 'Manual' },
          ].map((c, i) => (
            <div key={c.nombre} className="flex items-center gap-3 py-2.5"
              style={{ borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: `${c.color}22` }}>{c.emoji}</div>
              <span className="flex-1 text-sm" style={{ color: 'var(--text)', fontWeight: 600 }}>{c.nombre}</span>
              <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: 'var(--green-dim)', color: 'var(--green)', fontWeight: 700 }}>{c.estado}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="w-full py-3 rounded-xl text-sm transition-all"
        style={{ background: 'var(--green)', color: '#000', fontWeight: 700 }}>
        Guardar cambios
      </motion.button>
    </div>
  )
}
