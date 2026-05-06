import type { Currency } from '@/types'

export function formatCurrency(amount: number, currency: Currency = 'ARS'): string {
  if (currency === 'ARS') {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short' }).format(date)
}

export function currentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const ACCOUNT_COLORS: Record<string, string> = {
  galicia: '#0066cc',
  mercadopago: '#00bcd4',
  payoneer: '#ff4d4d',
  belo: '#8b5cf6',
  efectivo: '#00c896',
}

export const ACCOUNT_LABELS: Record<string, string> = {
  galicia: 'Galicia',
  mercadopago: 'Mercado Pago',
  payoneer: 'Payoneer',
  belo: 'Belo',
  efectivo: 'Efectivo',
}
