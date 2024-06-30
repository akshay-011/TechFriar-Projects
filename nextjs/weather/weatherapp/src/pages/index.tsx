import Form from '@/modules/app/components/form/form'
import NavBar from '@/modules/app/components/navbar/navBar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section className='main-section' >
      <NavBar />
      <Form />
    </section>
  )
}
