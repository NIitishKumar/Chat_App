import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function useLogout() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {setAuthUser}:any  = useAuthContext();

    const logout = async () => {
        setIsLoading(true)
        try {
            const res = await  fetch("api/auth/logout", {
                method:"POST",
                headers:{ "Content-Type" : "application/json" }
            })

            const data = await res.json()
            localStorage.removeItem("chat_app")
            setAuthUser(null)
            if(data.error){
                throw new Error(data.error);
            }
        } catch (error) {
            toast.error("error.message")
        } finally {
            setIsLoading(false)
        }
    }
  return {isLoading, logout}
}

export default useLogout