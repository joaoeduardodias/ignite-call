import { globalStyles } from '@/styles/globals'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import '../lib/dayjs'
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
