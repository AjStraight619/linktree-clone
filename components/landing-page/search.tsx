"use client";
import { useSearch } from "@/hooks/useSearch";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";

const Search = () => {
  const { handleSearch, searchParams } = useSearch("search");

  return (
    <div className="relative md:w-1/2 w-full px-2 mt-8 group">
      <Input
        className="text-muted-foreground pl-8 w-full"
        type="text"
        placeholder="Search for a link tree..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <SearchIcon
        size={20}
        className="absolute opacity-50 left-3 top-1/2 -translate-y-1/2 transition-opacity duration-100 group-focus-within:opacity-100"
      />
    </div>
  );
};

export default Search;
