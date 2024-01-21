"use client";
import React, { useState } from "react";
import { currencyFormatter } from "../lib/utils";
import Stats from "../components/stats";
import IncomeModelBox from "../components/incomeModelBox";
import ExpenseHistory from "../components/expenseHistory";
import ExpenseModelBox from "../components/expenseModelBox";
import ModelBox from "../components/modelBox";
const DammyData = [
  { color: "#EE7214", title: "Clothing", amount: "6000" },
  { color: "#527853", title: "Skin Care", amount: "40000" },
  { color: "#F9E8D9", title: "Eating", amount: "75000" },
  { color: "#F7B787", title: "Clothing", amount: "6000" },
  { color: "#FFC5C5", title: "Clothing", amount: "6000" },
];

export default function Home() {
  const [incomeModelOpen, setIncomeModelOpen] = useState(false);
  const [expenseModelOpen, setExpenseModelOpen] = useState(false);
  const [income, setIncome] = useState([
    { id: 1, description: "Salary", amount: "200000" },
    { id: 2, description: "Bonus", amount: "600000" },
  ]);
  const [expense, setExpense] = useState([
    { id: 1, description: "Clothing", quantity: 2, totalAmount: "200000" },
    { id: 2, description: "Food", quantity: 5, totalAmount: "80000" },
  ]);

  return (
    <>
      {/* -------- Model Box------- */}
      {incomeModelOpen ? (
        <ModelBox show={incomeModelOpen} onClose={setIncomeModelOpen}>
          <IncomeModelBox income={income} setIncome={setIncome} />
        </ModelBox>
      ) : (
        <ModelBox show={expenseModelOpen} onClose={setExpenseModelOpen}>
          <ExpenseModelBox expense={expense} setExpense={setExpense} />
        </ModelBox>
      )}
      <main className="container max-w-screen-md mx-auto">
        {/* ---------Balance Section-------- */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-14">
          <div>
            <p className="text-xs text-grayColor text-center md:text-left">
              Your Balance
            </p>
            <h2 className="text-2xl font-bold ">{currencyFormatter(300000)}</h2>
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

        {/* --------Stats Section---------- */}
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
