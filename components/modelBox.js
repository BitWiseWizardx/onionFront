import React, { useRef, useState } from "react";
import IncomeHistory from "./incomeHistory";

export default function ModelBox({ show, onClose }) {
  const [income, setIncome] = useState([
    { id: 1, description: "Salary", amount: "200000" },
    { id: 2, description: "Bonus", amount: "600000" },
  ]);
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

    descriptionRef.current.value = "";
    amountRef.current.value = "";

    setIncome((prevIncome) => [
      {
        id: prevIncome.length + 1,
        description: newIncomes.description,
        amount: newIncomes.amount,
      },
      ...prevIncome,
    ]);
  };
  return (
    <div>
      <div
        style={{
          transform: show ? "translateY(0%)" : "translateY(-200%)",
        }}
        className="absolute container top-14 left-0 transition-all duration-200"
      >
        <div className="container max-w-2xl mx-auto bg-grayColor/20 backdrop-blur-md rounded-lg">
          <div className="flex justify-end">
            <button
              onClick={() => onClose(!show)}
              className="px-3.5 py-2 bg-bgColor/50 rounded-full font-bold"
            >
              X
            </button>
          </div>

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
          <IncomeHistory income={income} />
        </div>
      </div>
    </div>
  );
}
