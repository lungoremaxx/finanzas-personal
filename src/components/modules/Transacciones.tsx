import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const TXS = [
  { id: 1, desc: 'Comision venta Valle Escondido', cat: 'Laboral', monto: 850000, fecha: '2026-05-05', tipo: 'ingreso', scope: 'laboral', cur: 'ARS' },
  { id: 2, desc: 'Supermercado Disco', cat: 'Alimentos', monto: 12500, fecha: '2026-05-06', tipo: 'egreso', scope: 'personal', cur: 'ARS' },
  { id: 3, desc: 'YPF combustible', cat: 'Transporte', monto: 28000, fecha: '2026-05-04', tipo: 'egreso', scope: 'mixto', cur: 'ARS' },
  { id: 4, desc: 'Payoneer recibo cliente', cat: 'Laboral', monto: 320, fecha: '2026-05-02', tipo: 'ingreso', scope: 'laboral', cur: 'USD' },
  { id: 5, desc: 'Expensas departamento', cat: 'Vivienda', monto: 45000, fecha: '2026-05-03', tipo: 'egreso', scope: 'personal', cur: 'ARS' },
  { id: 6, desc: 'Netflix', cat: 'Servicios', monto: 8500, fecha: '2026-05-01', tipo: 'egreso', scope: 'personal', cur: 'ARS' },
  { id: 7, desc: 'Almuerzo con cliente', cat: 'Representacion', monto: 18000, fecha: '2026-05-06', tipo: 'egreso', scope: 'laboral', cur: 'ARS' },
]

const SC: Record<string, string> = { personal: '#60a5fa', laboral: '#fbbf24', mixto: '#a78bfa' }

export function Transacciones() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = TXS.filter(t =>
    (filter === 'all' || t.tipo === filter) &&
    (t.desc.toLowerCase().includes(search.toLowerCase()) || t.cat.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>Historial Contable</div>
            <h2 style={{ fontSize: 30, fontWeight: 300, color: 'white' }}>Todos los <span style={{ fontWeight: 500, fontStyle: 'italic' }}>Movimientos</span></h2>
          </div>
          <div style={{ display: 'flex', padding: 4, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {[['all','Todos'],['ingreso','Ingresos'],['egreso','Gastos']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)}
                style={{ padding: '8px 20px', borderRadius: 12, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat', cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                  background: filter === val ? 'white' : 'transparent', color: filter === val ? 'black' : 'var(--slate-500)',
                  boxShadow: filter === val ? '0 2px 8px rgba(255,255,255,0.1)' : 'none' }}>{label}</button>
            ))}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-500)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar movimientos..."
            style={{ width: '100%', height: 56, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, paddingLeft: 48, paddingRight: 20, fontSize: 13, fontWeight: 500, outline: 'none', fontFamily: 'Montserrat', transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = 'var(--violet)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.06)')} />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="glass" style={{ padding: '1rem 1.25rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')} onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                background: t.tipo === 'ingreso' ? 'rgba(16,185,129,0.15)' : 'rgba(236,72,153,0.15)',
                border: `1px solid ${t.tipo === 'ingreso' ? 'rgba(16,185,129,0.25)' : 'rgba(236,72,153,0.25)'}` }}>
                {t.tipo === 'ingreso' ? <ArrowUpRight size={17} style={{ color: 'var(--emerald)' }} /> : <ArrowDownLeft size={17} style={{ color: 'var(--pink)' }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.desc}</div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)', marginTop: 2 }}>{t.cat} · {formatDate(t.fecha)}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: t.tipo === 'ingreso' ? 'var(--emerald)' : 'var(--pink)', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                  {t.tipo === 'ingreso' ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
                  {t.tipo === 'ingreso' ? '+' : ''}{formatCurrency(t.monto, t.cur as any)}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: SC[t.scope], marginTop: 2 }}>{t.scope}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
