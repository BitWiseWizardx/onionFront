"use client";
import React, { useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const router = useRouter();
	const emailRef = useRef();
	const passwordRef = useRef();

	if (localStorage.getItem("token")) {
		router.push("/");
	}

	const getLoginUser = async (e) => {
		e.preventDefault();
		try {
			const getUsers = await axios.post("http://localhost:4001/user/login", {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			});
			console.log(getUsers);
			if (getUsers.data.token) {
				localStorage.setItem("token", getUsers.data.token);
				router.push("/");
			} else {
				alert("Something Wrong");
			}
		} catch (error) {
			alert("Something Wrong", error);
		}
	};
	const InputData = [
		{
			id: "email",
			htmlFor: "email",
			label: "Email",
			name: "email",
			ref: emailRef,
			inputType: "email",
			placeholder: "Email",
		},
		{
			id: "password",
			htmlFor: "password",
			label: "Password",
			name: "password",
			ref: passwordRef,
			inputType: "password",
			placeholder: "Password",
		},
	];

	return (
		<div className="absolute top-0 container w-full h-screen flex flex-col items-center justify-center gap-10 bg-grayColor/20 backdrop-blur-md rounded-lg">
			<h1 className="text-5xl font-bold">Login</h1>
			<form
				onSubmit={getLoginUser}
				className="w-full lg:w-5/12 mx-auto space-y-5 px-10"
			>
				{InputData.map((input, index) => (
					<div key={index} className="relative">
						<input
							id={input.id}
							type={input.inputType}
							ref={input.ref}
							name={input.name}
							placeholder={input.placeholder}
							required
							className="peer placeholder-transparent h-10 w-full bg-transparent border-b-2 border-white focus:outline-none focus:borer-rose-600 text-lg"
						/>
						<label
							htmlFor={input.htmlFor}
							className="absolute left-0 -top-3.5 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 
							peer-focus:text-white/70 peer-focus:text-xs"
						>
							{input.label}
						</label>
						{/* <p className="text-xs text-accentColor pt-1">Hello Hello</p> */}
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
