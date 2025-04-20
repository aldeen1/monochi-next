import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Monochi',
  description: 'Welcome to Monochi - Share your thoughts and connect with others',
  openGraph: {
    title: 'Monochi',
    description: 'Welcome to Monochi - Share your thoughts and connect with others',
    type: 'website',
  },
}

export default function Page(){
  redirect('/board')
}
