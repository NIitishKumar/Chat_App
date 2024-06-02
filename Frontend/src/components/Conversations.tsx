import { useState } from "react";
import useGetConversations from "../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {

	const [selectedConversation, setSelectedConversation] = useState<any>({});
	const { conversations, isLoading } = useGetConversations();
	console.log(conversations)

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{
				conversations?.map((res: any) => {
					return <Conversation selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} conversation={res} key={res._id} />
				})
			}
			{isLoading ? <span className='loading loading-spinner '></span> : "Login"}
		</div>
	);
};
export default Conversations;