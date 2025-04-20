import React from 'react'
import { Metadata } from 'next'
import ReplyContainer from './container/ReplyContainer'

interface Props {
  params: {
    postId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Post ${params.postId} | Monochi`,
    description: `View and reply to post ${params.postId} on Monochi`,
    openGraph: {
      title: `Post ${params.postId} | Monochi`,
      description: `View and reply to post ${params.postId} on Monochi`,
      type: 'website',
    },
  }
}

const PostPage = ({ params }: Props) => {
  return (
    <div className='w-full h-full'>
      <ReplyContainer postId={Number(params.postId)} />
    </div>
  )
}

export default PostPage
