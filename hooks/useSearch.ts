import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

/**
 * Custom hook for handling search functionality.
 * @param searchParam - The name of the search parameter.
 * @param wait - The debounce wait time in milliseconds (default: 300).
 * @returns A debounced callback function for handling search.
 */
export const useSearch = (searchParam: string, wait = 300) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  /**
   * Handles the search functionality with debouncing.
   * @param term - The search term.
   */
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(`${searchParam}`, term);
    } else {
      params.delete(`${searchParam}`);
    }
    replace(`${pathname}?${params.toString()}`);
  }, wait);

  return {
    handleSearch,
    searchParams,
  };
};
