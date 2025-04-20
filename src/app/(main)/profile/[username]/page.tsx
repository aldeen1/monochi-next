import React from 'react'
import { Metadata } from 'next'
import ProfileContainer from '../container/ProfileContainer'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `${resolvedParams.username} | Monochi`,
    description: `View ${resolvedParams.username}'s profile on Monochi`,
    openGraph: {
      title: `${resolvedParams.username} | Monochi`,
      description: `View ${resolvedParams.username}'s profile on Monochi`,
      type: 'website',
    },
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const resolvedParams = await params
  return (
    <div className='w-full h-full'>
      <ProfileContainer username={resolvedParams.username} />
    </div>
  )
}
