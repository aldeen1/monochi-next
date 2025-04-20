import React from 'react'
import { Metadata } from 'next'
import ReplyContainer from './container/ReplyContainer'

interface PageProps {
  params: Promise<{ postId: string }>
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Post ${resolvedParams.postId} | Monochi`,
    description: `View and reply to post ${resolvedParams.postId} on Monochi`,
    openGraph: {
      title: `Post ${resolvedParams.postId} | Monochi`,
      description: `View and reply to post ${resolvedParams.postId} on Monochi`,
      type: 'website',
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params
  return (
    <div className='w-full h-full'>
      <ReplyContainer postId={Number(resolvedParams.postId)} />
    </div>
  )
}
