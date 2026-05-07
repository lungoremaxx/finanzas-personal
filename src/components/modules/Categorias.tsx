import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const CATS_INIT = [
  { id:'1', nombre:'Alimentos', icono:'🛒', color:'#10b981', scope:'personal', tipo:'variable' },
  { id:'2', nombre:'Transporte', icono:'⛽', color:'#f59e0b', scope:'mixto', tipo:'variable' },
  { id:'3', nombre:'Vivienda', icono:'🏠', color:'#3b82f6', scope:'personal', tipo:'fijo' },
  { id:'4', nombre:'Servicios', icono:'💡', color:'#8b5cf6', scope:'personal', tipo:'fijo' },
  { id:'5', nombre:'RE/MAX', icono:'🏢', color:'#ec4899', scope:'laboral', tipo:'variable' },
  { id:'6', nombre:'Salud', icono:'🏥', color:'#06b6d4', scope:'personal', tipo:'variable' },
  { id:'7', nombre:'Ocio', icono:'🎬', color:'#f97316', scope:'personal', tipo:'variable' },
]

export function Categorias() {
  const [cats, setCats] = useState(CATS_INIT)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const filtered = cats.filter(c => filter === 'all' || c.tipo === filter)

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>Gestion</div>
          <h2 style={{ fontSize: 30, fontWeight: 300, color: 'white' }}>Mis <span style={{ fontWeight: 500, fontStyle: 'italic' }}>Categorias</span></h2>
        </div>
        <button onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 14, background: 'linear-gradient(135deg, var(--violet), var(--pink))', color: 'white', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat', cursor: 'pointer', border: 'none', boxShadow: '0 0 15px rgba(124,58,237,0.3)' }}>
          <Plus size={14} /> Nueva
        </button>
      </div>

      <div style={{ display: 'flex', padding: 4, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content' }}>
        {[['all','Todas'],['fijo','Costos Fijos'],['variable','Variables']].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)}
            style={{ padding: '8px 20px', borderRadius: 12, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat', cursor: 'pointer', transition: 'all 0.2s',
              border: filter === val ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
              background: filter === val ? 'rgba(255,255,255,0.08)' : 'transparent', color: filter === val ? 'white' : 'var(--slate-500)' }}>{label}</button>
        ))}
      </div>

      <div className="glass" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
        <AnimatePresence>
          {filtered.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '1rem 1.25rem', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 18, background: `${cat.color}20`, border: `1px solid ${cat.color}30` }}>{cat.icono}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{cat.nombre}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 6px', borderRadius: 4,
                    background: cat.tipo === 'fijo' ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)',
                    color: cat.tipo === 'fijo' ? '#60a5fa' : 'var(--emerald)' }}>{cat.tipo === 'fijo' ? 'Fijo' : 'Variable'}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)' }}>{cat.scope}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button style={{ color: 'var(--slate-500)', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}><Pencil size={13} /></button>
                <button onClick={() => setCats(p => p.filter(c => c.id !== cat.id))} style={{ color: 'var(--pink)', background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}><Trash2 size={13} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
            onClick={e => e.target === e.currentTarget && setShowForm(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass-dark" style={{ width: '100%', maxWidth: 380, borderRadius: '2.5rem', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ fontSize: 22, fontWeight: 300, color: 'white' }}>Nueva <span style={{ fontWeight: 500 }}>Categoria</span></h3>
                <button onClick={() => setShowForm(false)} style={{ color: 'var(--slate-500)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input placeholder="Nombre" style={{ height: 48, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '0 16px', fontSize: 13, fontFamily: 'Montserrat', outline: 'none' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <select style={{ height: 44, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0 12px', fontSize: 11, fontFamily: 'Montserrat', outline: 'none' }}>
                    <option value="variable">Variable</option><option value="fijo">Costo fijo</option>
                  </select>
                  <select style={{ height: 44, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '0 12px', fontSize: 11, fontFamily: 'Montserrat', outline: 'none' }}>
                    <option value="personal">Personal</option><option value="laboral">Laboral</option><option value="mixto">Mixto</option>
                  </select>
                </div>
                <button onClick={() => setShowForm(false)} style={{ height: 52, borderRadius: 20, background: 'white', color: 'black', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Montserrat', cursor: 'pointer', border: 'none' }}>Guardar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
