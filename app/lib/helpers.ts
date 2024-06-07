type ContributionGraphData = {
  date: string
  [key: string]: string | number
}

export function transformContributionsData(dbData) {
  const output: { [date: string]: ContributionGraphData } = {}

  dbData.forEach((item) => {
    const { usuario_nombre, contribucion_monto, contribucion_fecha } = item
    const dateKey = new Date(contribucion_fecha).toISOString().slice(0, 10)

    if (!output[dateKey]) {
      output[dateKey] = {
        date: contribucion_fecha,
      }
    }

    output[dateKey][usuario_nombre] = contribucion_monto
  })

  return Object.values(output)
}

export function preprocessData(data): ContributionGraphData {
  return data.reduce((acc, curr) => {
    const month = new Date(curr.contribucion_fecha).toISOString().slice(0, 7)
    const person = curr.usuario_nombre // 'Marita Layme'

    const existingEntry = acc.find((item) => item.month === month)

    if (existingEntry) {
      if (!existingEntry[person]) {
        existingEntry[person] = 0
      }
      existingEntry[person] += curr.contribucion_monto
    } else {
      const newEntry = { date: curr.contribucion_fecha, month }
      newEntry[person] = curr.contribucion_monto
      acc.push(newEntry)
    }

    return acc
  }, [])
}
