"use client";
import { TfiStatsUp } from "react-icons/tfi";

export default function Navigation() {
	return (
		<header className="container flex items-center justify-between">
			<div>
				<h1 className="text-3xl font-bold bg-accentColor text-white text-center hover:tracking-widest duration-300">
					onion
				</h1>
				<p className="text-[8px] uppercase tracking-widest">
					track your expenses
				</p>
			</div>
			<div className="flex items-center gap-3 md:gap-6">
				<TfiStatsUp className="text-2xl hover:-mt-2 hover:text-accentColor duration-300" />
				<div className="w-[40px] h-[40px] rounded-full border">
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
