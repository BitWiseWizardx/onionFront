"use client";
import React, { useState, useEffect } from "react";
import { currencyFormatter } from "../lib/utils";
import IncomeModelBox from "../components/incomeModelBox";
import ExpenseHistory from "../components/expenseHistory";
import ExpenseModelBox from "../components/expenseModelBox";
import ModelBox from "../components/modelBox";
import axios from "axios";

export default function Home() {
	const [incomeModelOpen, setIncomeModelOpen] = useState(false);
	const [expenseModelOpen, setExpenseModelOpen] = useState(false);
	const [income, setIncome] = useState([]);
	const [expense, setExpense] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);

	useEffect(() => {
		getIncomeData();
		getExpenseData();
		getTotalIncomeData();
	}, []);
	const getIncomeData = async () => {
		try {
			const getIncome = await axios.get("http://localhost:4001/income");
			setIncome(getIncome.data);
			console.log(getIncome.data);
		} catch (error) {
			console.error(error);
		}
	};

	const getTotalIncomeData = async () => {
		const newTotalBalance = await income.reduce((accVal, curVal) => {
			return accVal + curVal.amount;
		}, 0);
		setTotalIncome(newTotalBalance);
		console.log(income);
	};
	const getExpenseData = async () => {
		try {
			const getExpense = await axios.get("http://localhost:4001/expense");
			setExpense(getExpense.data);
			console.log(getExpense.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="w-full overflow-hidden flex flex-col items-center ">
			{/* -------- Model Box------- */}
			{incomeModelOpen ? (
				<ModelBox show={incomeModelOpen} onClose={setIncomeModelOpen}>
					<IncomeModelBox
						income={income}
						setIncome={setIncome}
						getIncomeData={getIncomeData}
						setTotalIncome={setTotalIncome}
					/>
				</ModelBox>
			) : (
				<ModelBox show={expenseModelOpen} onClose={setExpenseModelOpen}>
					<ExpenseModelBox
						expense={expense}
						setExpense={setExpense}
						getExpenseData={getExpenseData}
					/>
				</ModelBox>
			)}
			<main className="container max-w-screen-md mx-auto">
				{/* ---------Balance Section-------- */}
				<section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14">
					<div>
						<p className="text-xs text-grayColor text-center md:text-left">
							Your Balance
						</p>
						<h2 className="text-2xl font-bold ">
							{currencyFormatter(totalIncome)}
						</h2>
					</div>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setExpenseModelOpen(!expenseModelOpen)}
							className="expenseBtn"
						>
							+ Expenses
						</button>
						<button
							onClick={() => setIncomeModelOpen(!incomeModelOpen)}
							className="incomeBtn"
						>
							+ Incomes
						</button>
					</div>
				</section>

				{/* -------Expenses Section-------- */}
				<section className="space-y-1">
					<h1 className="font-bold">Your Expences</h1>
					<div className="w-full h-[0.5px] bg-white"></div>
					<ExpenseHistory expense={expense} />
				</section>
			</main>
		</div>
	);
}
