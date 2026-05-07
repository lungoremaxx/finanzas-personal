import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowUpRight, ArrowDownLeft, Tag, Landmark } from 'lucide-react'

interface Props { onClose: () => void }

export function QuickAdd({ onClose }: Props) {
  const [type, setType] = useState<'ingreso' | 'egreso'>('egreso')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        className="glass-dark" style={{ width: '100%', maxWidth: 380, borderRadius: '3rem', padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 300, color: 'white', fontStyle: 'italic' }}>Nuevo <span style={{ fontWeight: 500 }}>Movimiento</span></h2>
          <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><X size={20} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 4, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, marginBottom: 28 }}>
          {[['egreso', 'Gasto', ArrowDownLeft], ['ingreso', 'Ingreso', ArrowUpRight]].map(([val, label, Icon]: any) => (
            <button key={val} onClick={() => setType(val)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 12, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Montserrat', cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                background: type === val ? (val === 'egreso' ? 'var(--pink)' : 'var(--emerald)') : 'transparent',
                color: type === val ? 'white' : 'var(--slate-500)',
                boxShadow: type === val ? `0 0 15px ${val === 'egreso' ? 'rgba(236,72,153,0.3)' : 'rgba(16,185,129,0.3)'}` : 'none' }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 8, marginLeft: 4 }}>Monto</div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', fontSize: 24, fontWeight: 300, color: 'var(--slate-500)' }}>$</span>
            <input type="number" placeholder="0.00"
              style={{ width: '100%', height: 80, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 32, paddingLeft: 56, paddingRight: 16, fontSize: 36, fontWeight: 300, outline: 'none', transition: 'border-color 0.2s', fontFamily: 'Montserrat', fontVariantNumeric: 'tabular-nums' }}
              onFocus={e => (e.target.style.borderColor = 'var(--violet)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <input type="text" placeholder="Descripcion..."
            style={{ width: '100%', height: 48, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '0 20px', fontSize: 13, fontWeight: 500, outline: 'none', fontFamily: 'Montserrat', transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = 'var(--violet)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[['Categoria', Tag, 'Elegir...'], ['Cuenta', Landmark, 'Galicia']].map(([label, Icon, placeholder]: any) => (
            <div key={label}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--slate-500)', marginBottom: 6, marginLeft: 2 }}>{label}</div>
              <div style={{ position: 'relative' }}>
                <Icon size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-500)' }} />
                <input placeholder={placeholder}
                  style={{ width: '100%', height: 44, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, paddingLeft: 32, paddingRight: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', outline: 'none', fontFamily: 'Montserrat', transition: 'border-color 0.2s' }}
                  onFocus={e => (e.target.style.borderColor = 'var(--violet)')} onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')} />
              </div>
            </div>
          ))}
        </div>

        <button
          style={{ width: '100%', height: 64, borderRadius: 32, background: 'white', color: 'black', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'Montserrat', cursor: 'pointer', border: 'none', boxShadow: '0 4px 20px rgba(255,255,255,0.15)', transition: 'transform 0.15s' }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')} onMouseUp={e => (e.currentTarget.style.transform = '')}>
          Registrar Ahora
        </button>
      </motion.div>
    </motion.div>
  )
}
