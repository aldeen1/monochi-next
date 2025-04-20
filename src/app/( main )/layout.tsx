'use client'

import Sidebar from "@/app/components/Navbar/sidebar";
import '../globals.css'
import ProfileButton from "../components/profile-button/profile-button";
import SearchBar from "../components/searchbar/searchbar";
import { createContext, useContext, useState } from "react";

export const SearchContext = createContext<{
  searchQuery: string;
  showLikedOnly: boolean;
}>({ searchQuery: "", showLikedOnly: false });

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  const handleSearch = (query: string, isLiked: boolean) => {
    setSearchQuery(query);
    setShowLikedOnly(isLiked);
  };

  return (
    <SearchContext.Provider value={{ searchQuery, showLikedOnly }}>
      <div className="flex h-screen w-full bg-[#B4BEC9]">
        <div className="fixed w-[284px] h-full bg-accent-blue">
          <Sidebar />
        </div>
        <div className="w-[calc(100%-284px)] h-full ml-[284px] flex flex-col">
          <div className="w-full p-4 flex justify-between items-center">
            <div className="w-[472px] mx-auto">
              <SearchBar onSearch={handleSearch} />            
            </div>
            <div className="fixed top-4 right-4">
              <ProfileButton/>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}