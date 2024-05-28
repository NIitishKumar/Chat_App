import { createContext, useContext, useState } from "react";

export const AuthContext:any = createContext(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
  };
  
export const AuthContextProvider =  ({ children }:any) => {
    const [authUser, setAuthUser] = useState<any>(JSON.parse(localStorage.getItem("chat_user") as string) || null);

    return <AuthContext.Provider value = {{authUser, setAuthUser}}> {children} </AuthContext.Provider>

}