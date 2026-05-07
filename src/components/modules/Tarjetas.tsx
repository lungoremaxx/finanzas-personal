import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'

const CARDS = [
  { nombre: 'Galicia Visa', limite: 800000, usado: 320000, vence: '15 may', color: '#0066cc', emoji: '💳' },
  { nombre: 'MP Mastercard', limite: 400000, usado: 95000, vence: '22 may', color: '#00bcd4', emoji: '📱' },
]

export function Tarjetas() {
  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>Credito</div>
        <h2 style={{ fontSize: 30, fontWeight: 300, color: 'white' }}>Mis <span style={{ fontWeight: 500, fontStyle: 'italic' }}>Tarjetas</span></h2>
      </div>
      {CARDS.map((c, i) => {
        const pct = Math.round((c.usado / c.limite) * 100)
        return (
          <motion.div key={c.nombre} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="glass" style={{ borderRadius: '2rem', padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${c.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 12 }}>{c.emoji}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{c.nombre}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)', marginTop: 2 }}>Vence {c.vence}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)', marginBottom: 4 }}>Disponible</div>
                  <div className="mono" style={{ fontSize: 28, fontWeight: 300, color: 'var(--emerald)' }}>{formatCurrency(c.limite - c.usado, 'ARS')}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, color: 'var(--slate-500)', fontWeight: 600 }}>
                <span>Usado: {formatCurrency(c.usado, 'ARS')}</span><span>{pct}% del limite</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  style={{ height: '100%', borderRadius: 999, background: c.color, boxShadow: `0 0 8px ${c.color}60` }} />
              </div>
              <div style={{ fontSize: 10, color: 'var(--slate-600)', marginTop: 6, fontWeight: 600 }}>Limite: {formatCurrency(c.limite, 'ARS')}</div>
            </div>
          </motion.div>
        )
      })}
      <div className="glass" style={{ borderRadius: '2rem', padding: '1.5rem' }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 16 }}>Proximos Vencimientos</div>
        {CARDS.map((c, i) => (
          <div key={c.nombre} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, paddingBottom: 12, borderBottom: i < CARDS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{c.nombre}</div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--pink)' }}>{formatCurrency(c.usado, 'ARS')}</div>
              <div style={{ fontSize: 10, color: 'var(--slate-500)', fontWeight: 600 }}>{c.vence}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
