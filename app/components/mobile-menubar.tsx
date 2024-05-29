import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'

export default function MobileMenubar() {
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' className='p-0' aria-label='Menu'>
          <Menu className='h-6 w-6' />
        </Button>
      </SheetTrigger>

      <SheetContent className='w-1/2'>
        <div className='flex flex-col justify-between h-full gap-2 py-4'>
          <SheetClose asChild>
            <Link
              href='/mis-contribuciones'
              className='flex gap-2 items-center text-sm'
            >
              Mis contribuciones
            </Link>
          </SheetClose>

          <SheetFooter className='text-xs text-muted-foreground'>
            Desarrollado por CesarQD98
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
