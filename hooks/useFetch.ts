//this will handle all the logic of fetching through fetch functions.
//so rather than handling use effects and loading states in main components
//we will call this hook with our fetch function.

import { useCallback, useEffect, useRef, useState } from "react";

type UseFetchType<T> = {
  fetchFunction: () => Promise<T>;
  autoFetch: boolean;
};

const useFetch = <T>({ fetchFunction, autoFetch = true }: UseFetchType<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<Error | null>(null);
  const fetchFunctionRef = useRef(fetchFunction);

  // Update ref when fetchFunction changes
  useEffect(() => {
    fetchFunctionRef.current = fetchFunction;
  }, [fetchFunction]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunctionRef.current();

      setData(result);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;
