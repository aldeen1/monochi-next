'use client'

import PostList from '../../board/components/posts/PostList'
import { useGetUsername } from '@/lib/api/profile'
import { useGetUserPosts } from '@/lib/api/post'
import ProfileCard from '../component/ProfileCard'
import { User } from '@/types/user'
import useAuthStore from '@/store/useAuthStore'

const ProfileContainer = ({ username }: { username: string }) => {
    const {user} = useAuthStore()
    const {
      data: currentUser 
    } = useGetUsername(username)
    const { 
      data: posts,
      isPending 
    } = useGetUserPosts(username)

    console.log(currentUser)
    console.log('current post, ', posts)

    if (isPending) return <div>Loading...</div>

    return (
      <div className='flex flex-col h-screen max-h-screen w-full p-8'>
        <div className='flex justify-center pt-8'>
          <ProfileCard user={currentUser?.data as User} imageUrl={currentUser?.data?.image_url} 
          showEditButton = {currentUser?.data?.username == user?.username ? true : false} />
        </div>

        <div className="flex-1 overflow-y-auto mt-4 px-4">
          <div className="flex justify-center">
            <div className="w-[472px]">
              <PostList
                posts={posts?.data || []}
                showCreateButton={true}
                createButtonPath="/board/post/create"
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfileContainer