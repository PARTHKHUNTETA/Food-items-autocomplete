import { useCallback, useEffect, useState } from "react";

const useFetchData = (
  query: string,
  transformData: (data: any) => any,
  dataPromise: (query: string, signal: AbortSignal) => Promise<Response>,
  debounceWait: number,
  isAutoComplete: boolean
) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (
      query: string,
      transformData: (data: any) => any,
      signal: AbortSignal
    ) => {
      try {
        setLoading(true);
        const response = await dataPromise(query, signal);
        
        if (!response.ok) { 
            throw new Error(response.statusText);
        }

        const data = await response.json();
        setData(transformData(data));
        setLoading(false);
      } catch (err) {
    
        if (!signal.aborted) {
            setError(err as Error);
        }

        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    if (!query || !isAutoComplete) {
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    timeoutId = setTimeout(
      () => fetchData(query, transformData, signal),
      debounceWait
    );

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      controller.abort();
    };
  }, [fetchData, query, transformData]);

  return [data, setData, error, loading];
};

export default useFetchData;
