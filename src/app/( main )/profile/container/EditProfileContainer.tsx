'use client'

import { useForm } from 'react-hook-form'
import { useUpdateProfile } from '@/lib/api/profile'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import type { UpdateProfileForm } from '@/lib/api/profile'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Modal from '@/components/Modal'

interface EditProfileContainerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileContainer: React.FC<EditProfileContainerProps> = ({ isOpen, onClose }) => {
  const router = useRouter()
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  const { handleUpdate, isPending } = useUpdateProfile()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UpdateProfileForm>({
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
    }
  })

  const onSubmit = async (data: UpdateProfileForm) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name || '')
      formData.append('bio', data.bio || '')
      
      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      await handleUpdate(formData)
      queryClient.invalidateQueries({queryKey: ['profileImage']})
      onClose()
      router.push(`/profile/${user?.username}`)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...register('bio')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditProfileContainer