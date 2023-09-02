import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { UserService } from '@/services/user.service'

export const useUserProfile = () => {
	const { data: userSession } = useSession()
	const data = useQuery(
		['user_profile'],
		() => UserService.getUserProfile(userSession),
		{
			enabled: !!userSession?.user?.email
		}
	)
	return data
}
