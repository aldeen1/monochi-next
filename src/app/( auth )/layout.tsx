import React from 'react'

import "../globals.css"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}){
    return (
        <div className="flex justify-center h-full w-full bg-white">
            {children}
        </div>
    )
}