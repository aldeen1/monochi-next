import React, { FC } from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'

import TrashIcon from '@/assets/Post-actions/trash.svg'
import AddIcon from '@/assets/Post-actions/plus.svg'

interface ButtonProps {
    trashButtonProps: {
        isDragging: boolean,
        isOverTrash: boolean,
        onMouseEnter: () => void,
        onMouseLeave: () => void
    },
    createButtonPath: string,
    onCreateClick?: () => void
}

const CreateButton: FC<ButtonProps> = ({trashButtonProps, createButtonPath, onCreateClick}) => {
    const router = useRouter()
  
    const {
        isDragging,
        isOverTrash,
        onMouseEnter,
        onMouseLeave,
    } = trashButtonProps

    const handleClick = () => {
        if (onCreateClick) {
            onCreateClick()
        } else {
            router.push(createButtonPath)
        }
    }

    return (
        <div className="fixed bottom-8 right-8 flex flex-col items-center gap-4">
            <motion.button
                className={`w-16 h-16 bg-white rounded-full flex justify-center items-center shadow-lg cursor-pointer 
                    ${isOverTrash ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                animate={{
                    scale: isOverTrash ? 1.2 : 1,
                    opacity: isDragging ? 1 : 0,
                    y: isDragging ? 30 : 0,
                    x: isDragging ? -70: 0
                }}
                initial={{ opacity: 0, y: 0 }}
                transition={{ 
                    duration: 0.2,
                    y: { type: "spring", stiffness: 300, damping: 30 }
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <TrashIcon width={32} height={32} className={`${isOverTrash ? 'text-white' : 'text-gray-600'}`} />
            </motion.button>
    
            <button
                onClick={handleClick}
                className='w-16 h-16 bg-white rounded-full flex justify-center items-center 
                    shadow-lg cursor-pointer z-[1000] transition-all duration-200 ease-in-out 
                    hover:scale-110 hover:bg-accent-blue/90'
            >
                <AddIcon width={32} height={32} className="text-accent-blue"/>
            </button>
        </div>
    );
}

export default CreateButton
