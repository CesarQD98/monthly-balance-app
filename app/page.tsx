import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'
import { Suspense } from 'react'
import TotalContributionsGraph from './components/total-contributions-graph'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import UserBalance from './components/user-balance'
import UserBalanceSkeleton from './components/user-balance-skeleton'
import TotalContributionsGraphSkeleton from './components/total-contributions-graph-skeleton'

export default async function Home() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  const userEmail = session.user?.email as string

  return (
    <main className='flex flex-col justify-between py-4 px-4 max-w-screen-lg mx-auto'>
      <section className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>
              Contribuciones mensuales de todos los usuarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h4 className='md:text-lg'>
              Correspondientes al año{' '}
              <strong className='text-primary font-bold'>2024</strong>
            </h4>
            <div className='h-[400px] mt-4'>
              <Suspense fallback={<TotalContributionsGraphSkeleton />}>
                <TotalContributionsGraph />
              </Suspense>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de tus contribuciones</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col md:gap-6'>
            <div className='flex flex-col gap-4 md:flex-row items-center md:items-end md:justify-between'>
              <h4 className='md:text-lg md:self-start'>
                En lo que va del año tienes una contribución total de
              </h4>
              <Suspense fallback={<UserBalanceSkeleton />}>
                <UserBalance userEmail={userEmail} />
              </Suspense>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
