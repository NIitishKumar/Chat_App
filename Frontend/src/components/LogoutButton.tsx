import { BiLogOut } from "react-icons/bi";
import useLogout from "../hooks/useLogout.tsx";

const LogoutButton = () => {
	const { isLoading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!isLoading ? (
				<div className='w-6 h-6 text-white cursor-pointer' onClick={logout} >
					<BiLogOut />
				</div>
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;