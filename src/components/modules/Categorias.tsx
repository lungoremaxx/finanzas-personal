import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

const CATS_INIT = [
  { id: '1', nombre: 'Alimentos', icono: '🛒', color: '#00c896', tipo: 'variable', scope: 'personal' },
  { id: '2', nombre: 'Transporte', icono: '⛽', color: '#f59e0b', tipo: 'variable', scope: 'mixto' },
  { id: '3', nombre: 'Vivienda', icono: '🏠', color: '#3b82f6', tipo: 'fijo', scope: 'personal' },
  { id: '4', nombre: 'Servicios', icono: '💡', color: '#8b5cf6', tipo: 'fijo', scope: 'personal' },
  { id: '5', nombre: 'RE/MAX', icono: '🏢', color: '#f43f5e', tipo: 'variable', scope: 'laboral' },
  { id: '6', nombre: 'Salud', icono: '🏥', color: '#06b6d4', tipo: 'variable', scope: 'personal' },
  { id: '7', nombre: 'Educación', icono: '📚', color: '#f59e0b', tipo: 'variable', scope: 'personal' },
  { id: '8', nombre: 'Ocio', icono: '🎬', color: '#ec4899', tipo: 'variable', scope: 'personal' },
]

const SCOPE_COLORS: Record<string, string> = { personal: '#3b82f6', laboral: '#f59e0b', mixto: '#8b5cf6' }

export function Categorias() {
  const [cats, setCats] = useState(CATS_INIT)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'fijo' | 'variable'>('all')

  const filtered = cats.filter(c => filter === 'all' || c.tipo === filter)

  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl" style={{ color: 'var(--text)', fontWeight: 800 }}>Categorías</h2>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all"
          style={{ background: 'var(--green)', color: '#000', fontWeight: 700 }}>
          <Plus size={14} /> Nueva
        </button>
      </div>

      <div className="flex gap-1 glass rounded-xl p-1 w-fit">
        {(['all', 'fijo', 'variable'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-[10px] transition-all"
            style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
              background: filter === f ? 'var(--surface2)' : 'transparent',
              color: filter === f ? 'var(--text)' : 'var(--text-muted)',
              border: filter === f ? '1px solid var(--border2)' : '1px solid transparent' }}>
            {f === 'all' ? 'Todas' : f === 'fijo' ? 'Costos fijos' : 'Variables'}
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <AnimatePresence>
          {filtered.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 px-5 py-3.5"
              style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                style={{ background: `${cat.color}22` }}>{cat.icono}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm" style={{ color: 'var(--text)', fontWeight: 600 }}>{cat.nombre}</p>
                  <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 6,
                    background: cat.tipo === 'fijo' ? 'var(--blue-dim)' : 'var(--green-dim)',
                    color: cat.tipo === 'fijo' ? 'var(--blue)' : 'var(--green)', fontWeight: 700 }}>
                    {cat.tipo === 'fijo' ? 'FIJO' : 'VARIABLE'}
                  </span>
                </div>
                <span style={{ fontSize: 10, color: SCOPE_COLORS[cat.scope] }}>
                  {cat.scope.charAt(0).toUpperCase() + cat.scope.slice(1)}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--text-muted)' }}><Pencil size={13} /></button>
                <button className="p-1.5 rounded-lg transition-all" style={{ color: 'var(--red)' }}
                  onClick={() => setCats(prev => prev.filter(c => c.id !== cat.id))}><Trash2 size={13} /></button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
            onClick={e => e.target === e.currentTarget && setShowForm(false)}>
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base" style={{ color: 'var(--text)', fontWeight: 800 }}>Nueva categoría</h3>
                <button onClick={() => setShowForm(false)} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
              </div>
              <div className="space-y-3">
                <input placeholder="Nombre" className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                <div className="flex gap-2">
                  <input placeholder="Emoji 🏠" className="w-20 px-3 py-2.5 rounded-xl text-sm outline-none text-center"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  <select className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                    <option value="variable">Variable</option>
                    <option value="fijo">Costo fijo</option>
                  </select>
                </div>
                <select className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                  <option value="personal">Personal</option>
                  <option value="laboral">Laboral</option>
                  <option value="mixto">Mixto</option>
                </select>
                <div>
                  <p style={{ fontSize: 10, marginBottom: 8, color: 'var(--text-muted)', fontWeight: 700 }}>Color</p>
                  <div className="flex gap-2 flex-wrap">
                    {['#00c896', '#3b82f6', '#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#5c6b7a'].map(c => (
                      <div key={c} className="w-7 h-7 rounded-lg cursor-pointer transition-all hover:scale-110"
                        style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full mt-5 py-3 rounded-xl text-sm transition-all"
                style={{ background: 'var(--green)', color: '#000', fontWeight: 700 }}
                onClick={() => setShowForm(false)}>
                Guardar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
