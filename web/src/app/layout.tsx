import type { Metadata } from 'next'
import { Nunito_Sans, Roboto_Flex } from 'next/font/google'
import './globals.css'
import { SideBar } from '@/components/layout/SideBar'
import { LayoutDashboard, FolderKanban } from 'lucide-react'
import { Main } from '@/components/layout/Main'
import { Header } from '@/components/layout/Header'
import { Input } from '@/components/ui/input'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
})

const nunitoSansFont = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['300', '400', '700']
})

export const metadata: Metadata = {
  title: 'Lumi - Test',
  description: 'Criado para o teste de vaga desenvolvedor pleno Lumi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunitoSansFont.className} ${roboto.className} flex flex-col md:flex-row min-h-screen max-w-screen`}>
        <SideBar.Root>
          <SideBar.Image
            src='/Logo.svg'
            alt='Lumi logo'
            height={70}
            width={157}
          />

          <SideBar.Divisor />

          <SideBar.Menu>
            <SideBar.MenuItem href='/'>
              <LayoutDashboard size={28} className='min-h-7 min-w-7' />

              <p>Dashboard</p>
            </SideBar.MenuItem>

            <SideBar.MenuItem href='/faturas'>
              <FolderKanban size={28} className='min-h-7 min-w-7'/>

              <p>Faturas</p>
            </SideBar.MenuItem>
          </SideBar.Menu>
        </SideBar.Root>

        <Main>
          <Header.Root>
            <Header.Title text='Olá' />

            <Input
              placeholder='Pesquise pelo número ou pelo nome do usuário'
              className='bg-backgroundMain'
            />

            <Header.HeaderDay />
          </Header.Root>

          {children}
        </Main>
      </body>
    </html>
  )
}
