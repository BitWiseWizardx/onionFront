"use client";
import React, { useRef } from "react";
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
	return (
		<div className="flex flex-col items-center gap-8 text-bgColor">
			<h1 className="text-5xl font-bold">Register</h1>
			<form onSubmit={getRegisterUsers} className="space-y-3">
				<div>
					<label htmlFor="email" className="text-white">
						Email :{" "}
					</label>
					<input ref={emailRef} name="email" />
				</div>
				<div>
					<label htmlFor="password" className="text-white">
						Passowrd :{" "}
					</label>
					<input ref={PassowrdRef} name="password" />
				</div>
				<div className="flex items-center justify-end gap-2">
					<button type="reset" className="expenseBtn bg-accentColor/20">
						Cancel
					</button>
					<button type="submit" className="incomeBtn bg-greenColor/20">
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
