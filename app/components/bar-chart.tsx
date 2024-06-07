'use client'
import { ResponsiveBar } from '@nivo/bar'

type BarChartProps = {
  data: { [key: string]: string | number }[]
  keys: string[]
  indexBy: string
}

export function BarChart({ data, keys, indexBy }: BarChartProps) {
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      groupMode='stacked'
      layout='horizontal'
      margin={{ top: 0, right: 15, bottom: 100, left: 45 }}
      padding={0.3}
      enableGridX
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      theme={{
        text: {
          fontSize: 15,
          fill: '#fff',
        },
        axis: {
          ticks: {
            text: {
              fontSize: 13,
            },
          },
        },
      }}
      colors={{ scheme: 'tableau10' }}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 1.6]],
      }}
      borderWidth={0.3}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -40,
        legend: 'Nuevos soles',
        legendPosition: 'middle',
        legendOffset: 42,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 20,
        tickRotation: -45,
        truncateTickAt: 0,
        format: function (value) {
          return new Date(value).toLocaleString('es', { month: 'short' })
        },
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 90,
          itemsSpacing: 32,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role='application'
      ariaLabel='Nivo bar chart demo'
      barAriaLabel={(e) =>
        e.id + ': ' + e.formattedValue + ' en el mes: ' + e.indexValue
      }
      valueFormat={(d) =>
        new Intl.NumberFormat('es-PE', {
          style: 'currency',
          currency: 'PEN',
        }).format(d)
      }
      tooltip={({ id, value, color }) => (
        <div
          style={{
            padding: 4,
            background: '#000',
            color: '#fff',
          }}
        >
          {id}:{' '}
          <strong style={{ color }}>
            {new Intl.NumberFormat('es-PE', {
              style: 'currency',
              currency: 'PEN',
            }).format(value)}
          </strong>
        </div>
      )}
    />
  )
}
