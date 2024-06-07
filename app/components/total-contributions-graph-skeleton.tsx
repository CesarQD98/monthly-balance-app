import { Skeleton } from '@/components/ui/skeleton'

export default function TotalContributionsGraphSkeleton() {
  return (
    <div className='h-[400px] flex flex-col gap-4'>
      <Skeleton className='h-[67.2px] w-1/2' />
      <Skeleton className='h-[67.2px] w-3/4' />
      <Skeleton className='h-[67.2px] w-2/5' />
      <Skeleton className='h-[67.2px] w-3/5' />
      <Skeleton className='h-[67.2px] w-4/5' />
    </div>
  )
}
