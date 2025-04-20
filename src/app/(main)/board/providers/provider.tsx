"use client"

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React, { useState } from 'react'

interface ProviderProps{
    children: React.ReactNode
}

const Provider = ({children}: ProviderProps) => {
    const [client] = useState(new QueryClient())
    return <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
}

export default Provider
