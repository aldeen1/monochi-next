'use client'
import React, { useState } from 'react'
import { useGetDetailPost } from '@/lib/api/post'
import PostList from '../../../components/posts/PostList'
import CreateContainer from '../../create/container/CreateContainer'

interface ReplyContainerProps {
    postId: number
}

const ReplyContainer: React.FC<ReplyContainerProps> = ({ postId }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const { data: post, isLoading, error } = useGetDetailPost(postId)

    if (isLoading) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue"></div>
        </div>
    )
    
    if (error) return (
        <div className="flex items-center justify-center h-full text-red-500">
            Error loading post
        </div>
    )
    
    if (!post) return (
        <div className="flex items-center justify-center h-full text-gray-500">
            Post not found
        </div>
    )

    const replies = post.replies || []

    return (
        <div className="flex flex-col items-center w-full max-w-[956px] mx-auto p-4">
            <div className="w-full flex justify-center mb-4">
                <PostList 
                    posts={[post]}
                    showCreateButton={false}
                    createButtonPath={`/board/post/${postId}/create`}
                />
            </div>
            
            <div className="w-full flex justify-center">
                <PostList 
                    posts={replies}
                    createButtonPath={`/board/post/${postId}/create`}
                    showCreateButton={true}
                    onCreateClick={() => setIsCreateModalOpen(true)}
                />
            </div>

            <CreateContainer 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                parentId={postId}
            />
        </div>
    )
}

export default ReplyContainer