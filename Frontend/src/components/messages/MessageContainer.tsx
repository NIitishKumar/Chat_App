import { useContext, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { SelectedUserContext } from "../../context/SelectedUser";
import { getCurrentUser } from "../../utils/helper";
import { toast } from "react-toastify";
import { MessagesContext } from "../../context/Messages.context";



const MessageContainer = () => {
    
    const { selectedUser }:any = useContext(SelectedUserContext);        

    const NoChatSelected = () => {
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                    <p>Welcome 👋 {"authUser.fullName"} ❄</p>
                    <p>Select a chat to start messaging</p>
                    <div className="text-3xl md:text-6xl text-center">
                        <TiMessages />
                    </div>
                </div>
            </div>
        );
    };

    const { listMessages, message, setMessage, getMessages }:any = useContext(MessagesContext);

    const messageContainer:any = useRef(null);
    const lastMessageRef:any = useRef(null);
  
    useEffect(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, [listMessages]);


	const handleSendMessage = async (e: any) => {
		e.preventDefault();

		if(!message) {
			toast.error("Please Enter Message.");
			return;
		}
		let payload:any = {
			senderId: getCurrentUser()?._id,
			receiverId: selectedUser?._id,
			message
		}
		try {
			const response = await fetch(`http://localhost:8999/api/message/send/${getCurrentUser()?._id}`, {
				method:"POST",
				headers: {
					"Content-Type":"application/json",
				},
				body:JSON.stringify(payload)
			});      
			response.json().then((res:any) => {
                console.log(res)
                getMessages()
            })
			setMessage("")
			
			
		} catch (error) {
			console.log(error);
		}
	}

    
    return (
        <div className='md:min-w-[450px] flex flex-col scroll-auto scroll-smooth focus:scroll-auto' ref={messageContainer}>
            {!selectedUser ?
                <NoChatSelected /> :
                <>
                    {/* Header */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedUser.fullName}</span>
                    </div>
                    <Messages listMessages={listMessages} lastMessageRef={lastMessageRef} />
                    <MessageInput handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} />
                </>}
        </div>
    );
};
export default MessageContainer;