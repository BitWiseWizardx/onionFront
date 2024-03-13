import React, { useEffect, useRef, useState } from "react";
import { currencyFormatter } from "../lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";

export default function IncomeModelBox({
	income,
	setIncome,
	getIncomeData,
	setTotalIncome,
	show,
	onClose,
}) {
	const descriptionRef = useRef();
	const amountRef = useRef();

	const createIncomeData = async (e) => {
		e.preventDefault();
		const createdIncome = await axios.post("http://localhost:4001/income", {
			description: descriptionRef.current.value,
			amount: parseInt(amountRef.current.value),
			created_at: new Date(),
			user_id: createdIncome.data.user_id,
		});
		getIncomeData();
		console.log(createdIncome.data);
	};

	const deleteIncomeData = async (id) => {
		const deletedIncome = await axios.delete(
			"http://localhost:4001/income/" + id
		);
		getIncomeData();
		console.log(deletedIncome);
	};
	useEffect(() => {
		const newTotalBalance = income.reduce((accVal, curVal) => {
			return accVal + curVal.amount;
		}, 0);
		setTotalIncome(newTotalBalance);
		console.log(newTotalBalance);
	}, [income]);
	// const incomeHandler = (e) => {
	// 	e.preventDefault();

	// 	const newValue = {
	// 		description: descriptionRef.current.value,
	// 		amount: amountRef.current.value,
	// 		createdAt: new Date(),
	// 	};
	// 	console.log(newValue);

	// 	descriptionRef.current.value = "";
	// 	amountRef.current.value = "";

	// setIncome((prevIncome) => [
	// 	{
	// 		id: prevIncome.length + 1,
	// 		description: newValue.description,
	// 		amount: newValue.amount,
	// 	},
	// 	...prevIncome,
	// ]);
	// };
	return (
		<div>
			<form onSubmit={createIncomeData} className="space-y-2">
				<div className="flex flex-col">
					<label htmlFor="amount" className="text-sm pl-2">
						Enter Income Description
					</label>
					<input
						className="inputBox"
						name="description"
						ref={descriptionRef}
						type="text"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="amount" className="text-sm pl-2">
						Enter Income Amount
					</label>
					<input
						className="inputBox"
						name="amount"
						type="number"
						ref={amountRef}
						required
					/>
				</div>
				<div className="flex items-center justify-end gap-2">
					<button type="reset" className="expenseBtn bg-accentColor/20">
						Cancel
					</button>
					<button type="submit" className="incomeBtn bg-greenColor/20">
						Add
					</button>
				</div>
			</form>
			<div>
				<h1 className="text-lg font-bold">Income History</h1>
				<div className="w-full h-[0.5px] rounded-full bg-white"></div>
				<div className="space-y-1 text-bgColor mt-2 h-[300px] overflow-y-auto">
					{income?.map((income) => (
						<div
							key={income.id}
							className="bg-bgColor/80 text-white px-4 py-2 rounded-sm flex justify-between gap-1"
						>
							<h1>{income.description}</h1>
							<p className="text-sm">
								{currencyFormatter(income.amount)}
							</p>
							<FaRegTrashAlt
								onClick={() => deleteIncomeData(income.id)}
								className="text-accentColor/80"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
