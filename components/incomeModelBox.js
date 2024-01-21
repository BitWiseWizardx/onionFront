import React, { useRef, useState } from "react";
import { currencyFormatter } from "../lib/utils";

export default function IncomeModelBox() {
  const [income, setIncome] = useState([
    { id: 1, description: "Salary", amount: "200000" },
    { id: 2, description: "Bonus", amount: "600000" },
  ]);

  const descriptionRef = useRef();
  const amountRef = useRef();

  const incomeHandler = (e) => {
    e.preventDefault();

    const newValue = {
      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      createdAt: new Date(),
    };
    console.log(newValue);

    descriptionRef.current.value = "";
    amountRef.current.value = "";

    setIncome((prevIncome) => [
      {
        id: prevIncome.length + 1,
        description: newValue.description,
        amount: newValue.amount,
      },
      ...prevIncome,
    ]);
  };
  return (
    <div>
      <form onSubmit={incomeHandler} className="space-y-2">
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
    </div>
  );
}
