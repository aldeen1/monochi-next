'use client'

import React from 'react'
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { useCreatePost } from '@/lib/api/post';
import Modal from '@/components/Modal';

interface CreatePostForm { 
    text: string;
    parent_id?: number | null
}

interface CreateContainerProps {
    isOpen: boolean;
    onClose: () => void;
    parentId?: number;
}

const CreateContainer: React.FC<CreateContainerProps> = ({ isOpen, onClose, parentId }) => {
    const router = useRouter()
    const isReply = !!parentId
    
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<CreatePostForm>({
        defaultValues: {
            text: '',
            parent_id: parentId || null
        }
    })
    
    const {
        mutateAsync: handleCreatePost,
    } = useCreatePost()

    const onSubmit = async(data: CreatePostForm)=>{
        try {
            await handleCreatePost(data)
            onClose()
            router.push(isReply ? `/board/post/${parentId}` : '/board')
        } catch (error) {
            console.error('Failed to create post:', error)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isReply ? "Create Reply" : "Create New Post"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <label htmlFor="text" className="block text-sm font-medium text-gray-700">
                        Content
                    </label>
                    <textarea
                        {...register('text', { 
                            required: 'Content is required',
                            minLength: {
                                value: 1,
                                message: 'Content cannot be empty'
                            }
                        })}
                        id="content"
                        rows={4}
                        className="w-full rounded-md border border-gray-300 p-2 focus:border-accent-blue focus:ring-1 focus:ring-accent-blue"
                    />
                    {errors.text && (
                        <p className="text-red-500 text-sm">{errors.text.message}</p>
                    )}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-accent-blue text-white rounded-md hover:bg-accent-blue/80 disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Creating...' : isReply ? 'Create Reply' : 'Create Post'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateContainer
