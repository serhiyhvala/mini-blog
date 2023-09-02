'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

import { UserService } from '@/services/user.service'

import { convertData } from '@/utils/convertData'

import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'

import { Tables } from '@/types/database.types'

interface IFormData {
	data: Tables<'user'>
}

export const formSchema = z.object({
	username: z.string().min(3, {
		message: 'User name must be at least 2 characters'
	}),
	isWriter: z.boolean()
})

export default function ProfileForm({ data }: IFormData) {
	const queryClient = useQueryClient()
	const { mutate, isLoading } = useMutation({
		mutationFn: UserService.updateUserProfile,
		onSuccess: () => queryClient.invalidateQueries(['user_profile'])
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: data.name as string,
			isWriter: data.isWriter as boolean
		}
	})

	const handleSubmitForm = (values: z.infer<typeof formSchema>) => {
		try {
			mutate({
				values,
				id: data.id
			})
			toast.success('Profile update successfully')
		} catch (e) {
			toast.error('Something went wrong')
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmitForm)}
				className='max-w-[300px] w-full flex flex-col gap-3'
			>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>User name: </FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex flex-col gap-1'>
					<Label className='text-gray-500'>Email: </Label>
					<Input value={data.email as string} className='w-full' disabled />
				</div>
				<div className='flex flex-col gap-1'>
					<Label className='text-gray-500'>Created at: </Label>
					<Input
						value={convertData(data.created_at)}
						className='w-full'
						disabled
					/>
				</div>
				<FormField
					control={form.control}
					name='isWriter'
					render={({ field }) => (
						<FormItem className='flex items-center gap-3'>
							<FormLabel>Writer mode: </FormLabel>
							<FormControl className='flex items-center'>
								<Switch
									onCheckedChange={field.onChange}
									checked={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' disabled={!form.formState.isDirty || isLoading}>
					Update profile
				</Button>
				<Button asChild>
					<Link href='/api/auth/signout' className='flex items-center gap-3'>
						<LogOut className='w-5 h-5' />
						<span>Sign Out</span>
					</Link>
				</Button>
			</form>
		</Form>
	)
}
