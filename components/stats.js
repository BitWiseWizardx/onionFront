"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stats({ color, title, amount }) {
	return (
		<div className="w-2/3 mx-auto">
			<Doughnut
				data={{
					labels: title,
					datasets: [
						{
							label: "Expenses",
							data: amount,
							backgroundColor: color,
							borderColor: "#200E3A",
						},
					],
				}}
			/>
		</div>
	);
}
