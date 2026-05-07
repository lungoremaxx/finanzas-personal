import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const ACCOUNTS = [
  { value: 'galicia', label: 'Banco Galicia', color: '#0066cc' },
  { value: 'mercadopago', label: 'Mercado Pago', color: '#00bcd4' },
  { value: 'payoneer', label: 'Payoneer', color: '#ff4d4d' },
  { value: 'belo', label: 'Belo', color: '#8b5cf6' },
]

export function Importar() {
  const [account, setAccount] = useState('galicia')
  const [dragging, setDragging] = useState(false)
  const [step, setStep] = useState<'upload'|'processing'|'review'>('upload')
  const [file, setFile] = useState<File|null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => { setFile(f); setStep('processing'); setTimeout(() => setStep('review'), 2200) }

  return (
    <div className="px-6 md:px-12 max-w-7xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--slate-500)', marginBottom: 4 }}>Importacion Bancaria</div>
        <h2 style={{ fontSize: 30, fontWeight: 300, color: 'white' }}>Subir <span style={{ fontWeight: 500, fontStyle: 'italic' }}>Extracto</span></h2>
      </div>

      {step === 'upload' && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass" style={{ borderRadius: '2rem', padding: '1.5rem' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--slate-500)', marginBottom: 12 }}>De que cuenta?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ACCOUNTS.map(a => (
                <button key={a.value} onClick={() => setAccount(a.value)}
                  style={{ padding: '8px 20px', borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Montserrat', cursor: 'pointer', transition: 'all 0.2s',
                    background: account === a.value ? `${a.color}25` : 'rgba(255,255,255,0.04)',
                    color: account === a.value ? a.color : 'var(--slate-400)',
                    border: `1px solid ${account === a.value ? a.color : 'transparent'}` }}>{a.label}</button>
              ))}
            </div>
          </div>
          <div className="glass" style={{ borderRadius: '2.5rem', padding: '4rem 2rem', minHeight: 200, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transition: 'all 0.2s',
            border: `2px dashed ${dragging ? 'var(--violet)' : 'rgba(255,255,255,0.1)'}`, background: dragging ? 'rgba(124,58,237,0.08)' : '' }}
            onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
            onClick={() => fileRef.current?.click()}>
            <input ref={fileRef} type="file" accept=".csv,.pdf" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <Upload size={36} style={{ color: dragging ? 'var(--violet)' : 'rgba(255,255,255,0.25)', marginBottom: 16, transition: 'color 0.2s' }} />
            <div style={{ fontSize: 16, fontWeight: 500, color: 'white', marginBottom: 6 }}>Arrastra el archivo aca</div>
            <div style={{ fontSize: 11, color: 'var(--slate-500)', fontWeight: 600 }}>o hace click para seleccionar</div>
            <div style={{ fontSize: 10, color: 'var(--slate-600)', marginTop: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>CSV / PDF - Galicia / MP / Payoneer / Belo</div>
          </div>
        </motion.div>
      )}

      {step === 'processing' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass" style={{ borderRadius: '2.5rem', padding: '5rem 2rem', minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--violet)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', marginBottom: 20 }} />
          <div style={{ fontSize: 16, fontWeight: 500, color: 'white', marginBottom: 6 }}>Procesando {file?.name}</div>
          <div style={{ fontSize: 11, color: 'var(--slate-500)', fontWeight: 600 }}>Analizando y categorizando con IA...</div>
        </motion.div>
      )}

      {step === 'review' && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="glass" style={{ borderRadius: '2rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--slate-500)', marginBottom: 4 }}>Importacion lista</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'white' }}>{file?.name}</div>
              </div>
              <div style={{ display: 'flex', gap: 24, textAlign: 'center' }}>
                <div><div className="mono" style={{ fontSize: 26, fontWeight: 300, color: 'var(--emerald)' }}>47</div><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)' }}>OK</div></div>
                <div><div className="mono" style={{ fontSize: 26, fontWeight: 300, color: '#f59e0b' }}>3</div><div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--slate-500)' }}>Revisar</div></div>
              </div>
            </div>
          </div>
          <div className="glass" style={{ borderRadius: '2rem', overflow: 'hidden' }}>
            {[['TRANSFERENCIA 00238823', 250000, 'Transferencias'],['COMERCIO 4829 LA CIUDAD', 8750, null],['DEBITO AUTOMATICO ECOGAS', 32000, 'Servicios']].map(([desc, monto, ia]: any, i: number) => (
              <div key={i} style={{ padding: '1rem 1.25rem', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{desc}</div>
                    <div style={{ fontSize: 10, color: 'var(--slate-500)', fontWeight: 600, marginTop: 2 }}>{formatCurrency(monto, 'ARS')}</div>
                  </div>
                  {ia && <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.15)', color: 'var(--emerald)' }}>IA: {ia}</span>}
                </div>
                <select style={{ width: '100%', height: 40, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '0 12px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', outline: 'none', fontFamily: 'Montserrat' }}>
                  <option value="">Seleccionar categoria...</option>
                  {['Alimentos','Transporte','Vivienda','Servicios','Laboral','Transferencias','Otros'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep('upload')} style={{ flex: 1, height: 52, borderRadius: 20, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--slate-400)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Montserrat', cursor: 'pointer' }}>Cancelar</button>
            <button style={{ flex: 2, height: 52, borderRadius: 20, background: 'var(--emerald)', color: 'black', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Montserrat', cursor: 'pointer', border: 'none' }}>Confirmar Importacion</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
