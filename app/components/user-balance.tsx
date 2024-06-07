import { CircleCheck, TriangleAlert } from 'lucide-react'
import { fetchUserBalance } from '../lib/data'

type Props = {
  userEmail: string
}

export default async function UserBalance({ userEmail }: Props) {
  const { totalContributions, userGoal, balance } = await fetchUserBalance({
    userEmail,
  })

  return (
    <div className='flex flex-col items-center md:items-end gap-4'>
      {totalContributions && userGoal ? (
        <p className='text-muted-foreground text-xl md:text-3xl md:pt-0 text-right'>
          <strong className='text-primary font-bold text-2xl md:text-4xl'>
            S/. {totalContributions}
          </strong>{' '}
          de S/. {userGoal}
        </p>
      ) : (
        <p className='text-destructive'>Algo malió sal...</p>
      )}

      {balance < 0 ? (
        <div className='dark:text-amber-200 border-[1px] dark:border-amber-200 dark:bg-amber-200/20 p-3 rounded-md flex justify-center items-center gap-2 md:ml-auto w-full md:w-fit'>
          <TriangleAlert />
          <p className='self-center'>
            Hace falta aportar{' '}
            <strong className='text-xl font-bold'>
              {new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN',
              }).format(balance * -1)}
            </strong>
          </p>
        </div>
      ) : (
        <div className='dark:text-green-200 border-2 dark:border-green-200 dark:bg-green-200/20 p-4 rounded-md flex items-center gap-2 w-fit md:ml-auto'>
          <CircleCheck />
          <p>Estas al día con tus contribuciones</p>
        </div>
      )}
    </div>
  )
}
