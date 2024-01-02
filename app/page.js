"use client";
import React, { useState } from "react";
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
	const [modelOpen, setModelOpen] = useState(true);
	return (
		<>
			{/* Model Box */}
			<ModelBox show={modelOpen} onClose={setModelOpen}>
				<h1 className="text-4xl font-bold">Hello</h1>
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
						<button onClick={() => setModelOpen(true)} className="smbtn">
							+ Expenses
						</button>
						<button onClick={() => setModelOpen(true)} className="smbtn">
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
