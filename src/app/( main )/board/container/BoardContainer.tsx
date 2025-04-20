'use client'
import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from "react-intersection-observer"
import { useGetAllPost } from '@/lib/api/post'
import PostList from '../components/posts/PostList'
import { SearchContext } from '@/app/( main )/layout'
import { useContext } from 'react'

const BoardContainer = () => {
    const { searchQuery, showLikedOnly } = useContext(SearchContext)
    const {ref, inView} = useInView({
        threshold: 0,
        rootMargin: '100px'
    })

    const {
        data,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts', searchQuery],
        queryFn: ({ pageParam = 1 }) => useGetAllPost(pageParam, searchQuery),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (!lastPage.meta) return undefined
            const nextPage = lastPage.meta.page + 1
            return nextPage <= lastPage.meta.max_page ? nextPage : undefined
        }
    })

    const allVisiblePosts = data?.pages.flatMap(page => 
        page.data?.filter(post => {
            if (post.is_deleted) return false;
            if (showLikedOnly && post.total_likes === 0) return false;
            if (searchQuery && !post.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        }) ?? []
    )

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        } 
    }, [inView, hasNextPage, fetchNextPage])

    return (
        <div className='mt-5 mb-5 p-2.5 w-full h-full overflow-y-auto box-border'>
            <PostList 
                posts={allVisiblePosts ?? []}
                lastPostRef={ref}
                showCreateButton={true}
                createButtonPath="/board/post/create"
            />
        </div>
    )
}

export default BoardContainer 