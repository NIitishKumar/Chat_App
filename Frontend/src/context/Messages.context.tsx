import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/helper";
import { SelectedUserContext } from "./SelectedUser";

export const MessagesContext:any = createContext(null);

const MessagesContextProvider = ({children}:any) => {

    const [listMessages, setListMessages] = useState([]);
    const [message, setMessage] = useState<string>("")


    const { selectedUser }:any = useContext(SelectedUserContext);        

	const getMessages = async () => {
        if(!getCurrentUser()?._id || !selectedUser?._id) return
		try {
			const data = await fetch(`http://localhost:8999/api/message/${getCurrentUser()?._id}?id=${JSON.stringify(selectedUser?._id)}`)
			const list = await data.json();
			setListMessages(list)
		} catch (error) {
			console.error(error)
		}
	}    

	useEffect(() => {
        if(selectedUser) getMessages();
	}, [selectedUser])

    useEffect(() => {
        if(!message) getMessages()
    }, [message])

    const value:any = {listMessages, setListMessages, message, setMessage, getMessages }
    return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>
};

export default MessagesContextProvider;