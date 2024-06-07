import { fetchMainPageGraph } from '../lib/data'
import { BarChart } from './bar-chart'

export default async function TotalContributionsGraph() {
  const graphData = await fetchMainPageGraph()

  return (
    <BarChart
      data={graphData}
      keys={['Marita Layme', 'Luigi Layme']}
      indexBy='date'
    />
  )
}
