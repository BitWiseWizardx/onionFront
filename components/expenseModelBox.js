import React, { useRef } from "react";
import { currencyFormatter } from "../lib/utils";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ExpenseModelBox({ expense, setExpense }) {
	const descriptionRef = useRef();
	const quantityRef = useRef();
	const amountRef = useRef();

	const expenseHandler = (e) => {
		e.preventDefault();

		const newValue = {
			description: descriptionRef.current.value,
			quantity: quantityRef.current.value,
			amount: amountRef.current.value,
			createdAt: new Date(),
		};
		console.log(newValue);

		descriptionRef.current.value = "";
		quantityRef.current.value = "";
		amountRef.current.value = "";

		setExpense((prevExpense) => [
			{
				id: prevExpense.length + 1,
				description: newValue.description,
				quantity: newValue.quantity,
				amount: newValue.amount,
			},
			...prevExpense,
		]);
	};
	return (
		<div>
			<form onSubmit={expenseHandler} className="space-y-2">
				<div className="flex flex-col">
					<label htmlFor="amount" className="text-sm pl-2">
						Enter Expense Description
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
						Quantity
					</label>
					<input
						className="inputBox"
						name="description"
						ref={quantityRef}
						type="number"
						required
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="amount" className="text-sm pl-2">
						Total Amount
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
				<h1 className="text-lg font-bold">Expense History</h1>
				<div className="w-full h-[0.5px] rounded-full bg-white"></div>
				<div className="space-y-1 text-bgColor mt-2 h-[300px] overflow-y-auto">
					{expense.map((expense) => (
						<div
							key={expense.id}
							className="bg-bgColor/80 text-white px-4 py-2 rounded-sm grid grid-cols-12 gap-1"
						>
							<h1 className="col-span-4">{expense.description}</h1>
							<p className="col-span-1">{expense.quantity}</p>
							<p className="text-sm col-span-5">
								{currencyFormatter(expense.totalAmount)}
							</p>
							<div className="flex items-center justify-end gap-5 col-span-2">
								<MdOutlinePayment className="text-greenColor/80  text-lg" />
								<FaRegTrashAlt className="text-accentColor/80" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
