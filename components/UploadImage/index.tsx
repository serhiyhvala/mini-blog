'use client'

import { ImagePlus } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'

import { Button } from '../ui/button'

interface IUploadImage {
	handleChange: (result: any) => void
}

export default function UploadImage({ handleChange }: IUploadImage) {
	return (
		<CldUploadWidget uploadPreset='dxdimsn9' onUpload={handleChange}>
			{({ open }) => {
				function handleOnClick(e: any) {
					e.preventDefault()
					open()
				}
				return (
					<Button variant='outline' onClick={handleOnClick}>
						<ImagePlus className='w-4 h-4 mr-2' />
						Upload an Image
					</Button>
				)
			}}
		</CldUploadWidget>
	)
}
