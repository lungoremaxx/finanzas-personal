import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const MOCK_BALANCE = { ars: 1_450_000, usd: 820 }
const MOCK_MES = { ingresos: 2_800_000, egresos: 1_350_000 }
const MOCK_EQUILIBRIO = { target: 1_200_000, actual: 1_350_000 }

const MOCK_EVOLUCION = [
  { mes: 'Dic', ingresos: 1800000, egresos: 1100000 },
  { mes: 'Ene', ingresos: 2100000, egresos: 1250000 },
  { mes: 'Feb', ingresos: 1900000, egresos: 980000 },
  { mes: 'Mar', ingresos: 2400000, egresos: 1400000 },
  { mes: 'Abr', ingresos: 2200000, egresos: 1180000 },
  { mes: 'May', ingresos: 2800000, egresos: 1350000 },
]

const MOCK_CATEGORIAS = [
  { name: 'Vivienda', value: 380000, color: '#3b82f6' },
  { name: 'Alimentos', value: 280000, color: '#00c896' },
  { name: 'Transporte', value: 145000, color: '#f59e0b' },
  { name: 'Servicios', value: 210000, color: '#8b5cf6' },
  { name: 'RE/MAX', value: 200000, color: '#f43f5e' },
  { name: 'Otros', value: 135000, color: '#5c6b7a' },
]

const MOCK_ULTIMAS = [
  { desc: 'Supermercado Disco', cat: 'Alimentos', monto: 12500, fecha: '06 may', tipo: 'egreso', usd: false },
  { desc: 'Comisión venta Valle Escondido', cat: 'RE/MAX', monto: 850000, fecha: '05 may', tipo: 'ingreso', usd: false },
  { desc: 'YPF combustible', cat: 'Transporte', monto: 28000, fecha: '04 may', tipo: 'egreso', usd: false },
  { desc: 'Expensas dpto', cat: 'Vivienda', monto: 45000, fecha: '03 may', tipo: 'egreso', usd: false },
  { desc: 'Payoneer recibo', cat: 'Ingresos', monto: 320, fecha: '02 may', tipo: 'ingreso', usd: true },
]

const TT = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong rounded-xl px-4 py-3 text-xs">
      <div className="mb-1" style={{ color: 'var(--text-soft)', fontWeight: 700 }}>{label}</div>
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

const pct = Math.round((MOCK_EQUILIBRIO.actual / MOCK_EQUILIBRIO.target) * 100)

export function Dashboard() {
  const balance = MOCK_MES.ingresos - MOCK_MES.egresos
  return (
    <div className="space-y-5 pb-24 md:pb-6">
      <div className="flex items-end justify-between">
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)' }}>Mayo 2026</p>
          <h1 className="text-2xl mt-0.5" style={{ color: 'var(--text)', fontWeight: 800 }}>Hola, Martín</h1>
        </div>
        <div className="text-right">
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>Balance consolidado</p>
          <p className="text-xl mono mt-0.5" style={{ color: 'var(--green)', fontWeight: 800 }}>{formatCurrency(MOCK_BALANCE.ars, 'ARS')}</p>
          <p className="text-xs mono" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>+ {formatCurrency(MOCK_BALANCE.usd, 'USD')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Ingresos', value: MOCK_MES.ingresos, icon: TrendingUp, color: 'var(--green)', dim: 'var(--green-dim)', diff: '+12%' },
          { label: 'Egresos', value: MOCK_MES.egresos, icon: TrendingDown, color: 'var(--red)', dim: 'var(--red-dim)', diff: '-5%' },
          { label: 'Balance', value: balance, icon: Wallet, color: 'var(--blue)', dim: 'var(--blue-dim)', diff: '+18%' },
          { label: 'Equilibrio', value: MOCK_EQUILIBRIO.target, icon: Target, color: 'var(--gold)', dim: 'var(--gold-dim)', diff: `${pct}%` },
        ].map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }} className="glass rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: card.dim }}>
                  <Icon size={14} style={{ color: card.color }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: card.color }}>{card.diff}</span>
              </div>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 4 }}>{card.label}</p>
              <p className="text-lg mono" style={{ color: 'var(--text)', fontWeight: 800, lineHeight: 1.2 }}>{formatCurrency(card.value, 'ARS')}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Punto de equilibrio mensual</p>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text)', fontWeight: 600 }}>{formatCurrency(MOCK_EQUILIBRIO.actual, 'ARS')} / {formatCurrency(MOCK_EQUILIBRIO.target, 'ARS')}</p>
          </div>
          <span className="text-sm" style={{ color: pct >= 100 ? 'var(--red)' : 'var(--green)', fontWeight: 800 }}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'var(--surface2)' }}>
          <motion.div className="h-full rounded-full" style={{ background: pct >= 100 ? 'var(--red)' : 'var(--green)' }}
            initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }} />
        </div>
        <p className="mt-2" style={{ fontSize: 10, color: 'var(--text-muted)' }}>
          {pct < 100
            ? `Te faltan ${formatCurrency(MOCK_EQUILIBRIO.target - MOCK_EQUILIBRIO.actual, 'ARS')} para cubrir tus costos fijos`
            : `Superaste el punto de equilibrio en ${formatCurrency(MOCK_EQUILIBRIO.actual - MOCK_EQUILIBRIO.target, 'ARS')}`}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-2xl p-5 md:col-span-2">
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Evolución 6 meses</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_EVOLUCION} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00c896" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00c896" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gEgresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="mes" tick={{ fill: '#5c6b7a', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<TT />} />
                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#00c896" strokeWidth={2} fill="url(#gIngresos)" />
                <Area type="monotone" dataKey="egresos" name="Egresos" stroke="#f43f5e" strokeWidth={2} fill="url(#gEgresos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-2xl p-5">
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Por categoría</p>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MOCK_CATEGORIAS} cx="50%" cy="50%" innerRadius={32} outerRadius={50} dataKey="value" strokeWidth={0}>
                  {MOCK_CATEGORIAS.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: any) => formatCurrency(v, 'ARS')} contentStyle={{ background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 12, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {MOCK_CATEGORIAS.slice(0, 4).map(c => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-soft)' }}>{c.name}</span>
                </div>
                <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)' }}>{formatCurrency(c.value, 'ARS')}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass rounded-2xl p-5">
        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 16 }}>Últimos movimientos</p>
        <div className="space-y-2">
          {MOCK_ULTIMAS.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: tx.tipo === 'ingreso' ? 'var(--green-dim)' : 'var(--red-dim)' }}>
                {tx.tipo === 'ingreso' ? <ArrowUpRight size={14} style={{ color: 'var(--green)' }} /> : <ArrowDownRight size={14} style={{ color: 'var(--red)' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate" style={{ color: 'var(--text)', fontWeight: 600 }}>{tx.desc}</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{tx.cat} · {tx.fecha}</p>
              </div>
              <span className="mono shrink-0 text-sm" style={{ color: tx.tipo === 'ingreso' ? 'var(--green)' : 'var(--red)', fontWeight: 800 }}>
                {tx.tipo === 'ingreso' ? '+' : '-'}{tx.usd ? formatCurrency(tx.monto, 'USD') : formatCurrency(tx.monto, 'ARS')}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
