import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import Link from 'next/link'

export default function DesktopMenubar() {
  return (
    <Menubar className='hidden md:flex'>
      <MenubarMenu>
        <MenubarTrigger>Contribuciones</MenubarTrigger>
        <MenubarContent align='start'>
          <Link passHref href='/mis-contribuciones'>
            <MenubarItem>Mis contribuciones</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
