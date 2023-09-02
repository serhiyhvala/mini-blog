import { Metadata } from 'next'

import UserProfile from '@/components/UserProfile'

import { joinTitle } from '@/utils/joinTitle'

export const metadata: Metadata = {
	title: joinTitle('Profile')
}

export default function ProfilePage() {
	return <UserProfile />
}
