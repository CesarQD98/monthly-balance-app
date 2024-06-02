import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LogOut, Menu, ReceiptText } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function MobileMenubar() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  const { user } = session
  return (
    <Sheet>
      <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' className='p-0' aria-label='Menu'>
          <Menu className='h-6 w-6' />
        </Button>
      </SheetTrigger>

      <SheetContent className='w-1/2'>
        <div className='flex flex-col justify-between h-full gap-2 py-4'>
          <div className='flex flex-col gap-4 flex-grow'>
            <SheetClose asChild>
              <Link
                href='/mis-contribuciones'
                className='flex gap-2 items-center text-xs'
              >
                <ReceiptText className='size-4' />
                Mis contribuciones
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href='/api/auth/signout'
                className='flex gap-2 items-center text-xs text-destructive'
              >
                <LogOut className='size-4' />
                Cerrar sesión
              </Link>
            </SheetClose>
            <Separator />
            <SheetClose asChild>
              <Link
                href='/mi-perfil'
                className='flex gap-2 items-center text-xs'
              >
                <Avatar className='size-8'>
                  <AvatarImage
                    src={user?.image ?? undefined}
                    alt={`Foto de perfil`}
                  />
                  <AvatarFallback>
                    {user?.name ? user?.name[0] : '?'}
                  </AvatarFallback>
                </Avatar>
                Mi perfil
              </Link>
            </SheetClose>
          </div>

          <SheetFooter className='text-xs text-muted-foreground'>
            Desarrollado por CesarQD98
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
