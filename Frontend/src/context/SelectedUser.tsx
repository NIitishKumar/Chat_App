import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedUserContextType {
    selectedUser: any;
    setSelectedUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create context with a default value
export const SelectedUserContext:any = createContext<SelectedUserContextType | undefined>(undefined);

// Custom hook for consuming the context
export const useSelectedUserContext = () => {
    const context = useContext(SelectedUserContext);
    if (context === undefined) {
        throw new Error('useSelectedUserContext must be used within a SelectedUserProvider');
    }
    return context;
}

// Provider component
interface SelectedUserProviderProps {
    children: ReactNode;
}

export const SelectedUserProvider = ({ children }: SelectedUserProviderProps) => {
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const value = { selectedUser, setSelectedUser };

    return (
        <SelectedUserContext.Provider value={value}>
            {children}
        </SelectedUserContext.Provider>
    );
}
