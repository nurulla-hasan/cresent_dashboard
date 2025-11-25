import { useState, useEffect, useMemo } from "react";
import useDebounce from "./usedebounce";

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

type ApiResponse<T> = {
  data: T[];
  pagination: Pagination;
  success: boolean;
  message: string;
};

type QueryParams = {
  page?: number;
  searchTerm?: string;
  [key: string]: any;
};

type QueryResult<T> = {
  data?: ApiResponse<T>;
  isLoading: boolean;
  isError: boolean;
};

type UseSmartFetchReturn<T, P extends QueryParams> = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  data: T[];
  pagination: Pagination;
  isLoading: boolean;
  isError: boolean;
  filterParams: Partial<P>;
  setFilterParams: (params: Partial<P>) => void;
};

const useSmartFetchHook = <T, P extends QueryParams>(
  useQuery: (params: P) => QueryResult<T>,
  options: Partial<P> = {},
  initialParams: Partial<P> = {}
): UseSmartFetchReturn<T, P> => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterParams, setFilterParams] = useState<Partial<P>>(initialParams);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedFilterParams = useDebounce(filterParams, 300);

  const queryParams = useMemo(
    () =>
      ({
        page: currentPage,
        searchTerm: debouncedSearchTerm,
        ...options,
        ...debouncedFilterParams,
      } as P),
    [currentPage, debouncedSearchTerm, debouncedFilterParams, options]
  );

  const { data, isLoading, isError } = useQuery(queryParams);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, JSON.stringify(debouncedFilterParams)]);

  // Extract data from API response
  const list = data?.data ?? [];
  
  const meta = data?.pagination ?? {
    total: 0,
    page: currentPage,
    limit: 10,
    totalPages: 0,
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    data: list as any[],
    pagination: meta as any,
    isLoading,
    isError,
    filterParams,
    setFilterParams,
  };
};

export default useSmartFetchHook;
