"use client";
import { useState, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export const ServiceSearch = ({ placeholder = "Search services...", onSearch, className = "" }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={`relative w-full max-w-md mx-auto mb-8 ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};