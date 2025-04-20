import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import useAuthStore from '@/store/useAuthStore'
import { useGetStaticFile } from '@/lib/api/file'

export const useProfileButton = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter()
    const { logout, isAuthed, user } = useAuthStore()
    const queryClient = useQueryClient()
    const {data: profileImage} = useGetStaticFile(user?.image_url || '')

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    const toggleDropdown = () => {
        if(isAuthed){
            setIsDropdownOpen(prev => !prev)
        }else{
            redirect(`/login`)
        }
    }

    const getProfileImage = () => {
        const defaultImage = "https://i.pinimg.com/736x/7c/fb/49/7cfb49f5d3117ec69c15845dfe33c78a.jpg"
        if(isAuthed){
            return profileImage ? profileImage : defaultImage
        }
        return "https://i.pinimg.com/474x/6b/ac/eb/6baceb7f0eb5e0cd6475790dbeb5b25f.jpg"
    }

    return {
        isDropdownOpen,
        toggleDropdown,
        handleLogout,
        getProfileImage,
        invalidateProfileImage: () => queryClient.invalidateQueries({ queryKey: ['profileImage'] })
    }
}