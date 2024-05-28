import { useState } from 'react'
import { toast } from 'react-toastify';

function useLogin() {

    const [isLoading, setIsLoading] = useState<any>(false);

    const login = async (userName:string, password:string) => {
        const success = handleInputError({userName, password})
        if (!success) return;

        setIsLoading(true)
        try {
            const data:any = await fetch("api/auth/login", {
                method:"POST",
                 body : JSON.stringify({userName, password}),
                 headers: {"Content-Type" : "application/json"}
            })
            if(data.error){
                throw new Error(data.error)  
            }
        } catch (error:any) {
            toast.error(error.message);
        } finally{
            setIsLoading(false)
        }
    }

  return {login, isLoading}


  function handleInputError({ userName, password}:any) {
    if (!userName || !password ){
        toast.error("Please Enter all fields")
        return false
    }

    return true;
}
}

export default useLogin