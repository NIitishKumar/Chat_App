import Message from "./Message.tsx";

const Messages = ({ listMessages, lastMessageRef }: any) => {
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{
				listMessages && listMessages?.length && listMessages?.map((res: any, index: number) => {
					return <div key={index} ref={index === listMessages.length - 1 ? lastMessageRef : null}>
						<Message message={res} />
					</div>
				})
			}
		</div>
	);
};
export default Messages;