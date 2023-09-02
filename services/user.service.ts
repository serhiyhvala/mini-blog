import { Session, getServerSession } from 'next-auth'
import * as z from 'zod'

import { formSchema } from '@/components/ProfileForm'

import { supabase } from '@/config/supabase.config'

interface IUpdateUserProfile {
	values: z.infer<typeof formSchema>
	id: string
}

export const UserService = {
	getUserProfile: async (data: Session | null) => {
		if (data?.user?.email) {
			const { data: userProfile } = await supabase
				.from('user')
				.select()
				.eq('email', data.user.email)
				.single()
			return userProfile
		}
	},
	updateUserProfile: async ({ values, id }: IUpdateUserProfile) => {
		return await supabase
			.from('user')
			.update({
				name: values.username,
				isWriter: values.isWriter
			})
			.eq('id', id)
	}
}
