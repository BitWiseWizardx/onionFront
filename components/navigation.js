"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
export default function Navigation({ authUser }) {
	const router = useRouter();
	const [showLoginModel, setShowLoginModel] = useState(false);

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
							router.push("/login");
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
