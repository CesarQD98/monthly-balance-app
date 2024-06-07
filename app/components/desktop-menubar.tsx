import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

export default async function DesktopMenubar() {
  const session = await getServerSession(options)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/server')
  }

  const { user } = session

  return (
    <nav className='hidden md:flex flex-grow justify-between'>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Contribuciones</MenubarTrigger>
          <MenubarContent align='start'>
            <Link passHref href='/mis-contribuciones'>
              <MenubarItem>Mis contribuciones</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Menubar className='border-0'>
        <MenubarMenu>
          <MenubarTrigger className='flex gap-3'>
            <span>{session?.user?.name?.split(' ')[0]}</span>
            <Avatar>
              <AvatarImage
                src={user?.image ?? undefined}
                alt={`Foto de perfil`}
              />
              <AvatarFallback>
                {user?.name ? user?.name[0] : '?'}
              </AvatarFallback>
            </Avatar>
          </MenubarTrigger>
          <MenubarContent align='end'>
            <Link passHref href='/mi-perfil'>
              <MenubarItem>Mi perfil</MenubarItem>
            </Link>
            <Link href='/api/auth/signout' passHref>
              <MenubarItem className='flex gap-2 items-center text-xs text-destructive'>
                <LogOut className='size-4' />
                Cerrar sesión
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  )
}
