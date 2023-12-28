"use client";
import { TfiStatsUp } from "react-icons/tfi";

export default function Home() {
	return (
		<header className="container max-w-screen-md mx-auto flex items-center justify-between">
			<div>
				<h1 className="text-3xl font-bold bg-red-600 text-white text-center hover:tracking-widest duration-300">
					onion
				</h1>
				<p className="text-xs">track your expenses</p>
			</div>
			<div className="flex items-center gap-3 md:gap-6">
				<TfiStatsUp className="text-2xl" />
				<div className="w-[40px] h-[40px] rounded-full border border-red-600">
					<img
						className="w-full h-full object-cover rounded-full"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREO17hg6KvLlweeZWN0LCEdi-OXM9qGpbQ9w&usqp=CAU"
						alt="user profile"
					/>
				</div>
			</div>
		</header>
	);
}
