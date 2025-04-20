'use client'

import React, { FC, Suspense } from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import TrashIcon from '@/assets/Post-actions/trash.svg'
import AddIcon from '@/assets/Post-actions/plus.svg'

interface ButtonProps {
    isOverTrash?: boolean,
    isDragging?: boolean,
    onClick?: () => void,
    path?: string
}

const CreateButton: FC<ButtonProps> = ({isOverTrash = false, isDragging = false, onClick, path}) => {
    const router = useRouter()
  
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else if (path) {
            router.push(path)
        }
    }

    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-center gap-4">
            <Suspense fallback={<div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>}>
                <motion.button
                    onClick={handleClick}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                        isOverTrash ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        scale: isDragging ? 1.2 : 1,
                    }}
                >
                    {isOverTrash ? (
                        <Image src={TrashIcon} alt="Trash" width={32} height={32} className="text-white" />
                    ) : (
                        <Image src={AddIcon} alt="Add" width={32} height={32} className="text-white" />
                    )}
                </motion.button>
            </Suspense>
        </div>
    );
}

export default CreateButton
