"use client";
import React, { useState, useEffect } from "react";
import { currencyFormatter } from "../lib/utils";
import IncomeModelBox from "../components/incomeModelBox";
import ExpenseModelBox from "../components/expenseModelBox";
import ModelBox from "../components/modelBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navigation from "../components/navigation";

export default function Home() {
	const router = useRouter();
	const [incomeModelOpen, setIncomeModelOpen] = useState(false);
	const [expenseModelOpen, setExpenseModelOpen] = useState(false);
	const [incomes, setIncomes] = useState([]);
	const [expense, setExpense] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [authUser, setAuthUser] = useState();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/register");
		}
		getAuthUser(token);
		getIncomeData(token);
		getExpenseData(token);
	}, []);

	const getAuthUser = async (token) => {
		const user = await axios.get("http://localhost:4001/auth-user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		setAuthUser(user.data);
		console.log(user.data);
	};

	const getIncomeData = async (token) => {
		try {
			const response = await axios.get("http://localhost:4001/income", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response.data);
			setIncomes(response.data);
			updateTotalIncome(response.data);
		} catch (error) {
			handleRequestError(error);
		}
	};

	const getExpenseData = async (token) => {
		try {
			const response = await axios.get("http://localhost:4001/expense", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(token);
			setExpense(response.data);
		} catch (error) {
			handleRequestError(error);
		}
	};

	const updateTotalIncome = (incomeData) => {
		const total = incomeData.reduce((acc, cur) => acc + cur.amount, 0);
		setTotalIncome(total);
	};

	const subtractBalance = (expense) => {
		setTotalIncome((prevTotalIncome) =>
			Math.max(0, prevTotalIncome - expense.amount)
		);
		setExpenseModelOpen(false);
	};

	return (
		<div className="overflow-hidden flex flex-col items-center ">
			<Navigation authUser={authUser} />
			<ModelBox
				show={incomeModelOpen}
				onClose={() => setIncomeModelOpen(false)}
			>
				<IncomeModelBox
					incomes={incomes}
					setIncomes={setIncomes}
					getIncomeData={getIncomeData}
					setTotalIncome={setTotalIncome}
				/>
			</ModelBox>
			<ModelBox
				show={expenseModelOpen}
				onClose={() => setExpenseModelOpen(false)}
			>
				<ExpenseModelBox
					expense={expense}
					setExpense={setExpense}
					getExpenseData={getExpenseData}
					subtractBalance={subtractBalance}
				/>
			</ModelBox>
			<main className="container max-w-screen-md mx-auto">
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
							onClick={() => setExpenseModelOpen(true)}
							className="expenseBtn"
						>
							+ Expenses
						</button>
						<button
							onClick={() => setIncomeModelOpen(true)}
							className="incomeBtn"
						>
							+ Incomes
						</button>
					</div>
				</section>
			</main>
		</div>
	);
}
