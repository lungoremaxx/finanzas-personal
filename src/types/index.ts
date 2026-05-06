export type Currency = 'ARS' | 'USD'
export type Scope = 'personal' | 'laboral' | 'mixto'
export type TransactionType = 'ingreso' | 'egreso'
export type AccountType = 'galicia' | 'mercadopago' | 'payoneer' | 'belo' | 'efectivo'

export interface Account {
  id: string
  name: string
  type: AccountType
  currency: Currency
  balance: number
  color: string
  icon: string
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  scope: Scope
  is_fixed: boolean
  budget_monthly?: number
  parent_id?: string
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  currency: Currency
  type: TransactionType
  category_id: string
  category?: Category
  account_id: string
  account?: Account
  scope: Scope
  notes?: string
  import_session_id?: string
  created_at: string
}

export interface CategorizationRule {
  id: string
  pattern: string
  category_id: string
  account_type?: AccountType
}

export interface ImportSession {
  id: string
  account_type: AccountType
  file_name: string
  total_rows: number
  categorized: number
  pending_review: number
  imported_at: string
  transactions?: Transaction[]
}

export interface Settings {
  punto_equilibrio_ars: number
  punto_equilibrio_usd: number
  moneda_principal: Currency
  cotizacion_usd: number
  nombre: string
}
