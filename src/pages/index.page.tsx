import { Heading } from '@ignite-ui/react'
import { Roboto } from 'next/font/google'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })
export default function Home() {
  return (
    <>
      <Heading as="h1">Hello world</Heading>
    </>
  )
}
