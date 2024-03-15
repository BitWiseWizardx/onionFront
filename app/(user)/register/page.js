"use client";
import React, { useState, useRef } from "react";
import { PiEyeClosedDuotone, PiEye } from "react-icons/pi";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
	const router = useRouter();
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const getRegisterUsers = async (e) => {
		e.preventDefault();
		const getUsers = await axios.post("http://localhost:4001/user/register", {
			name: nameRef.current.value,
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
	};

	const InputData = [
		{
			id: "name",
			htmlFor: "name",
			label: "User Name",
			name: "name",
			ref: nameRef,
			inputType: "text",
			placeholder: "User Name",
		},
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
			inputType: showPassword ? "text" : "password",
			placeholder: "Password",
		},
	];

	return (
		<div className="container absolute top-0 max-w-screen-2xl h-screen flex flex-col items-center justify-center gap-10 bg-grayColor/20 backdrop-blur-md rounded-lg">
			<h1 className="text-5xl font-bold">Register</h1>
			<form
				onSubmit={getRegisterUsers}
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
						{input.name === "password" && (
							<div className="absolute text-lg right-3 top-1/2 transform -translate-y-1/2">
								{showPassword ? (
									<PiEye onClick={togglePasswordVisibility} />
								) : (
									<PiEyeClosedDuotone
										onClick={togglePasswordVisibility}
									/>
								)}
							</div>
						)}
					</div>
				))}
				<div className="flex items-center gap-1">
					<input type="checkbox" />
					<p>I agree to the terms and conditions.</p>
				</div>
				<button type="submit" className="w-full py-3 bg-bgColor uppercase">
					Create Account
				</button>
			</form>

			<p className="text-sm mt-10">
				Already have an account?
				<Link
					href="/login"
					className="text-blue-500 font-bold pl-1 hover:underline"
				>
					Login here.
				</Link>
			</p>
		</div>
	);
}
