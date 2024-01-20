import React, { useRef, useState } from "react";
import { currencyFormatter } from "@/lib/utils";

export default function ExpenseModelBox() {
  const [expense, setExpense] = useState([
    { id: 1, description: "Clothing", quantity: 2, totalAmount: "200000" },
    { id: 2, description: "Food", quantity: 5, totalAmount: "80000" },
  ]);

  const descriptionRef = useRef();
  const quantityRef = useRef();
  const amountRef = useRef();

  const expenseHandler = (e) => {
    e.preventDefault();

    const newValue = {
      description: descriptionRef.current.value,
      quantity: quantityRef.current.value,
      amount: amountRef.current.value,
      createdAt: new Date(),
    };
    console.log(newValue);

    descriptionRef.current.value = "";
    quantityRef.current.value = "";
    amountRef.current.value = "";

    setExpense((prevExpense) => [
      {
        id: prevExpense.length + 1,
        description: newValue.description,
        quantity: newValue.quantity,
        amount: newValue.amount,
      },
      ...prevExpense,
    ]);
  };
  return (
    <div>
      <form onSubmit={expenseHandler} className="space-y-2">
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm pl-2">
            Enter Expense Description
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
            Quantity
          </label>
          <input
            className="inputBox"
            name="description"
            ref={quantityRef}
            type="number"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-sm pl-2">
            Total Amount
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
        <h1 className="text-lg font-bold">Expense History</h1>
        <div className="w-full h-[0.5px] rounded-full bg-white"></div>
        <div className="space-y-1 text-bgColor mt-2 h-[300px] overflow-y-auto">
          {expense.map((expense) => (
            <div
              key={expense.id}
              className="bg-white/80 px-4 py-2 rounded-sm flex items-center justify-between"
            >
              <h1>{expense.description}</h1>
              <p>{expense.quantity}</p>
              <p className="text-sm">
                {currencyFormatter(expense.totalAmount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
