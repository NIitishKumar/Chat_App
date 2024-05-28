import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function useGetConversations() {

    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState<any>([])

    useEffect(() => {
        const getConversations = async () => {
            try {
                setIsLoading(true)
                const data = await fetch("api/users")
                const res = await data.json();
                if(res.error) throw new Error(res.error);
                setConversations(res.data)
            } catch (error:any) {
                toast.error(error.message)
            } finally{
                setIsLoading(false)
            }
        }
        getConversations();
    }, [])



  return {isLoading, conversations}
}

export default useGetConversations