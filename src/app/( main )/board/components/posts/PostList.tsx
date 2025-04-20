import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import CreateButton from '@/app/components/create-button/CreateButton'
import { Post } from '@/types/posts'
import PostCard from './PostCard'
import { useDeletePost } from '@/lib/api/post'
import useAuthStore from '@/store/useAuthStore'

interface PostListProps {
    posts: Post[]
    lastPostRef?: (node?: Element | null) => void
    showCreateButton?: boolean
    createButtonPath: string
    onCreateClick?: () => void
}

const PostList: React.FC<PostListProps> = ({ 
    posts, 
    lastPostRef, 
    showCreateButton = false, 
    createButtonPath,
    onCreateClick
}) => {
    const { user } = useAuthStore()
    const { mutateAsync: handleDelete } = useDeletePost()
    const [draggedPost, setDraggedPost] = useState<Post | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isOverTrash, setIsOverTrash] = useState(false)
    const trashZoneRef = useRef<HTMLDivElement>(null)

    const onMouseEnter = () => setIsOverTrash(true)
    const onMouseLeave = () => setIsOverTrash(false)

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, post: Post) => {
        if (post.user.username === user?.username) {
            e.dataTransfer.effectAllowed = 'move'
            setDraggedPost(post)
            setIsDragging(true)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (trashZoneRef.current) {
            const trashRect = trashZoneRef.current.getBoundingClientRect()
            const isOver = 
                e.clientX >= trashRect.left &&
                e.clientX <= trashRect.right &&
                e.clientY >= trashRect.top &&
                e.clientY <= trashRect.bottom
            setIsOverTrash(isOver)
        }
    }

    const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (draggedPost && isOverTrash) {
            try {
                await handleDelete(draggedPost.id)
            } catch (error) {
                console.error('Failed to delete post:', error)
            }
        }
        setDraggedPost(null)
        setIsDragging(false)
        setIsOverTrash(false)
    }

    const visiblePosts = posts.filter(post => !post.is_deleted)

    return (
        <div className="flex flex-col items-center justify-center relative w-full">
            <AnimatePresence>
                {visiblePosts.map((post, index) => (
                    <div
                        key={post.id}
                        ref={index === visiblePosts.length - 1 ? lastPostRef : null}
                        draggable={post.user.username === user?.username}
                        onDragStart={(e) => handleDragStart(e, post)}
                        onDragEnd={handleDragEnd}
                        className="mb-4 w-full flex justify-center"
                    >
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PostCard 
                                post={post} 
                                isDragged={draggedPost?.id === post.id}
                            />
                        </motion.div>
                    </div>
                ))}
            </AnimatePresence>

            {showCreateButton && (
                <>
                    <div 
                        ref={trashZoneRef}
                        className={`fixed bottom-32 right-8 w-16 h-16 rounded-full transition-all duration-200
                            ${isDragging ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        onDragOver={handleDragOver}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                    <CreateButton
                        trashButtonProps={{
                            isDragging,
                            isOverTrash,
                            onMouseEnter,
                            onMouseLeave
                        }}
                        createButtonPath={createButtonPath}
                        onCreateClick={onCreateClick}
                    />
                </>
            )}
        </div>
    )
}

export default PostList