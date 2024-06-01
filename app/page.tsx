import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  console.log(session?.user)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between py-12'>
      <div className='flex items-center gap-8'>
        <h1 className='text-5xl font-bold'>
          Hola {session?.user?.name?.split(' ')[0]} 👋
        </h1>
        {session?.user?.image ? (
          <Image
            className='rounded-full'
            src={session?.user?.image}
            width={96}
            height={96}
            alt={session?.user?.name?.split(' ')[0] ?? 'Foto de perfil'}
            priority
          />
        ) : null}
      </div>
    </main>
  )
}
