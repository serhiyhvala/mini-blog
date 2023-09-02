import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Header from '@/components/Header'

import './globals.css'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
	title: 'Mini Blog',
	icons: ['/logo.svg']
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={poppins.className}>
				<Header />
				<main className='max-w-5xl mx-auto p-4'>{children}</main>
			</body>
		</html>
	)
}
