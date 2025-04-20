'use client'

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SearchContext } from '@/app/(main)/layout';
import HeartIcon from '@/assets/Post-actions/heart.svg';
import HeartFullIcon from '@/assets/Post-actions/full-heart.svg';

interface SearchBarProps {
    onSearch: (query: string, isLiked: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLiked, setIsLiked] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        onSearch(query, isLiked);
    };

    const toggleLiked = () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        onSearch(searchQuery, newIsLiked);
    };

    return (
        <Suspense fallback={<div className="flex items-center justify-center w-full max-w-xl mx-auto mb-6 gap-4 h-10 bg-gray-200 animate-pulse rounded-full"></div>}>
            <div className="flex items-center justify-center w-full max-w-xl mx-auto mb-6 gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-accent-blue"
                    />
                </div>
                <button
                    onClick={toggleLiked}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    {isLiked ? (
                        <HeartFullIcon width={24} height={24} className="text-red-500" />
                    ) : (
                        <HeartIcon width={24} height={24} className="text-gray-600" />
                    )}
                </button>
            </div>
        </Suspense>
    );
};

export default SearchBar;