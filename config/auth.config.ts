import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { supabase } from './supabase.config'

export const authConfig: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
		})
	],
	callbacks: {
		async signIn({ user }) {
			if (user.email) {
				const { data } = await supabase
					.from('user')
					.select()
					.eq('email', user.email)
					.single()
				if (!data) {
					await supabase.from('user').insert({
						email: user.email,
						image: user.image,
						name: user.name
					})
				}
				return true
			} else {
				return false
			}
		},
		async redirect() {
			return '/'
		}
	}
}
