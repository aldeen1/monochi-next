import React from 'react'
import { Metadata } from 'next'
import AuthContainer from '../components/AuthContainer'

export const metadata: Metadata = {
  title: 'Login | Monochi',
  description: 'Login to your Monochi account or create a new one',
  openGraph: {
    title: 'Login | Monochi',
    description: 'Login to your Monochi account or create a new one',
    type: 'website',
  },
}

const LoginPage = () => {
  return <AuthContainer />
}

export default LoginPage
