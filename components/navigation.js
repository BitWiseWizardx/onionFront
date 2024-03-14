"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
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
					className="w-[38px] h-[38px] rounded-full border-2"
				>
					<img
						className="w-full h-full object-cover rounded-full"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzewQ_JGAS5FVP6PWfoTSzZ9TnNJWuMJFfLg&usqp=CAU"
						alt="user profile"
					/>
				</div>
			</div>

			{showLoginModel && (
				<ul className="absolute right-0 -bottom-10 bg-white/80 text-bgColor rounded-lg border-2 border-bgColor gap-6">
					<li className="border-b border-bgColor px-6 py-2 hover:bg-white rounded-t-lg">
						<Link href="/">Profile</Link>
					</li>
					<li className="px-6 py-2 hover:bg-white rounded-b-lg">
						<button
							onClick={() => {
								localStorage.removeItem("token");
								router.push("/register");
								setShowLoginModel(!showLoginModel);
							}}
						>
							Log Out
						</button>
					</li>
				</ul>
			)}
		</header>
	);
}
