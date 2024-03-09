"use client";
import React, { useRef } from "react";
import Link from "next/link";
import axios from "axios";

export default function LoginForm() {
	const emailRef = useRef();
	const PassowrdRef = useRef();

	const getRegisterUsers = async (e) => {
		e.preventDefault();
		const getUsers = await axios.post("http://localhost:4001/user/register", {
			email: emailRef.current.value,
			password: PassowrdRef.current.value,
		});
		console.log(getUsers);
	};
	const InputData = [
		{
			id: "email",
			for: "email",
			label: "Email",
			name: "email",
			ref: emailRef,
			inputType: "email",
			placeholder: "Email",
		},
		{
			id: "password",
			for: "password",
			label: "Password",
			name: "password",
			ref: PassowrdRef,
			inputType: "password",
			placeholder: "Password",
		},
	];

	return (
		<div className="container max-w-screen-sm mx-auto flex flex-col items-center gap-10 bg-grayColor/20 backdrop-blur-md rounded-lg">
			<h1 className="text-5xl font-bold">Login</h1>
			<form onSubmit={getRegisterUsers} className=" w-full space-y-5 px-10">
				{InputData.map((input, index) => (
					<div key={index} className="relative">
						<input
							autocomplete="off"
							id={input.id}
							type={input.inputType}
							ref={input.ref}
							name={input.name}
							placeholder={input.placeholder}
							required
							className="peer placeholder-transparent h-10 w-full bg-transparent border-b-2 border-white focus:outline-none focus:borer-rose-600 text-lg"
						/>
						<label
							for={input.for}
							className="absolute left-0 -top-3.5 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 
							peer-focus:text-white/70 peer-focus:text-xs"
						>
							{input.label}
						</label>
					</div>
				))}
				<div className="flex justify-end">
					<p className="text-sm hover:underline">Forget password?</p>
				</div>
				<button
					type="submit"
					className="w-full py-3 bg-bgColor uppercase tracking-wide"
				>
					Login
				</button>
			</form>
			<p className="text-sm mt-10">
				Create a new account?
				<Link
					href="/register"
					className="text-blue-500 font-bold pl-1 hover:underline"
				>
					Register.
				</Link>
			</p>
		</div>
	);
}
