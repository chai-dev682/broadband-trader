'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseGetParams {
  [key: string]: any;
}

interface UseGetResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  get: () => Promise<void>;
}

const useGet = <T>(
  url: string,
  isSend: boolean = true,
  params: UseGetParams = {}
): UseGetResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const get = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(params).toString();
      const response = await axios.get(`${url}?${queryParams}`);
      const result = response.data;
      setData(result as T);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSend) get();
  }, []);

  return { data, loading, error, get };
};

// Define a type for the hook's response
interface UsePostResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  post: (payload: any) => Promise<void>;
}

// Define the hook
const usePost = <T>(url: string): UsePostResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (payload: any): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      const result = response.data;
      setData(result as T);
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, post };
};

// export default usePost;

export { useGet, usePost };
