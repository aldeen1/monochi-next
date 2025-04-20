'use client'

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import api from "@/lib/api/index"
import useAuthStore from "@/store/useAuthStore"
import useMutationToast from "@/hooks/useMutationToast"
import { setToken } from "../cookies"
import { showToast, SUCCESS_TOAST } from "@/app/components/Toasts/Toast"
import { ApiResponse } from "@/types/api/api"
import { User } from "@/types/user"

export type LoginForm = {
    username: string,
    password: string   
}

const authApi = {
    login: (data: LoginForm) => api.post('api/user/login', data),
    register: (data: RegisterForm) => api.post('api/user/register', data),
    checkUsername: (username: string) => api.post('api/user/check-username', username),
    getMe: () => api.get<ApiResponse<User>>('api/user/me')
}

export const useLogin = () => {
    const router = useRouter()
    const { login } = useAuthStore()
    const {
        mutateAsync: handleLogin,
        isPending,
        isSuccess
    } = useMutationToast<User, LoginForm>(
        useMutation({
            mutationFn: async (data: LoginForm) => {
                const response = await authApi.login(data)
                const token = response.data.data.token
                setToken(token)

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                const user = await authApi.getMe()
                if(!user?.data.data){
                    throw new Error('sesi login tidak valid')
                }

                const userData = {
                    ...user.data.data,
                    token
                }

                login(userData)
                return response.data
            },
            onSuccess: () => {
                showToast('Akun berhasil login', SUCCESS_TOAST)
                router.push('/board')
            }
        })
    )

    return {handleLogin, isPending, isSuccess}
}

export type RegisterForm = {
    name: string,
    username: string,
    password: string
}

export const useRegister = () => {
    const router = useRouter()
    const {  
        mutateAsync: handleRegister,
        isPending,
        isSuccess
      } = useMutationToast<User, RegisterForm>(
        useMutation({
            mutationFn: async (data:RegisterForm) => await authApi.register(data),
            onSuccess: () => {
                showToast('Register successful', SUCCESS_TOAST)
                router.push('/login')
            }
        })
    )

    return {handleRegister, isPending, isSuccess}
}

export const checkUsername = () => {
    const {
        mutateAsync: handleCheckUsername,
        isPending,
        isSuccess
     } = useMutationToast<string, string>(
        useMutation({
            mutationFn: async (username: string) => authApi.checkUsername(username),
            onSuccess: () => {
                showToast("Username Available", SUCCESS_TOAST)
            }
        })
    )

    return { handleCheckUsername, isPending, isSuccess }
}

export const getMe = () => {
    useMutation({
        mutationFn: async () => {
            const response = await authApi.getMe()
            return response.data.data
        }
    })
}