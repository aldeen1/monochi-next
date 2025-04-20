'use client'
import React, {useEffect} from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { useRegister, RegisterForm } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

const RegisterContainer = () => {
  const router = useRouter()
  const methods = useForm<RegisterForm>({
    defaultValues: {
      name: '',
      username: '',
      password: ''
    },
    mode: 'onChange'
  })
  
  const {handleRegister, isPending, isSuccess} = useRegister()

  const onSubmit = async (data: RegisterForm) => {
    await handleRegister(data)
  }

  useEffect(() => {
    if(isSuccess){
      router.push('/login')
    }
  })

  return (
    <FormProvider {...methods}>
      <h2 className="mb-1.5 text-9xl">
        Mono<span className="text-accent-purple">chi</span>
      </h2>
      <form onSubmit={methods.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
          className="p-2 border border-gray-300 rounded"
          id='name'
          type='text'
          {...methods.register('name',{
            required: 'Name is required',
            minLength: {
              value: 1,
              message: 'Name must be longer than one character'
            }
          })}
          />
          {methods.formState.errors.name && (
            <span>{methods.formState.errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 border border-gray-300 rounded"
            id='username'
            type='text'
            {...methods.register('username', {
              required: 'Username is required',
              minLength: {
                value: 1,
                message: 'Username must be one character or longer'
              }
            })}
          />
          {methods.formState.errors.username && (
            <span>{methods.formState.errors.username.message}</span>
          )}
        </div>

        <div className = "flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 border border-gray-300 rounded"
            id='password'
            type='password'
            {...methods.register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be 8 characters or longer'
              }
            })}
          />
          {methods.formState.errors.password && (
            <span>{methods.formState.errors.password.message}</span>
          )}
        </div>

        <button
          className = "p-2.5 bg-accent-blue text-white border-none rounded cursor-pointer hover:bg-blue-700"
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </FormProvider>
  )
}

export default RegisterContainer
