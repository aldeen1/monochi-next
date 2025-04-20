'use client'

import { useState, Suspense } from 'react'
import { User } from '@/types/user'
import useAuthStore from '@/store/useAuthStore'
import EditIcon from '@/assets/Post-actions/adjustments.svg'
import { useGetStaticFile } from '@/lib/api/file'
import EditProfileContainer from '../container/EditProfileContainer'
import Image from 'next/image'

interface ProfileCardProps {
  user: User
  imageUrl?: string
  showEditButton?: boolean
}

const ProfileCard = ({ user, imageUrl, showEditButton = false }: ProfileCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user: currentUser } = useAuthStore()
  const { data: profileImage, isLoading } = useGetStaticFile(user.image_url || '')
  const defaultImage = "https://i.pinimg.com/736x/7c/fb/49/7cfb49f5d3117ec69c15845dfe33c78a.jpg"

  return (
    <Suspense fallback={<div className="flex justify-center items-center h-32">Loading profile...</div>}>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 relative">
              <Image 
                src={isLoading ? defaultImage : (profileImage || defaultImage)} 
                alt={user.name} 
                fill
                className="object-cover"
                sizes="(max-width: 64px) 100vw, 64px"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1E1E1E]">{user.name}</h2>
              <p className="text-sm text-[#666666]">@{user.username}</p>
            </div>
          </div>
          {showEditButton && currentUser?.username === user.username && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <EditIcon width={24} height={24} className="text-gray-600" />
            </button>
          )}
        </div>
        
        {user.bio && (
          <div className="mb-4">
            <p className="text-[#1E1E1E]">{user.bio}</p>
          </div>
        )}
        
        {isEditModalOpen && (
          <EditProfileContainer 
            isOpen={isEditModalOpen} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        )}
      </div>
    </Suspense>
  )
}

export default ProfileCard