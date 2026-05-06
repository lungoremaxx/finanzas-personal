import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const COMPARATIVA_CATS = [
  { cat: 'Alimentos', icono: '🛒', abr: 245000, may: 280000 },
  { cat: 'Transporte', icono: '⛽', abr: 180000, may: 145000 },
  { cat: 'Vivienda', icono: '🏠', abr: 380000, may: 380000 },
  { cat: 'Servicios', icono: '💡', abr: 195000, may: 210000 },
  { cat: 'RE/MAX', icono: '🏢', abr: 165000, may: 200000 },
  { cat: 'Ocio', icono: '🎬', abr: 42000, may: 28000 },
]

const EVOLUCION = [
  { mes: 'Dic', Ingresos: 1800000, Egresos: 1100000, Balance: 700000 },
  { mes: 'Ene', Ingresos: 2100000, Egresos: 1250000, Balance: 850000 },
  { mes: 'Feb', Ingresos: 1900000, Egresos: 980000, Balance: 920000 },
  { mes: 'Mar', Ingresos: 2400000, Egresos: 1400000, Balance: 1000000 },
  { mes: 'Abr', Ingresos: 2200000, Egresos: 1180000, Balance: 1020000 },
  { mes: 'May', Ingresos: 2800000, Egresos: 1350000, Balance: 1450000 },
]

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong rounded-xl px-4 py-3 text-xs space-y-1">
      <div style={{ color: 'var(--text-soft)', fontWeight: 700 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: 'var(--text-muted)' }}>{p.name}:</span>
          <span style={{ color: 'var(--text)', fontWeight: 700 }}>{formatCurrency(p.value, 'ARS')}</span>
        </div>
      ))}
    </div>
  )
}

export function Analisis() {
  const [view, setView] = useState<'categorias' | 'evolucion'>('categorias')
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl" style={{ color: 'var(--text)', fontWeight: 800 }}>Análisis</h2>
        <div className="flex gap-1 glass rounded-xl p-1">
          {(['categorias', 'evolucion'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className="px-3 py-1.5 rounded-lg text-[10px] transition-all"
              style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                background: view === v ? 'var(--surface2)' : 'transparent',
                color: view === v ? 'var(--text)' : 'var(--text-muted)',
                border: view === v ? '1px solid var(--border2)' : '1px solid transparent' }}>
              {v === 'categorias' ? 'Por categoría' : 'Evolución'}
            </button>
          ))}
        </div>
      </div>

      {view === 'categorias' && (
        <>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>Comparativa por categoría</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-soft)', marginBottom: 16 }}>Abril vs Mayo 2026</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={COMPARATIVA_CATS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={2}>
                  <XAxis dataKey="cat" tick={{ fill: '#5c6b7a', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="abr" name="Abril" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} opacity={0.6} />
                  <Bar dataKey="may" name="Mayo" fill="#00c896" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              {['Categoría', 'Abril', 'Mayo', 'Δ'].map(h => (
                <span key={h} style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{h}</span>
              ))}
            </div>
            {COMPARATIVA_CATS.map((row, i) => {
              const diff = row.may - row.abr
              const pct = Math.round((diff / row.abr) * 100)
              return (
                <div key={row.cat} className="grid grid-cols-4 px-5 py-3 items-center"
                  style={{ borderBottom: i < COMPARATIVA_CATS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="flex items-center gap-2">
                    <span>{row.icono}</span>
                    <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>{row.cat}</span>
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--text-soft)', fontWeight: 600 }}>{formatCurrency(row.abr, 'ARS')}</span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--text)', fontWeight: 700 }}>{formatCurrency(row.may, 'ARS')}</span>
                  <span className="mono" style={{ fontSize: 12, color: diff > 0 ? 'var(--red)' : 'var(--green)', fontWeight: 700 }}>{diff > 0 ? '+' : ''}{pct}%</span>
                </div>
              )
            })}
          </motion.div>
        </>
      )}

      {view === 'evolucion' && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Evolución últimos 6 meses</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={EVOLUCION} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <XAxis dataKey="mes" tick={{ fill: '#5c6b7a', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#5c6b7a', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip content={<TT />} />
                <Line type="monotone" dataKey="Ingresos" stroke="#00c896" strokeWidth={2.5} dot={{ fill: '#00c896', r: 4 }} />
                <Line type="monotone" dataKey="Egresos" stroke="#f43f5e" strokeWidth={2.5} dot={{ fill: '#f43f5e', r: 4 }} />
                <Line type="monotone" dataKey="Balance" stroke="#3b82f6" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 mt-3">
            {[{ label: 'Ingresos', color: '#00c896' }, { label: 'Egresos', color: '#f43f5e' }, { label: 'Balance', color: '#3b82f6' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
