import { HomePage } from '@/components/Home/homePage'
import { LoadingHome } from '@/components/ui/loadingHome'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <>
      <Suspense fallback={<LoadingHome />}>
        <HomePage />
      </Suspense>
    </>
  )
}
