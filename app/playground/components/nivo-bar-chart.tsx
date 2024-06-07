'use client'
import { ResponsiveBar } from '@nivo/bar'

const data = [
  {
    country: 'AD',
    'hot dog': 83,
    'hot dogColor': 'hsl(211, 70%, 50%)',
    burger: 71,
    burgerColor: 'hsl(93, 70%, 50%)',
    sandwich: 65,
    sandwichColor: 'hsl(25, 70%, 50%)',
    kebab: 119,
    kebabColor: 'hsl(246, 70%, 50%)',
    fries: 177,
    friesColor: 'hsl(119, 70%, 50%)',
    donut: 65,
    donutColor: 'hsl(269, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 24,
    'hot dogColor': 'hsl(208, 70%, 50%)',
    burger: 181,
    burgerColor: 'hsl(78, 70%, 50%)',
    sandwich: 176,
    sandwichColor: 'hsl(257, 70%, 50%)',
    kebab: 52,
    kebabColor: 'hsl(354, 70%, 50%)',
    fries: 69,
    friesColor: 'hsl(1, 70%, 50%)',
    donut: 197,
    donutColor: 'hsl(63, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 116,
    'hot dogColor': 'hsl(48, 70%, 50%)',
    burger: 165,
    burgerColor: 'hsl(42, 70%, 50%)',
    sandwich: 185,
    sandwichColor: 'hsl(206, 70%, 50%)',
    kebab: 19,
    kebabColor: 'hsl(229, 70%, 50%)',
    fries: 179,
    friesColor: 'hsl(74, 70%, 50%)',
    donut: 169,
    donutColor: 'hsl(225, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 47,
    'hot dogColor': 'hsl(354, 70%, 50%)',
    burger: 156,
    burgerColor: 'hsl(100, 70%, 50%)',
    sandwich: 91,
    sandwichColor: 'hsl(299, 70%, 50%)',
    kebab: 194,
    kebabColor: 'hsl(211, 70%, 50%)',
    fries: 92,
    friesColor: 'hsl(205, 70%, 50%)',
    donut: 149,
    donutColor: 'hsl(134, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 141,
    'hot dogColor': 'hsl(172, 70%, 50%)',
    burger: 127,
    burgerColor: 'hsl(141, 70%, 50%)',
    sandwich: 50,
    sandwichColor: 'hsl(83, 70%, 50%)',
    kebab: 38,
    kebabColor: 'hsl(267, 70%, 50%)',
    fries: 96,
    friesColor: 'hsl(242, 70%, 50%)',
    donut: 23,
    donutColor: 'hsl(352, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 139,
    'hot dogColor': 'hsl(350, 70%, 50%)',
    burger: 198,
    burgerColor: 'hsl(127, 70%, 50%)',
    sandwich: 5,
    sandwichColor: 'hsl(168, 70%, 50%)',
    kebab: 109,
    kebabColor: 'hsl(286, 70%, 50%)',
    fries: 133,
    friesColor: 'hsl(107, 70%, 50%)',
    donut: 79,
    donutColor: 'hsl(294, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 145,
    'hot dogColor': 'hsl(244, 70%, 50%)',
    burger: 78,
    burgerColor: 'hsl(221, 70%, 50%)',
    sandwich: 40,
    sandwichColor: 'hsl(64, 70%, 50%)',
    kebab: 173,
    kebabColor: 'hsl(321, 70%, 50%)',
    fries: 153,
    friesColor: 'hsl(182, 70%, 50%)',
    donut: 197,
    donutColor: 'hsl(256, 70%, 50%)',
  },
]

export const NivoBarCHart = () => (
  <ResponsiveBar
    data={data}
    keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
    indexBy='country'
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    layout='horizontal'
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    defs={[
      {
        id: 'dots',
        type: 'patternDots',
        background: 'inherit',
        color: '#38bcb2',
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: '#eed312',
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: 'fries',
        },
        id: 'dots',
      },
      {
        match: {
          id: 'sandwich',
        },
        id: 'lines',
      },
    ]}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'country',
      legendPosition: 'middle',
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'food',
      legendPosition: 'middle',
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
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
      e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
    }
  />
)
