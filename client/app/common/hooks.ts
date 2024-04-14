import { useState, useEffect } from 'react';

const useApi = (fetchUrl?: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url: string, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);

    try {
        const token = localStorage.getItem('token');
        const options: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'ngrok-skip-browser-warning': true
            },
        }
        if(method !== 'GET' && method !== 'DELETE') {
            options.body = JSON.stringify(body);
        }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, options)
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
      }

      const result = await response.json();
      if(method === 'GET') {
        setData(result);
      }
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(fetchUrl) {
        fetchData(fetchUrl);
    }
  }, [fetchUrl]);

  const postData = async (url: string, body: any) => {
    await fetchData(url, 'POST', body);
  };

  const putData = async (url: string, body: any) => {
    await fetchData(url, 'PUT', body);
  }

  const deleteData = async (url: string) => {
    await fetchData(url, 'DELETE');
  }

  const refetch = (url: string) => {
    fetchData(url);
  }

  return { data, loading, error, postData, putData, deleteData, refetch };
};

export default useApi;
