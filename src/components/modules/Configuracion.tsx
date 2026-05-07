import { useState } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'

export function Configuracion() {
  const [eqARS, setEqARS] = useState(1200000)
  const [eqUSD, setEqUSD] = useState(500)
  const [cotiz, setCotiz] = useState(1050)
  const [moneda, setMoneda] = useState('ARS')

  const inp = { height: 48, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '0 16px', fontSize: 14, fontFamily: 'Montserrat', outline: 'none', width: '100%', transition: 'border-color 0.2s' }
  const lbl = { fontSize: 10, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.15em', color: 'var(--slate-500)', display: 'block', marginBottom: 8, marginLeft: 2 }

  const sections = [
    { title: 'Perfil', content: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🏡</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Martin Trejo</div>
          <div style={{ fontSize: 11, color: 'var(--slate-500)', fontWeight: 600, marginTop: 2 }}>Agente Inmobiliario - Cordoba, Argentina</div>
        </div>
      </div>
    )},
    { title: 'Punto de Equilibrio Mensual', content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: 12, color: 'var(--slate-500)', fontWeight: 500 }}>El minimo que necesitas ganar para cubrir tus costos fijos.</p>
        <div><label style={lbl}>En pesos (ARS)</label><input type="number" value={eqARS} onChange={e => setEqARS(+e.target.value)} style={inp} className="mono" onFocus={e => (e.target.style.borderColor='var(--violet)')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.08)')} /><div style={{ fontSize: 11, color: 'var(--emerald)', marginTop: 4, fontWeight: 600 }}>= {formatCurrency(eqARS, 'ARS')}</div></div>
        <div><label style={lbl}>En dolares (USD)</label><input type="number" value={eqUSD} onChange={e => setEqUSD(+e.target.value)} style={inp} className="mono" onFocus={e => (e.target.style.borderColor='var(--violet)')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.08)')} /><div style={{ fontSize: 11, color: 'var(--emerald)', marginTop: 4, fontWeight: 600 }}>= {formatCurrency(eqUSD, 'USD')}</div></div>
      </div>
    )},
    { title: 'Monedas', content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <label style={lbl}>Moneda principal del dashboard</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {['ARS','USD'].map(m => (
              <button key={m} onClick={() => setMoneda(m)} style={{ flex: 1, height: 44, borderRadius: 12, fontFamily: 'Montserrat', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', background: moneda === m ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)', color: moneda === m ? 'var(--violet-light)' : 'var(--slate-500)', border: `1px solid ${moneda === m ? 'var(--violet)' : 'transparent'}` }}>{m}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={lbl}>Cotizacion USD / ARS</label>
          <input type="number" value={cotiz} onChange={e => setCotiz(+e.target.value)} style={inp} className="mono" onFocus={e => (e.target.style.borderColor='var(--violet)')} onBlur={e => (e.target.style.borderColor='rgba(255,255,255,0.08)')} />
          <div style={{ fontSize: 11, color: 'var(--slate-500)', marginTop: 4, fontWeight: 600 }}>1 USD = {formatCurrency(cotiz, 'ARS')}</div>
        </div>
      </div>
    )},
    { title: 'Cuentas Conectadas', content: (
      <div>{[['Banco Galicia','🏦','#0066cc'],['Mercado Pago','📱','#00bcd4'],['Payoneer','💸','#ff4d4d'],['Belo','⚡','#8b5cf6'],['Efectivo','💵','#10b981']].map(([n,e,c], i, arr) => (
        <div key={n as string} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 12, borderBottom: i < arr.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{e}</div>
          <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: 'white' }}>{n}</div>
          <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.15)', color: 'var(--emerald)' }}>Activa</span>
        </div>
      ))}</div>
    )},
  ]

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>Ajustes</div>
        <h2 style={{ fontSize: 30, fontWeight: 300, color: 'white' }}>Configuracion <span style={{ fontWeight: 500, fontStyle: 'italic' }}>Personal</span></h2>
      </div>
      {sections.map(({ title, content }, i) => (
        <motion.div key={title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
          <div className="glass" style={{ borderRadius: '2rem', padding: '1.5rem' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 14 }}>{title}</div>
            {content}
          </div>
        </motion.div>
      ))}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ width: '100%', height: 60, borderRadius: 24, background: 'white', color: 'black', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Montserrat', cursor: 'pointer', border: 'none', boxShadow: '0 4px 20px rgba(255,255,255,0.1)' }}>
        Guardar Cambios
      </motion.button>
    </div>
  )
}
