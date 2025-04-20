import { Post } from "@/types/posts";
import React, { useState } from 'react'
import { useRouter} from 'next/navigation'

import CommentIcon from '@/assets/Post-actions/chat.svg'
import LikeIcon from '@/assets/Post-actions/heart.svg'
import LikedIcon from '@/assets/Post-actions/full-heart.svg'
import { useGetStaticFile } from "@/lib/api/file";
import { useDeleteLikePost, usePutLikePost } from "@/lib/api/like";

interface PostCardProps {
  post: Post
  isDragged?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ post, isDragged = false }) => {
  const {data: profileImage, isLoading} = useGetStaticFile(post.user.image_url || '')
  const defaultImage = "https://i.pinimg.com/736x/7c/fb/49/7cfb49f5d3117ec69c15845dfe33c78a.jpg"
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false)
  const {mutateAsync: handleLike} = usePutLikePost();
  const {mutateAsync: handleDislike} = useDeleteLikePost()

  const handlePostClick = () => {
    if(!isDragged){
      router.push(`/board/post/${post.id}`)
    }
  }

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (!isLiked) {
        await handleLike(post.id)
        setIsLiked(true)
      } else {
        await handleDislike(post.id)
        setIsLiked(false)
      }
    } catch (error) {
      setIsLiked(prev => !prev)
      console.error('Failed to toggle like:', error)
    }
  }

  return (
    <div 
      onClick={handlePostClick}
      className={`
        w-[472px] bg-white rounded-lg p-6 cursor-pointer transition-all duration-200
        ${isDragged ? 'opacity-50' : 'opacity-100'}
        hover:shadow-md mb-4
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              src={isLoading ? defaultImage : (profileImage || defaultImage)} 
              alt={post.user.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1E1E1E]">{post.user.name}</h3>
            <p className="text-sm text-[#666666]">@{post.user.username}</p>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full">
          <span className="text-xl font-bold">⋮</span>
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-[#1E1E1E] text-base">{post.text}</p>
      </div>

      <div className="flex items-center justify-start space-x-6">
        <button 
          onClick={handleLikeClick}
          className="flex items-center space-x-2 text-gray-500 hover:text-accent-blue"
        >
          {isLiked ? <LikedIcon className="w-5 h-5"/> : <LikeIcon className="w-5 h-5"/>}
          <span className="text-sm">{post.total_likes || 0}</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-500 hover:text-accent-blue">
          <CommentIcon className="w-5 h-5"/>
          <span className="text-sm">{post.replies?.length || 0}</span>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-500 hover:text-accent-blue">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        
        <button className="flex items-center space-x-2 text-gray-500 hover:text-accent-blue">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PostCard

