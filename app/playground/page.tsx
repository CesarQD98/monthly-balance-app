import { NivoBarCHart } from './components/nivo-bar-chart'

export default function Page() {
  return (
    <div className='max-w-screen-lg mx-auto'>
      <h1>Playground page</h1>

      <article className='h-[500px]'>
        <NivoBarCHart />
      </article>
    </div>
  )
}
