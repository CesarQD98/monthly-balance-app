import { sql } from '@vercel/postgres'
import {
  Contribution,
  SalaryProps,
  TotalExpensesProps,
  TotalSalariesProps,
  TotalUserContributionsProps,
  UserBalanceProps,
} from './definitions'
import { preprocessData } from './helpers'

export async function fetchUserEmails() {
  try {
    const data = await sql<{
      usuario_email: string
    }>`SELECT usuario_email FROM usuarios`

    const emails = data.rows.map((row) => row.usuario_email)

    return emails
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch emails')
  }
}

export async function fetchAllContributionsPerMonth(
  date: string = '2023-04-01'
) {
  try {
    const data =
      await sql<Contribution>`SELECT usuario_nombre, contribucion_monto, contribucion_fecha FROM contribuciones INNER JOIN usuarios ON contribuciones.usuario_id = usuarios.usuario_id WHERE contribucion_fecha = ${date};`

    return data.rows
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch all contributions per current month')
  }
}

export async function fetchMainPageGraph(
  startDate: string = '2024-01-01',
  endDate: string = '2024-12-01'
) {
  try {
    const data =
      await sql<Contribution>`SELECT usuario_nombre, contribucion_monto, contribucion_fecha FROM contribuciones INNER JOIN usuarios ON contribuciones.usuario_id = usuarios.usuario_id WHERE contribucion_fecha BETWEEN ${startDate} AND ${endDate} ORDER BY contribucion_fecha;`

    const contributions = data.rows.map((contribution) => ({
      ...contribution,
      contribucion_monto: contribution.contribucion_monto / 100,
    }))

    const monthlyContributionsPerUser = preprocessData(contributions)

    return monthlyContributionsPerUser
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch all contributions per current month')
  }
}

export async function fetchUserBalance({
  userEmail,
  startDate = '2024-01-01',
  endDate = '2024-12-01',
}: UserBalanceProps) {
  try {
    const { rows: userIdRaw } = await sql<{
      [key: string]: number
    }>`SELECT usuario_id FROM usuarios WHERE usuario_email = ${userEmail};`

    const userId = Number(userIdRaw[0].usuario_id)

    const { rows: userSalariesRaw } = await sql<SalaryProps>`
    SELECT sueldo_monto FROM sueldos WHERE usuario_id = ${userId} AND sueldo_fecha BETWEEN ${startDate} AND ${endDate};`

    const { rows: totalSalariesPerMonthRaw } = await sql<TotalSalariesProps>`
    SELECT CAST(SUM(sueldo_monto) AS INTEGER) AS total_sueldo_month FROM sueldos WHERE sueldo_fecha BETWEEN ${startDate} AND ${endDate} GROUP BY sueldo_fecha ORDER BY sueldo_fecha;
    `

    const { rows: totalExpensesRaw } =
      await sql<TotalExpensesProps>`SELECT CAST(SUM(gasto_monto) AS INTEGER) AS total_expenses_month FROM gastos WHERE gasto_fecha BETWEEN ${startDate} AND ${endDate} GROUP BY gasto_fecha ORDER BY gasto_fecha`

    const { rows: totalContributionsRaw } =
      await sql<TotalUserContributionsProps>`
      SELECT CAST(SUM(contribucion_monto) AS INTEGER) AS total_user_contributions, MAX(contribucion_fecha) AS most_recent_contribution FROM contribuciones WHERE usuario_id = ${userId} AND contribucion_fecha BETWEEN ${startDate} AND ${endDate}`

    const userSalaries = userSalariesRaw.map((item) => item.sueldo_monto)
    const totalSalariesPerMonth = totalSalariesPerMonthRaw.map(
      (item) => item.total_sueldo_month
    )
    const totalExpenses = totalExpensesRaw.map(
      (item) => item.total_expenses_month
    )
    const totalContributions = totalContributionsRaw.map(
      (item) => item.total_user_contributions
    )

    let userGoal = 0
    for (let i = 0; i < totalExpensesRaw.length; i++) {
      userGoal +=
        (totalExpenses[i] * userSalaries[i]) / totalSalariesPerMonth[i]
    }

    const balance = totalContributions[0] - Math.round(userGoal)

    return {
      userGoal: Math.round(userGoal) / 100,
      totalContributions: totalContributions[0] / 100,
      balance: balance / 100,
    }
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed!')
  }
}
