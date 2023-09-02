'use client'

import {
	DropdownMenu,
	DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { Computer, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'

export default function ThemeToggle() {
	const { setTheme, theme } = useTheme()

	const currentThemeIcon = theme === 'dark' ? <Moon /> : <Sun />

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{currentThemeIcon}</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					className='flex items-center gap-3'
					onClick={() => setTheme('light')}
				>
					<Sun />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem
					className='flex items-center gap-3'
					onClick={() => setTheme('dark')}
				>
					<Moon />
					<span>Dark</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
