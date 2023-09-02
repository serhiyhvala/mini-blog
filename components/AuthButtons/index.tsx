import { LogIn } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import UserMenu from '../UserMenu'
import { Button } from '../ui/button'

export default async function AuthButtons() {
	const data = await getServerSession()
	return data?.user ? (
		<UserMenu image={data.user.image as string} />
	) : (
		<Button asChild>
			<Link className='flex items-center gap-2' href='/api/auth/signin'>
				<LogIn className='w-5 h-5' />
				<span>Sign In</span>
			</Link>
		</Button>
	)
}
