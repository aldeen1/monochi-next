import { useState } from "react";

export const useAddorTrashButtons = (onDelete?: (id:number, user:string) => void ) => {
    const [isDragging, setIsDragging] = useState(false)
    const [isOverTrash, setIsOverTrash] = useState(false)

    const handleDragStart = () => {
        console.log(isDragging)
        setIsDragging(true)
    }

    const handleDragEnd = (postId: number, user: string, event: MouseEvent | PointerEvent| TouchEvent) => {
        if(isOverTrash && onDelete){
            onDelete(postId, user)
        }
        setIsDragging(false)
        setIsOverTrash(false)
    }

    const trashButtonProps = {
        isDragging,
        isOverTrash,
        onMouseEnter: () => setIsOverTrash(true),
        onMouseLeave: () => setIsOverTrash(false)
    }

    return {
        trashButtonProps,
        handleDragStart,
        handleDragEnd
    }
}