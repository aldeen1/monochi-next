import React from 'react'
import { Metadata } from 'next'
import ProfileContainer from '../container/ProfileContainer'

interface Props {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username}'s Profile | Monochi`,
    description: `View ${params.username}'s profile and posts on Monochi`,
    openGraph: {
      title: `${params.username}'s Profile | Monochi`,
      description: `View ${params.username}'s profile and posts on Monochi`,
      type: 'website',
    },
  }
}

const ProfilePage = ({ params }: Props) => {
  const currentUsername = params.username as string

  if(!currentUsername){
    return <div>Loading...</div>
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
        <ProfileContainer username={currentUsername}/>
    </div>
  )
}

export default ProfilePage
