"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { withUrqlClient } from 'next-urql';
import { cacheExchange, fetchExchange } from 'urql';
import { url } from "./lib/constants";
import user from './lib/user-details';

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: 'Baymoon Properties',
  description: 'Baymoon Properties',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default withUrqlClient(
  ssrExchange => ({
    url,
    exchanges: [cacheExchange, ssrExchange, fetchExchange],
    fetchOptions: () => {
      let token = ''
      if (typeof window !== 'undefined') {
        // Perform localStorage action
        token = user().token
      }
      return {
        headers: { authorization: token ? `JWT ${token}` : '' },
      };
    },
  }),
  { ssr: true }
)(RootLayout);
