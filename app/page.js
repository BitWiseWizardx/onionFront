"use client";
import React, { useState, useEffect } from "react";
import { currencyFormatter } from "../lib/utils";
import IncomeModelBox from "../components/incomeModelBox";
import ExpenseHistory from "../components/expenseHistory";
import ExpenseModelBox from "../components/expenseModelBox";
import ModelBox from "../components/modelBox";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const [incomeModelOpen, setIncomeModelOpen] = useState(false);
	const [expenseModelOpen, setExpenseModelOpen] = useState(false);
	const [income, setIncome] = useState([]);
	const [expense, setExpense] = useState([]);
	const [totalIncome, setTotalIncome] = useState(0);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/register");
		} else {
			fetchUserData(token);
			getIncomeData(token);
			getExpenseData(token);
		}
	}, []);

	const fetchUserData = async (token) => {
		try {
			const response = await axios.get(
				"http://localhost:4001/user/protected",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUser(response.data.user);
			if (!response.data.user) {
				localStorage.removeItem("token");
				router.push("/register");
			}
		} catch (error) {
			handleRequestError(error);
		}
	};

	const getIncomeData = async (token) => {
		try {
			const response = await axios.get("http://localhost:4001/income", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setIncome(response.data);
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
			setExpense(response.data);
		} catch (error) {
			handleRequestError(error);
		}
	};

	const updateTotalIncome = (incomeData) => {
		const total = incomeData.reduce((acc, cur) => acc + cur.amount, 0);
		setTotalIncome(total);
	};

	const handleRequestError = (error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("token");
			router.push("/register");
		} else {
			alert("An error occurred while processing your request.");
			console.error(error);
		}
	};

	const subtractBalance = (expense) => {
		setTotalIncome((prevTotalIncome) =>
			Math.max(0, prevTotalIncome - expense.amount)
		);
		setExpenseModelOpen(false);
	};

	return (
		<div className="w-full overflow-hidden flex flex-col items-center ">
			<ModelBox
				show={incomeModelOpen}
				onClose={() => setIncomeModelOpen(false)}
			>
				<IncomeModelBox
					income={income}
					setIncome={setIncome}
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
