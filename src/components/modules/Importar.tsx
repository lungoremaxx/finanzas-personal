import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { AccountType } from '@/types'

const ACCOUNT_OPTS: { value: AccountType; label: string; color: string }[] = [
  { value: 'galicia', label: 'Banco Galicia', color: '#0066cc' },
  { value: 'mercadopago', label: 'Mercado Pago', color: '#00bcd4' },
  { value: 'payoneer', label: 'Payoneer', color: '#ff4d4d' },
  { value: 'belo', label: 'Belo', color: '#8b5cf6' },
  { value: 'efectivo', label: 'Efectivo', color: '#00c896' },
]

const MOCK_PENDING = [
  { id: 'p1', desc: 'TRANSFERENCIA BANCARIA 00238823', monto: 250000, fecha: '2026-05-01', sugerida: 'Transferencias' },
  { id: 'p2', desc: 'COMERCIO 4829 LA CIUDAD', monto: 8750, fecha: '2026-05-02', sugerida: null },
  { id: 'p3', desc: 'DEBITO AUTOMATICO ECOGAS', monto: 32000, fecha: '2026-05-03', sugerida: 'Servicios' },
]

export function Importar() {
  const [account, setAccount] = useState<AccountType>('galicia')
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<'upload' | 'processing' | 'review'>('upload')
  const [catMap, setCatMap] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f)
    setStep('processing')
    setTimeout(() => setStep('review'), 2000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-xl" style={{ color: 'var(--text)', fontWeight: 800 }}>Importar extracto</h2>

      {step === 'upload' && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>
              ¿De qué cuenta es el extracto?
            </p>
            <div className="flex flex-wrap gap-2">
              {ACCOUNT_OPTS.map(opt => (
                <button key={opt.value} onClick={() => setAccount(opt.value)}
                  className="px-4 py-2 rounded-xl text-xs transition-all"
                  style={{ fontWeight: 700,
                    background: account === opt.value ? `${opt.color}22` : 'var(--surface2)',
                    color: account === opt.value ? opt.color : 'var(--text-muted)',
                    border: `1px solid ${account === opt.value ? opt.color : 'transparent'}` }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
            style={{ border: `2px dashed ${dragging ? 'var(--green)' : 'var(--border2)'}`,
              background: dragging ? 'var(--green-dim)' : undefined, minHeight: 200 }}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept=".csv,.pdf" className="hidden"
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <Upload size={32} className="mb-3" style={{ color: dragging ? 'var(--green)' : 'var(--text-muted)' }} />
            <p className="text-sm mb-1" style={{ color: 'var(--text)', fontWeight: 700 }}>Arrastrá el archivo acá</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>o hacé click para seleccionar</p>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 12 }}>Soporta CSV y PDF · Galicia, Mercado Pago, Payoneer, Belo</p>
          </div>

          <div className="glass rounded-2xl p-5">
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>
              Formatos soportados
            </p>
            <div className="space-y-2">
              {[
                { cuenta: 'Galicia', formato: 'CSV con punto y coma · Desde "Mis cuentas"' },
                { cuenta: 'Mercado Pago', formato: 'CSV semicolón · Empieza en fila 5' },
                { cuenta: 'Payoneer', formato: 'CSV estándar · Sección "Historial"' },
                { cuenta: 'Belo', formato: 'CSV · Exportar desde la app' },
              ].map(f => (
                <div key={f.cuenta} className="flex items-start gap-3">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--green)' }} />
                  <div>
                    <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 700 }}>{f.cuenta}: </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{f.formato}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {step === 'processing' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center" style={{ minHeight: 300 }}>
          <div className="w-12 h-12 rounded-full border-2 mb-4 animate-spin"
            style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
          <p className="text-sm" style={{ color: 'var(--text)', fontWeight: 700 }}>Procesando {file?.name}</p>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Analizando y categorizando transacciones...</p>
        </motion.div>
      )}

      {step === 'review' && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Importación lista</p>
                <p className="text-sm" style={{ color: 'var(--text)', fontWeight: 700 }}>{file?.name}</p>
              </div>
              <div className="flex gap-3 text-center">
                <div>
                  <p className="text-xl mono" style={{ color: 'var(--green)', fontWeight: 800 }}>47</p>
                  <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Categorizadas</p>
                </div>
                <div>
                  <p className="text-xl mono" style={{ color: 'var(--gold)', fontWeight: 800 }}>3</p>
                  <p style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Para revisar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)' }}>
                ⚠ Necesitan tu atención
              </p>
            </div>
            {MOCK_PENDING.map((tx, i) => (
              <div key={tx.id} className="px-5 py-4" style={{ borderBottom: i < MOCK_PENDING.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ color: 'var(--text)', fontWeight: 600 }}>{tx.desc}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                      {new Date(tx.fecha).toLocaleDateString('es-AR')} · {formatCurrency(tx.monto, 'ARS')}
                    </p>
                  </div>
                  {tx.sugerida && (
                    <span style={{ fontSize: 9, padding: '4px 8px', borderRadius: 8, marginLeft: 8,
                      background: 'var(--green-dim)', color: 'var(--green)', fontWeight: 700 }}>
                      IA: {tx.sugerida}
                    </span>
                  )}
                </div>
                <select value={catMap[tx.id] || tx.sugerida || ''}
                  onChange={e => setCatMap(prev => ({ ...prev, [tx.id]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)' }}>
                  <option value="">Seleccionar categoría...</option>
                  <option>Alimentos</option><option>Transporte</option><option>Vivienda</option>
                  <option>Servicios</option><option>RE/MAX</option><option>Transferencias</option><option>Otros</option>
                </select>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep('upload')} className="flex-1 py-3 rounded-xl text-sm transition-all"
              style={{ background: 'var(--surface2)', color: 'var(--text-muted)', fontWeight: 700 }}>
              Cancelar
            </button>
            <button className="flex-1 py-3 rounded-xl text-sm transition-all"
              style={{ background: 'var(--green)', color: '#000', fontWeight: 700 }}>
              Confirmar importación
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
