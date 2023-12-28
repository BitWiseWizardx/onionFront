import React from "react";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItems from "@/components/expenseItems";

export default function Home() {
	const DammyData = [
		{ color: "#3559E0", title: "Clothing", amount: "6000" },
		{ color: "#000", title: "Skin Care", amount: "40000" },
		{ color: "#fff", title: "Eating", amount: "75000" },
		{ color: "#A367B1", title: "Clothing", amount: "6000" },
		{ color: "#65B741", title: "Clothing", amount: "6000" },
	];
	return (
		<main className="container max-w-screen-md mx-auto">
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
					<button className="smbtn">+ Expenses</button>
					<button className="smbtn">+ Incomes</button>
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
		</main>
	);
}
