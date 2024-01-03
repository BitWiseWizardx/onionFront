"use client";
import React, { useRef, useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItems from "@/components/expenseItems";
import Stats from "@/components/stats";
import ModelBox from "@/components/modelBox";
const DammyData = [
	{ color: "#EE7214", title: "Clothing", amount: "6000" },
	{ color: "#527853", title: "Skin Care", amount: "40000" },
	{ color: "#F9E8D9", title: "Eating", amount: "75000" },
	{ color: "#F7B787", title: "Clothing", amount: "6000" },
	{ color: "#FFC5C5", title: "Clothing", amount: "6000" },
];

export default function Home() {
	const [incomeModelOpen, setIncomeModelOpen] = useState(true);
	const descriptionRef = useRef();
	const amountRef = useRef();
	const incomeHandler = (e) => {
		e.preventDefault();

		const newIncomes = {
			description: descriptionRef.current.value,
			amount: amountRef.current.value,
			createdAt: new Date(),
		};

		console.log(newIncomes);
	};
	return (
		<>
			{/* Income Model Box */}
			<ModelBox show={incomeModelOpen} onClose={setIncomeModelOpen}>
				<form onSubmit={incomeHandler} className="space-y-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="amount" className="text-sm">
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
					<div className="flex flex-col gap-2">
						<label htmlFor="amount" className="text-sm">
							Enter Income Amount
						</label>
						<input
							className="inputBox"
							name="amount"
							type="number"
							ref={amountRef}
							min={0.1}
							step={0.1}
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
			</ModelBox>

			<main className="container max-w-screen-md mx-auto space-y-4 ">
				{/* Balance Section */}
				<section className="flex flex-col md:flex-row items-center justify-between gap-4">
					<div>
						<p className="text-xs text-grayColor text-center md:text-left">
							Your Balance
						</p>
						<h2 className="text-xl font-bold ">
							{currencyFormatter(300000)}
						</h2>
					</div>
					<div className="flex items-center gap-2">
						<button className="expenseBtn">+ Expenses</button>
						<button
							onClick={() => setIncomeModelOpen(true)}
							className="incomeBtn"
						>
							+ Incomes
						</button>
					</div>
				</section>

				{/* Expenses Section */}
				<section className="container space-y-6">
					<div className="flex items-center justify-between">
						<button className="lgButton">Expenses</button>
						<button className="lgButton">Incomes</button>
					</div>
					<div className="space-y-2">
						{DammyData.map((data, index) => {
							return (
								<ExpenseItems
									key={index}
									color={data.color}
									title={data.title}
									amount={data.amount}
								/>
							);
						})}
					</div>
				</section>

				{/* Stats Section */}
				<section className="container">
					<Stats
						color={DammyData.map((e) => e.color)}
						title={DammyData.map((e) => e.title)}
						amount={DammyData.map((e) => e.amount)}
					/>
				</section>
			</main>
		</>
	);
}
