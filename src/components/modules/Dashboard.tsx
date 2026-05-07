import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const chartData: Record<string, any[]> = {
  may: [
    { name: 'LUN', Gastos: 42000, Ingresos: 0 },
    { name: 'MAR', Gastos: 28000, Ingresos: 850000 },
    { name: 'MIE', Gastos: 15000, Ingresos: 0 },
    { name: 'JUE', Gastos: 65000, Ingresos: 0 },
    { name: 'VIE', Gastos: 38000, Ingresos: 320 },
    { name: 'SAB', Gastos: 22000, Ingresos: 0 },
    { name: 'DOM', Gastos: 8000, Ingresos: 0 },
  ],
  abr: [
    { name: 'LUN', Gastos: 35000, Ingresos: 0 },
    { name: 'MAR', Gastos: 52000, Ingresos: 720000 },
    { name: 'MIE', Gastos: 18000, Ingresos: 0 },
    { name: 'JUE', Gastos: 41000, Ingresos: 0 },
    { name: 'VIE', Gastos: 29000, Ingresos: 280 },
    { name: 'SAB', Gastos: 11000, Ingresos: 0 },
    { name: 'DOM', Gastos: 6000, Ingresos: 0 },
  ],
}

const ULTIMAS = [
  { desc: 'Supermercado Disco', cat: 'Alimentos', monto: 12500, fecha: 'Hoy, 14:20', tipo: 'egreso', scope: 'personal', usd: false },
  { desc: 'Comision venta Valle Escondido', cat: 'Laboral', monto: 850000, fecha: 'Ayer, 09:00', tipo: 'ingreso', scope: 'laboral', usd: false },
  { desc: 'YPF combustible', cat: 'Transporte', monto: 28000, fecha: '04 May', tipo: 'egreso', scope: 'mixto', usd: false },
  { desc: 'Payoneer recibo', cat: 'Ingresos', monto: 320, fecha: '02 May', tipo: 'ingreso', scope: 'laboral', usd: true },
  { desc: 'Expensas departamento', cat: 'Vivienda', monto: 45000, fecha: '01 May', tipo: 'egreso', scope: 'personal', usd: false },
]

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 14px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      <div style={{ color: 'var(--slate-400)', marginBottom: 4, fontWeight: 700 }}>{label}</div>
      {payload.map((p: any) => p.value > 0 && (
        <div key={p.name} style={{ color: p.name === 'Gastos' ? '#ec4899' : '#10b981', fontWeight: 700 }}>
          {p.name}: {formatCurrency(p.value, 'ARS')}
        </div>
      ))}
    </div>
  )
}

export function Dashboard() {
  const [period, setPeriod] = useState('may')
  const pct = Math.round((1350000 / 1200000) * 100)

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: 'Ingresos del mes', value: 2800000, icon: TrendingUp, color: 'var(--emerald)', bg: 'rgba(16,185,129,0.15)', diff: '+12% vs mes anterior', ghost: DollarSign },
          { label: 'Gastos del mes', value: 1350000, icon: TrendingDown, color: 'var(--pink)', bg: 'rgba(236,72,153,0.15)', diff: 'En presupuesto', ghost: TrendingDown },
        ].map((card, i) => {
          const Icon = card.icon
          const Ghost = card.ghost
          return (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="glass" style={{ borderRadius: '2rem', padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = '')}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: 20, opacity: 0.1 }}>
                  <Ghost size={52} style={{ color: card.color }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ padding: 10, borderRadius: 12, background: card.bg }}>
                    <Icon size={18} style={{ color: card.color, display: 'block' }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: card.color }}>{card.diff}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>{card.label}</div>
                <div className="mono" style={{ fontSize: 36, fontWeight: 300, color: 'white', lineHeight: 1 }}>{formatCurrency(card.value, 'ARS')}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="glass" style={{ borderRadius: '2rem', padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 6 }}>Punto de Equilibrio Mensual</div>
              <div style={{ fontSize: 22, fontWeight: 300, color: 'white' }}>
                <span className="mono">{formatCurrency(1350000, 'ARS')}</span>
                <span style={{ color: 'var(--slate-600)', fontSize: 16 }}> / </span>
                <span className="mono" style={{ fontSize: 16, color: 'var(--slate-400)' }}>{formatCurrency(1200000, 'ARS')}</span>
              </div>
            </div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: 'var(--pink)' }}>{pct}%</div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }} transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              style={{ height: '100%', borderRadius: 999, background: 'var(--pink)', boxShadow: '0 0 10px rgba(236,72,153,0.4)' }} />
          </div>
          <div style={{ fontSize: 11, marginTop: 8, color: 'var(--slate-500)', fontWeight: 500 }}>Superaste el punto de equilibrio en {formatCurrency(150000, 'ARS')}</div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}>
        <div className="glass" style={{ borderRadius: '2.5rem', padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)' }}>Analisis Semanal de Movimientos</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[['may', 'Mayo 2026'], ['abr', 'Abril 2026']].map(([val, label]) => (
                  <button key={val} onClick={() => setPeriod(val)}
                    style={{ padding: '8px 16px', borderRadius: 12, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Montserrat', cursor: 'pointer', transition: 'all 0.2s',
                      background: period === val ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: period === val ? 'white' : 'var(--slate-500)',
                      border: period === val ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent' }}>{label}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 20 }}>
                {[['#7c3aed', 'Fijos'], ['#ec4899', 'Variables']].map(([color, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate-400)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ height: 280 }}>
            <AnimatePresence mode="wait">
              <motion.div key={period} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData[period]} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.9} /><stop offset="95%" stopColor="#7c3aed" stopOpacity={0.2} />
                      </linearGradient>
                      <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.9} /><stop offset="95%" stopColor="#ec4899" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} dy={12} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 9, fontWeight: 700 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
                    <Tooltip content={<TT />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="Gastos" fill="url(#gG)" radius={[6,6,0,0]} barSize={26} animationDuration={1200} animationEasing="ease-in-out" />
                    <Bar dataKey="Ingresos" fill="url(#gI)" radius={[6,6,0,0]} barSize={26} animationDuration={1200} animationEasing="ease-in-out" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>Historial Reciente</div>
          <h3 style={{ fontSize: 26, fontWeight: 300, color: 'white' }}>Ultimos <span style={{ fontWeight: 500, fontStyle: 'italic' }}>Movimientos</span></h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ULTIMAS.map((tx, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
              <div className="glass" style={{ padding: '1rem 1.25rem', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
                <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: tx.tipo === 'ingreso' ? 'rgba(16,185,129,0.15)' : 'rgba(236,72,153,0.15)',
                  border: `1px solid ${tx.tipo === 'ingreso' ? 'rgba(16,185,129,0.25)' : 'rgba(236,72,153,0.25)'}` }}>
                  {tx.tipo === 'ingreso' ? <ArrowUpRight size={18} style={{ color: 'var(--emerald)' }} /> : <ArrowDownLeft size={18} style={{ color: 'var(--pink)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.desc}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)', marginTop: 2 }}>{tx.cat} · {tx.fecha}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: tx.tipo === 'ingreso' ? 'var(--emerald)' : 'var(--pink)', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                    {tx.tipo === 'ingreso' ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
                    {tx.tipo === 'ingreso' ? '+' : ''}{tx.usd ? formatCurrency(tx.monto, 'USD') : formatCurrency(tx.monto, 'ARS')}
                  </div>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2,
                    color: tx.scope === 'personal' ? '#60a5fa' : tx.scope === 'laboral' ? '#fbbf24' : '#a78bfa' }}>{tx.scope}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
