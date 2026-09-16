
import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [data, setData] = useState<T>(() => {
        const dataValue = localStorage.getItem(key);

        if (!dataValue) {
            return initialValue;
        } else {
            const response = JSON.parse(dataValue);
            return response;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data))
    }, [data, key])

    return [data, setData] as const;

}

export default useLocalStorage;