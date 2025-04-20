'use client'

import React, { Suspense } from 'react'
import BoardContainer from '@/app/(main)/board/container/BoardContainer'

export default function BoardPage() {
  console.log('typeof BoardContainer', typeof BoardContainer)
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoardContainer />
    </Suspense>
  )
}
