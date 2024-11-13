import React, { useCallback, useContext, useEffect, useState } from 'react';

// Create context
export const LoadedContext = React.createContext<any>(null);

export const LoadedProvider = ({ children }: { children: React.ReactNode }) => {
    const [loadedItms, setLoadedItms] = useState(0);
    const [totalItms, setTotalItms] = useState(0);
    const [loadProgress, setLoadProgress] = useState(0);

    // Update loadProgress whenever loadedItms or totalItms changes
    useEffect(() => {
        if (totalItms === 0) {
            setLoadProgress(100);
        } else {
            setLoadProgress((loadedItms / totalItms) * 100);
        }
        console.log({ loadedItms, totalItms, loadProgress });
    }, [loadedItms, totalItms]);

    // Increment total items count
    const addToTotalImagesCount = useCallback((count: number) => {
        setTotalItms(prev => prev + count);
    }, []);

    // Increment loaded items count
    const markAsLoaded = useCallback((count: number) => {
        setLoadedItms(prev => prev + count);
    }, []);

    // Provide the state and functions to the context
    return (
        <LoadedContext.Provider value={{ loadProgress,loadedItms,totalItms, markAsLoaded, addToTotalImagesCount }}>
            {children}
        </LoadedContext.Provider>
    );
};

// Custom hook for using the context
export const useLoadState = () => useContext(LoadedContext);
