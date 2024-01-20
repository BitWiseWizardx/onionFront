import React from "react";
import { currencyFormatter } from "@/lib/utils";

export default function IncomeHistory({ income }) {
  return (
    <div>
      <h1 className="text-lg font-bold">Income History</h1>
      <div className="w-full h-[0.5px] rounded-full bg-white"></div>
      <div className="space-y-1 text-bgColor mt-2 h-[300px] overflow-y-auto">
        {income.map((income) => (
          <div
            key={income.id}
            className="bg-white/80 px-4 py-2 rounded-sm flex items-center justify-between"
          >
            <h1>{income.description}</h1>
            <p className="text-sm">{currencyFormatter(income.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
