'use client'

import React from "react";
import { toast, Toaster, ToastOptions } from "react-hot-toast";
import { GoBell } from "react-icons/go";

export default function Toast(){
    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerStyle={{
                bottom: 40,
                right: 40,
                fontSize: '16px'
            }}
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#ffffff',
                    color: '#334155',
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                },
            }}
        />
    )
}

const DEFAULT_TOAST: ToastOptions = {
    style: {
        background: '#ffffff',
        color: '#334155',
        padding: '16px',
        borderRadius: '8px'
    },
    icon: <GoBell className="text-blue-500" />,
    className: 'min-w-[200px]',
    position: 'bottom-right',
    duration: 3000,
}

export const SUCCESS_TOAST: ToastOptions = {
    ...DEFAULT_TOAST,
    style: {
        ...DEFAULT_TOAST.style,
        border: '2px solid #22c55e'
    },
    icon: <GoBell className="text-green-500" />
}

export const DANGER_TOAST: ToastOptions = {
    ...DEFAULT_TOAST,
    style: {
        ...DEFAULT_TOAST.style,
        border: '2px solid #ef4444'
    },
    icon: <GoBell className="text-red-500" />
}

export const showToast = (message: string, options: ToastOptions = DEFAULT_TOAST) => {
    return toast(message, {
        ...DEFAULT_TOAST,
        ...options,
    });
}