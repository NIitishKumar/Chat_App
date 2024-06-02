import { useContext } from "react";
import { SelectedUserContext } from "../context/SelectedUser";
import { SocketContext } from "../context/Socket.context";

const Conversation = ({ conversation }: any) => {

	const { selectedUser, setSelectedUser }:any = useContext(SelectedUserContext);
	const { onlineUsers }:any = useContext(SocketContext);


	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${conversation._id == selectedUser?._id ? "bg-sky-500" : ""}
			`}
				onClick={() => setSelectedUser(conversation)}>
				<div className={`avatar ${onlineUsers.includes(conversation._id) ? "online" : null}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.userName}</p>
						<span className='text-xl'>🎃</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;