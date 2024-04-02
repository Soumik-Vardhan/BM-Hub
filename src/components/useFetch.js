import { useState, useEffect } from "react";

export const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [apiError, setApiError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then((response) => response?.json())
            .then((data) => {
                setData(data);
                setIsLoading(false)
            })
            .catch((error) => {
                setApiError(error)
                setIsLoading(false)
            });
    }, [url])

    return { isLoading, data, apiError }

}