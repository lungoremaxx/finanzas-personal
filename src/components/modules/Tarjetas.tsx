import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'

const MOCK_TARJETAS = [
  { nombre: 'Galicia Visa', limite: 800000, usado: 320000, vence: '15 may', color: '#0066cc' },
  { nombre: 'MP Mastercard', limite: 400000, usado: 95000, vence: '22 may', color: '#00bcd4' },
]

export function Tarjetas() {
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-xl" style={{ color: 'var(--text)', fontWeight: 800 }}>Tarjetas</h2>
      {MOCK_TARJETAS.map((t, i) => {
        const pct = Math.round((t.usado / t.limite) * 100)
        return (
          <motion.div key={t.nombre} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="w-8 h-8 rounded-xl mb-2 flex items-center justify-center text-base" style={{ background: `${t.color}22` }}>💳</div>
                <p className="text-sm" style={{ color: 'var(--text)', fontWeight: 700 }}>{t.nombre}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Vence {t.vence}</p>
              </div>
              <div className="text-right">
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Disponible</p>
                <p className="text-lg mono" style={{ color: 'var(--green)', fontWeight: 800 }}>{formatCurrency(t.limite - t.usado, 'ARS')}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                <span>Usado: {formatCurrency(t.usado, 'ARS')}</span>
                <span>{pct}% del límite</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'var(--surface2)' }}>
                <motion.div className="h-full rounded-full" style={{ background: t.color }}
                  initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }} />
              </div>
              <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>Límite total: {formatCurrency(t.limite, 'ARS')}</p>
            </div>
          </motion.div>
        )
      })}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-5">
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>Próximos vencimientos</p>
        <div className="space-y-2">
          {[{ nombre: 'Galicia Visa', fecha: '15 may', monto: 320000 }, { nombre: 'MP Mastercard', fecha: '22 may', monto: 95000 }].map(v => (
            <div key={v.nombre} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--text)', fontWeight: 600 }}>{v.nombre}</p>
              <div className="text-right">
                <p className="mono" style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700 }}>{formatCurrency(v.monto, 'ARS')}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{v.fecha}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
