import { createContext, useContext } from 'react';
import wordStore from "./WordStore";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    return (
        <StoreContext.Provider value={{ wordStore }}>
        {children}
        </StoreContext.Provider>
    );
};

export const useStores = () => {
    const context = useContext(StoreContext);
    if (!context) {
    throw new Error('useStores must be used within a StoreProvider');
    }
    return context;
};
