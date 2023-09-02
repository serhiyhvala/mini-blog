'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface IUserMenu {
	image: string
}

export default function UserMenu({ image }: IUserMenu) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Image
					src={image}
					alt='User Avatar'
					width={50}
					height={50}
					className='rounded-full cursor-pointer'
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-white shadow-xl p-4 flex flex-col gap-4 rounded-lg mr-4'>
				<DropdownMenuItem asChild>
					<Link
						href='/profile'
						className='flex items-center gap-3 hover:text-blue-500 transition hover:outline-none'
					>
						<User className='w-5 h-5' />
						<span>My Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link
						href='/api/auth/signout'
						className='flex items-center gap-3 hover:text-blue-500 transition hover:outline-none'
					>
						<LogOut className='w-5 h-5' />
						<span>Sign Out</span>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
