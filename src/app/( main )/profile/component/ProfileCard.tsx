'use client'

import { useState } from 'react'
import { User } from '@/types/user'
import useAuthStore from '@/store/useAuthStore'
import EditIcon from '@/assets/Post-actions/adjustments.svg'
import { useGetStaticFile } from '@/lib/api/file'
import EditProfileContainer from '../container/EditProfileContainer'

interface ProfileCardProps {
  user: User
  imageUrl?: string
  showEditButton?: boolean
}

const ProfileCard = ({ user, imageUrl, showEditButton = false }: ProfileCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const { user: currentUser } = useAuthStore()
  const { data: profileImage } = useGetStaticFile(imageUrl || '')
  const defaultImage = "https://i.pinimg.com/736x/7c/fb/49/7cfb49f5d3117ec69c15845dfe33c78a.jpg"

  const isCurrentUser = currentUser?.username === user.username

  return (
    <>
      <div className="w-[472px] bg-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
              <img
                src={profileImage || defaultImage}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1E1E1E]">{user.name}</h2>
              <p className="text-sm text-[#666666]">@{user.username}</p>
            </div>
          </div>

          {(showEditButton && isCurrentUser) && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <EditIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {user.bio && (
          <div className="mt-4">
            <p className="text-[#1E1E1E] text-base">{user.bio}</p>
          </div>
        )}

        <div className="flex items-center justify-start space-x-6 mt-6">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">0</span>
            <span className="text-sm text-[#666666]">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">0</span>
            <span className="text-sm text-[#666666]">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold text-[#1E1E1E]">0</span>
            <span className="text-sm text-[#666666]">Followers</span>
          </div>
        </div>
      </div>

      <EditProfileContainer
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  )
}

export default ProfileCard