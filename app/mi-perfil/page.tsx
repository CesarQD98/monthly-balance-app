import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
  return (
    <main className='px-4 py-2 flex flex-col gap-4'>
      <h1 className='text-4xl font-bold'>Mi perfil</h1>
      <h2 className='text-lg'>En desarrollo... 🚧</h2>
      <Link href='/' passHref>
        <Button variant='secondary' className='flex items-center gap-2'>
          <Home size={16} />
          Regresar a inicio
        </Button>
      </Link>
    </main>
  )
}
