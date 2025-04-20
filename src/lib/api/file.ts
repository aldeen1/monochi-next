'use client'

import api from "@/lib/api/index";
import { useQuery } from "@tanstack/react-query";

export const useGetStaticFile = (path: string) => {
    return useQuery({
        queryKey: ['profileImage', path],
        queryFn: async () => {
            const response = await api.get(`assets/${path}`, {
                responseType: 'blob'
            })
            return URL.createObjectURL(response.data)
        }
        
    })
}