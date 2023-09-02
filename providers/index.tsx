'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import { queryClient } from '@/config/queryClient.config'

interface IProvidersProps {
	children: ReactNode
}

export default function Providers({ children }: IProvidersProps) {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider attribute='class'>
					<Toaster />
					{children}
				</ThemeProvider>
			</QueryClientProvider>
		</SessionProvider>
	)
}
