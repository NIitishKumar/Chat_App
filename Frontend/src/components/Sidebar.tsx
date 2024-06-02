import { getCurrentUser } from "../utils/helper";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col overflow-auto'>
			<div className="flex my-3 ml-2 font-mono">
				<h1 className="text-white">{getCurrentUser()?.fullName}</h1>
			</div>
			<SearchInput />
			<div className='divider px-3'>
            </div>
			<Conversations />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;