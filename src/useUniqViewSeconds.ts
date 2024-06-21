import { useEffect, useState } from 'react';

interface ApiResponse {
  id: string;
  view_seconds?: number[][];
  numbers?: number[][];
}

const useUniqViewSeconds = (url: string) => {
  const [data, setData] = useState<number[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong with the request!');
        }

        const result: ApiResponse = await response.json();
        const uniqueSortedSeconds = getUniqueSortedSeconds(result);

        setData(uniqueSortedSeconds);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const getUniqueSortedSeconds = (response: ApiResponse): number[] => {
  const viewSeconds = response.view_seconds ?? response.numbers ?? [];
  return Array.from(new Set(viewSeconds.flat(Infinity) as number[])).sort((a, b) => a - b);
};

export default useUniqViewSeconds;
