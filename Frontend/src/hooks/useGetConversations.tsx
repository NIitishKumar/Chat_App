 import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function useGetConversations() {

    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState<any>([])
    const getConversations = async () => {
        try {
            setIsLoading(true)
            const data = await fetch("http://localhost:8999/api/users")
            const res = await data.json();
            if(res.error) throw new Error(res.error);
            let temp = res.filter((res:any) => res._id != JSON.parse(localStorage.getItem("currentUser") || "")?._id)
            setConversations(temp)
        } catch (error:any) {
            console.log(error);
            
            toast.error(error.message)
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getConversations();
    }, [])



  return {isLoading, conversations}
}

export default useGetConversations