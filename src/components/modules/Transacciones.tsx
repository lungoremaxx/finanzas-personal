import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, ArrowUpRight, ArrowDownRight, X } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { TransactionType, Scope, Currency } from '@/types'

const MOCK_TXS = [
  { id: '1', desc: 'Comisión venta Valle Escondido', cat: 'RE/MAX', monto: 850000, fecha: '2026-05-05', tipo: 'ingreso' as TransactionType, scope: 'laboral' as Scope, cur: 'ARS' as Currency, cuenta: 'Galicia' },
  { id: '2', desc: 'Supermercado Disco', cat: 'Alimentos', monto: 12500, fecha: '2026-05-06', tipo: 'egreso' as TransactionType, scope: 'personal' as Scope, cur: 'ARS' as Currency, cuenta: 'MP' },
  { id: '3', desc: 'YPF combustible', cat: 'Transporte', monto: 28000, fecha: '2026-05-04', tipo: 'egreso' as TransactionType, scope: 'mixto' as Scope, cur: 'ARS' as Currency, cuenta: 'Galicia' },
  { id: '4', desc: 'Payoneer recibo cliente', cat: 'Ingresos', monto: 320, fecha: '2026-05-02', tipo: 'ingreso' as TransactionType, scope: 'laboral' as Scope, cur: 'USD' as Currency, cuenta: 'Payoneer' },
  { id: '5', desc: 'Expensas departamento', cat: 'Vivienda', monto: 45000, fecha: '2026-05-03', tipo: 'egreso' as TransactionType, scope: 'personal' as Scope, cur: 'ARS' as Currency, cuenta: 'Galicia' },
  { id: '6', desc: 'Netflix', cat: 'Servicios', monto: 8500, fecha: '2026-05-01', tipo: 'egreso' as TransactionType, scope: 'personal' as Scope, cur: 'ARS' as Currency, cuenta: 'Galicia' },
  { id: '7', desc: 'Almuerzo cliente', cat: 'Representación', monto: 18000, fecha: '2026-05-06', tipo: 'egreso' as TransactionType, scope: 'laboral' as Scope, cur: 'ARS' as Currency, cuenta: 'MP' },
]

const SCOPE_COLORS: Record<Scope, string> = { personal: '#3b82f6', laboral: '#f59e0b', mixto: '#8b5cf6' }
const SCOPE_LABELS: Record<Scope, string> = { personal: 'Personal', laboral: 'Laboral', mixto: 'Mixto' }

export function Transacciones() {
  const [search, setSearch] = useState('')
  const [filterScope, setFilterScope] = useState<Scope | 'all'>('all')
  const [showForm, setShowForm] = useState(false)

  const filtered = MOCK_TXS.filter(tx => {
    const matchSearch = tx.desc.toLowerCase().includes(search.toLowerCase()) || tx.cat.toLowerCase().includes(search.toLowerCase())
    const matchScope = filterScope === 'all' || tx.scope === filterScope
    return matchSearch && matchScope
  })

  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl" style={{ color: 'var(--text)', fontWeight: 800 }}>Movimientos</h2>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>{filtered.length} transacciones</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
          style={{ background: 'var(--green)', color: '#000', fontWeight: 700 }}>
          <Plus size={14} /> Nueva
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
        </div>
        <div className="flex gap-1 glass rounded-xl p-1">
          {(['all', 'personal', 'laboral', 'mixto'] as const).map(s => (
            <button key={s} onClick={() => setFilterScope(s)}
              className="px-3 py-1.5 rounded-lg text-[10px] transition-all"
              style={{ fontWeight: 700, textTransform: 'uppercase',
                background: filterScope === s ? 'var(--surface2)' : 'transparent',
                color: filterScope === s ? 'var(--text)' : 'var(--text-muted)',
                border: filterScope === s ? '1px solid var(--border2)' : '1px solid transparent' }}>
              {s === 'all' ? 'Todo' : SCOPE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <AnimatePresence>
          {filtered.map((tx, i) => (
            <motion.div key={tx.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }} transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 px-5 py-3.5 cursor-pointer"
              style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: tx.tipo === 'ingreso' ? 'var(--green-dim)' : 'var(--red-dim)' }}>
                {tx.tipo === 'ingreso'
                  ? <ArrowUpRight size={15} style={{ color: 'var(--green)' }} />
                  : <ArrowDownRight size={15} style={{ color: 'var(--red)' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm truncate" style={{ color: 'var(--text)', fontWeight: 600 }}>{tx.desc}</p>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: 6,
                    background: `${SCOPE_COLORS[tx.scope]}22`, color: SCOPE_COLORS[tx.scope] }}>
                    {SCOPE_LABELS[tx.scope]}
                  </span>
                </div>
                <p style={{ fontSize: 10, marginTop: 2, color: 'var(--text-muted)' }}>
                  {tx.cat} · {tx.cuenta} · {formatDate(tx.fecha)}
                </p>
              </div>
              <span className="mono shrink-0 text-sm" style={{ color: tx.tipo === 'ingreso' ? 'var(--green)' : 'var(--red)', fontWeight: 800 }}>
                {tx.tipo === 'ingreso' ? '+' : '-'}{formatCurrency(tx.monto, tx.cur)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="py-12 text-center" style={{ color: 'var(--text-muted)' }}>
            <p className="text-sm" style={{ fontWeight: 600 }}>Sin resultados</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base" style={{ color: 'var(--text)', fontWeight: 800 }}>Nueva transacción</h3>
                <button onClick={() => setShowForm(false)} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
              </div>
              <div className="flex gap-2 mb-4">
                {(['ingreso', 'egreso'] as const).map(t => (
                  <button key={t} className="flex-1 py-2.5 rounded-xl text-xs transition-all"
                    style={{ fontWeight: 700, textTransform: 'uppercase',
                      background: t === 'ingreso' ? 'var(--green-dim)' : 'var(--red-dim)',
                      color: t === 'ingreso' ? 'var(--green)' : 'var(--red)',
                      border: `1px solid ${t === 'ingreso' ? 'var(--green)' : 'var(--red)'}` }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <input placeholder="Descripción" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                <div className="flex gap-2">
                  <input placeholder="Monto" type="number" className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  <select className="px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    <option>ARS</option><option>USD</option>
                  </select>
                </div>
                <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                  <option value="">Categoría</option>
                  <option>Alimentos</option><option>Transporte</option><option>Vivienda</option>
                  <option>Servicios</option><option>RE/MAX</option>
                </select>
                <div className="flex gap-2">
                  <select className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    <option>Galicia</option><option>Mercado Pago</option>
                    <option>Payoneer</option><option>Belo</option><option>Efectivo</option>
                  </select>
                  <select className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    <option>Personal</option><option>Laboral</option><option>Mixto</option>
                  </select>
                </div>
                <input type="date" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
              </div>
              <button className="w-full mt-5 py-3 rounded-xl text-sm transition-all"
                style={{ background: 'var(--green)', color: '#000', fontWeight: 700 }}>
                Guardar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
