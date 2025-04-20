'use client'

import React, { useEffect } from "react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import { redirect } from "next/navigation"
import Image from 'next/image'

function Sidebar() {
    const {user} = useAuthStore()

    useEffect(() => {
        if (!user) {
            redirect('/login')
        }
    })

    const profileLink = `/profile/${user?.username}`

    return <div className = "fixed top-0 left-0 h-full w-[264px] z-[1000] shadow-[2px_0_8px_rgba(0,0,0,0.2)] flex flex-col items-center gap-5">
    
        <div className = "flex bg-white w-[264px] h-[264px] rounded-[12px] flex-shrink-0">
            <div className="w-full h-full relative">
              <Image 
                src="https://i.pinimg.com/474x/20/4f/8e/204f8e853a9276e272ea2c69bd383bab.jpg"
                alt="Profile"
                fill
                className="object-cover rounded-[12px]"
                sizes="(max-width: 264px) 100vw, 264px"
              />
            </div>
        </div>
        <div className = "bg-white rounded-[12px] h-full w-[264px] flex flex-col items-center gap-2.5">
            <Link 
                    href="/board"
                    className="text-accent-blue text-xl hover:text-accent-purple transition-colors"
                >
                    HOME
            </Link>
            <Link 
                    href={profileLink}
                    className="text-accent-blue text-xl hover:text-accent-purple transition-colors"
                >
                    PROFILE
            </Link>
        </div>
    </div>
}

export default Sidebar;