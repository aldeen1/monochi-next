'use client'
import { useEffect } from 'react'
import useAuthStore from '@/store/useAuthStore'
import { useProfileButton } from './hooks/useProfileButton'
import { useRouter } from 'next/navigation'

const ProfileButton = () => {
    const router = useRouter()
    const {
        user,
        isAuthed
    } = useAuthStore()

    const {
        isDropdownOpen,
        toggleDropdown,
        handleLogout,
        getProfileImage
    } = useProfileButton()

    useEffect(() => {
        if (!isAuthed) {
            router.push('/login')
        }
    }, [isAuthed, router])

    if (!isAuthed) return null

    return (
        <div className="relative">
            <div 
                className="w-12 h-12 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-accent-blue transition-all duration-200"
                onClick={toggleDropdown}
            >
                <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>
            
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => router.push(`/profile/${user?.username}`)}
                    >
                        Profile
                    </button>
                    <button 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileButton