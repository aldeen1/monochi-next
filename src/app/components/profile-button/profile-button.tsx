'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useGetStaticFile } from '@/lib/api/file'
import useAuthStore from '@/store/useAuthStore'
import { useQueryClient } from '@tanstack/react-query'
import { useProfileButton } from './hooks/useProfileButton'

const ProfileButton = () => {
    const { user } = useAuthStore()
    const { data: profileImage, isLoading } = useGetStaticFile(user?.image_url || '')
    const defaultImage = "https://i.pinimg.com/474x/20/4f/8e/204f8e853a9276e272ea2c69bd383bab.jpg"
    const { toggleDropdown, isDropdownOpen } = useProfileButton()

    return (
        <Suspense fallback={<div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />}>
            <div className="relative">
                <div 
                    className="w-10 h-10 rounded-full overflow-hidden relative cursor-pointer hover:ring-2 hover:ring-accent-blue transition-all duration-200"
                    onClick={toggleDropdown}
                >
                    <Image 
                        src={isLoading ? defaultImage : (profileImage || defaultImage)}
                        alt={user?.name || 'Profile'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 40px) 100vw, 40px"
                    />
                </div>
            </div>
        </Suspense>
    )
}

export default ProfileButton