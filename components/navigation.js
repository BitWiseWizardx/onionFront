"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiUserCircleLight } from "react-icons/pi";
import axios from "axios";
export default function Navigation() {
	const router = useRouter();
	const [showLoginModel, setShowLoginModel] = useState(false);
	const [authUser, setAuthUser] = useState();

	const token = localStorage.getItem("token");

	useEffect(() => {
		getAuthUser(token);
	}, []);

	const getAuthUser = async () => {
		const user = await axios.get("http://localhost:4001/auth-user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setAuthUser(user.data);
		console.log(user.data);
	};

	return (
		<header className="relative container max-w-screen-md mx-auto flex items-center justify-between">
			<div>
				<h1 className="text-3xl font-bold bg-accentColor text-white text-center hover:tracking-widest duration-300">
					onion
				</h1>
				<p className="text-[8px] uppercase tracking-widest">
					track your expenses
				</p>
			</div>
			<div className="flex items-center gap-3 md:gap-6">
				<div
					onClick={() => setShowLoginModel(!showLoginModel)}
					className="text-3xl"
				>
					<PiUserCircleLight />
				</div>
			</div>

			{showLoginModel ? (
				<div className="absolute right-0 -bottom-28 md:-bottom-24 z-50 bg-white/80 backdrop-blur-md text-bgColor rounded-lg flex flex-col items-center gap-4 p-5">
					<div>
						<h1 className="text-2xl font-bold text-center pb-2">
							{authUser.name}
						</h1>
						<p className="text-sm">{authUser.email}</p>
					</div>
					<button
						onClick={() => {
							localStorage.removeItem("token");
							router.push("/register");
							setShowLoginModel(!showLoginModel);
						}}
						className="px-3 py-1.5 rounded-md bg-bgColor text-white"
					>
						Logout
					</button>
				</div>
			) : null}
		</header>
	);
}
