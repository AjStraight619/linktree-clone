"use client";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full px-2 mt-4 group">
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
