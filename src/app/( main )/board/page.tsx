import React from 'react'
import { Metadata } from 'next'
import BoardContainer from './container/BoardContainer'

export const metadata: Metadata = {
  title: 'Board | Monochi',
  description: 'View and share posts on Monochi',
  openGraph: {
    title: 'Board | Monochi',
    description: 'View and share posts on Monochi',
    type: 'website',
  },
}

const BoardPage = () => {
  return (
    <BoardContainer />
  )
}

export default BoardPage
