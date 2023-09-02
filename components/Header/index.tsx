import { Newspaper } from 'lucide-react'
import Link from 'next/link'

import AuthButtons from '../AuthButtons'
import ThemeToggle from '../ThemeToggle'

export default function Header() {
	return (
		<header className='w-full border-b-2 border-gray-300'>
			<div className='flex items-center justify-between p-4'>
				<Link
					href='/'
					className='flex items-center gap-2 hover:text-blue-500 transition'
				>
					<Newspaper className='w-7 h-7' />
					<span className='uppercase text-xl'>MiniBlog</span>
				</Link>
				<ThemeToggle />
				<AuthButtons />
			</div>
		</header>
	)
}
