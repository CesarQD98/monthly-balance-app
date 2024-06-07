export type Contribution = {
  usuario_nombre: string
  contribucion_monto: number
  contribucion_fecha: Date
}

export type SalaryProps = {
  sueldo_monto: number
}

export type TotalSalariesProps = {
  total_sueldo_month: number
}

export type TotalExpensesProps = {
  total_expenses_month: number
}

export type TotalUserContributionsProps = {
  total_user_contributions: number
}

export type UserBalanceProps = {
  userEmail: string
  startDate?: string
  endDate?: string
}

export type ContributionGraphData = {
  date: string
  [key: string]: string | number
}[]
