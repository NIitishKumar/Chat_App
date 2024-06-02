import { useState } from 'react'
import { toast } from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';

const  useSignup = () => {

    const [isLoading, setisLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({fullName, username, password, confirmPassword, gender}:any) => {
        const success = handleInputError({fullName, username, password, confirmPassword, gender})
        if (!success) return;
        setisLoading(true)
        try {
            const data = await fetch("http://localhost:8999/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body : JSON.stringify({
                    fullName,
                    userName : username,
                    password,
                    confirmPassword, 
                    gender
                }),
            });

            const res = await data.json();
            setAuthUser(res)
            localStorage.setItem("currentUser", JSON.stringify(res))
        } catch (error:any) {
            toast.error(error.message)
        } finally{
            setisLoading(false)
        }
    }   
    return { isLoading, signup }

    function handleInputError({fullName, username, password, confirmPassword, gender}:any) {
        if (!fullName || !username || !password || !confirmPassword || !gender ){
            toast.error("Please Enter all fields")
            return false
        }

        if (password !== confirmPassword) {
            toast.error("Password mismatch")
            return false
        }

        return true;
    }

}

export default useSignup;