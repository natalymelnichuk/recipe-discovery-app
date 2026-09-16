

import { useState, useEffect } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);


    useEffect(() => {
        if(!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err: unknown) {
                if(err instanceof Error) {
                    if(err.name !== 'AbortError') {
                        setError(err)
                    }
                } else {
                    setError(new Error(String(err)));
                }
                
            } finally {
                setLoading(false);
            }
        }    
        
        fetchData();

        return () => {
            controller.abort();
        }
    }, [url]);

    return { data, loading, error };    
}

export default useFetch;