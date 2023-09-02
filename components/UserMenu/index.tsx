'use client'

import { LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'

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
			<DropdownMenuContent>
				<DropdownMenuItem asChild>
					<Link href='/profile' className='flex items-center gap-3'>
						<User className='w-5 h-5' />
						<span>My Profile</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/api/auth/signout' className='flex items-center gap-3 '>
						<LogOut className='w-5 h-5' />
						<span>Sign Out</span>
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
