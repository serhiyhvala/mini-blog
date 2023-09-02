'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

import { useUserProfile } from '@/hooks/useUserProfile'

import { PostService } from '@/services/post.service'

import UploadImage from '../UploadImage'
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
import { Textarea } from '../ui/textarea'

export const postSchema = z.object({
	title: z.string().min(5, {
		message: 'Title must be at least 5 characters'
	}),
	image: z.object({
		info: z.object({
			secure_url: z.string().min(10, {
				message: 'Image must be uploaded'
			})
		})
	}),
	description: z.string().min(10, {
		message: 'Description must be at least 5 characters'
	})
})

export default function NewFormPost() {
	const { mutate } = useMutation({ mutationFn: PostService.createNewPost })
	const { data } = useUserProfile()
	const form = useForm<z.infer<typeof postSchema>>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: '',
			image: {
				info: {
					secure_url: ''
				}
			},
			description: ''
		}
	})

	const router = useRouter()

	const handleSubmitForm = (values: z.infer<typeof postSchema>) => {
		try {
			if (data?.id) {
				mutate({ values, userId: data.id })
				toast.success('Post created successfully')
				router.push('/')
			}
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	const isImageUpload = !!form.getValues().image.info.secure_url.length

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmitForm)}
				className='max-w-[500px] w-full flex flex-col gap-5'
			>
				{isImageUpload ? (
					<div className='relative w-[300px]'>
						<Image
							src={form.getValues().image.info.secure_url}
							alt='Image'
							width={300}
							height={300}
							className='rounded-xl'
						/>
						<Button
							variant='destructive'
							className='absolute top-2 right-2'
							onClick={() =>
								form.reset({ image: { info: { secure_url: '' } } })
							}
						>
							<Trash />
						</Button>
					</div>
				) : (
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<UploadImage handleChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder='Post title' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Post description'
									className='resize-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Create post</Button>
			</form>
		</Form>
	)
}
