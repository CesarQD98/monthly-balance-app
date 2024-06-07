import { ContributionGraphData } from './definitions'

type Props = ItemProps[]

type ItemProps = {
  contribucion_monto: number
  usuario_nombre: string
  contribucion_fecha: Date
}

export function preprocessData(data: Props): ContributionGraphData {
  return data.reduce((acc: ContributionGraphData, curr) => {
    const month = new Date(curr.contribucion_fecha).toISOString().slice(0, 7)
    const person = curr.usuario_nombre

    const existingEntry = acc.find((item) => item.month === month)

    if (existingEntry) {
      if (!existingEntry[person]) {
        existingEntry[person] = 0
      }
      existingEntry[person] =
        Number(existingEntry[person]) + curr.contribucion_monto
    } else {
      const newEntry: {
        date: string
        month: string
        [key: string]: string | number
      } = {
        date: curr.contribucion_fecha.toISOString(),
        month,
      }
      newEntry[person] = curr.contribucion_monto
      acc.push(newEntry)
    }

    return acc
  }, [])
}
