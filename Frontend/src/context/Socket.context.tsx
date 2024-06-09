import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../utils/helper";
import { io } from "socket.io-client";
import { MessagesContext } from "./Messages.context";

export const SocketContext:any = createContext(null);

export const SocketContextProvider = ({ children }:any) => {
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const {message, listMessages, setListMessages }:any = useContext(MessagesContext);

    useEffect(():any => {
        if(getCurrentUser()){
            const socket = io("https://chat-app-2lq8.onrender.com", {
                query: {
                    userId: getCurrentUser()?._id
                }
            });
            setSocket(socket);

            socket.on("getOnlineUsers", (users:any) => {
                console.log(users)
                setOnlineUsers(users);
            } )

            return () => socket.close()
        }else{
			if (socket) {
                    socket.close();
                    setSocket(null);
			}
        }
        // Listen for incoming messages
    }, []);

    useEffect(() => {
        if(!socket) return ;
        socket?.on("newMessage", (newMessage:any) => {
            listMessages.push(newMessage)
            if(!listMessages?.length) return;
            try {
                fetch(`https://chat-app-2lq8.onrender.com/api/message/${newMessage?.receiverId}?id=${JSON.stringify(newMessage?.senderId)}`).then(async (res:any) => {
                    setListMessages(await res.json())
                })
            } catch (error) {
                console.error(error)
            }
    
            // setListMessages([...listMessages, newMessage])
        })
        return () => socket?.off()
    }, [socket, message]);

    return <SocketContext.Provider value={{socket, onlineUsers}}>
        {children}
    </SocketContext.Provider>
}