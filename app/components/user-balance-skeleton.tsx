import { Skeleton } from '@/components/ui/skeleton'

export default function UserBalanceSkeleton() {
  return (
    <div className='flex flex-col items-center md:items-end gap-4'>
      <Skeleton className='h-8 w-[200px]' />
      <Skeleton className='h-[60px] w-[330px]' />
    </div>
  )
}
