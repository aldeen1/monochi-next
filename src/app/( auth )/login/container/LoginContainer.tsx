'use client'

import React from 'react'
import {useForm, FormProvider} from 'react-hook-form'

import { useLogin, LoginForm } from '@/lib/api/auth'
import useAuthStore from '@/store/useAuthStore'

const LoginContainer = () => {
    const { isAuthed } = useAuthStore()

    const methods = useForm<LoginForm>({
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onChange'
    })

    const {handleLogin, isPending} = useLogin()

    const onSubmit = async (data: LoginForm) => {
        await handleLogin(data)
    }

    return (
        <FormProvider {...methods}>
            <h2 className = "mb-4 text-9xl">
                Mono<span className = "text-accent-purple">chi</span>
            </h2>
            <form onSubmit={methods.handleSubmit(onSubmit)}
                className = "flex flex-col gap-4"
            >
                <div className="flex flex-col">
                    <label htmlFor="Username">Username</label>
                    <input
                        className="p-2 border border-gray-300 rounded"
                        id='username'
                        type='text'
                        {...methods.register('username',{
                            required: 'Username is required'
                        })}
                        disabled={isPending}
                    />
                    {methods.formState.errors.username && (
                        <span>{methods.formState.errors.username.message}</span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="Password">Password</label>
                    <input
                        className="p-2 border border-gray-300 rounded"
                        id='password'
                        type='password'
                        {...methods.register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password should be 8 or longer'
                            }
                        })}
                        disabled={isPending}
                    />
                    {methods.formState.errors.password && (
                        <span>{methods.formState.errors.password.message}</span>
                    )}
                </div>

                <button
                    className = "p-2.5 bg-accent-blue text-white border-none rounded cursor-pointer hover:bg-blue-700"
                    type='submit'
                    disabled={isPending || !methods.formState.isValid}
                >
                    {isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </FormProvider>
    )
}

export default LoginContainer
