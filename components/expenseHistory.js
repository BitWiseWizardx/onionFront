import { currencyFormatter } from "../lib/utils";

export default function ExpenseHistory({ expense }) {
  return (
    <div className="space-y-1  mt-2 h-[300px] overflow-y-auto">
      {expense.map((expense) => (
        <div
          key={expense.id}
          className="bg-white/20 px-4 py-2 rounded-full grid grid-cols-3 gap-8 place-items-center"
        >
          <h1>{expense.description}</h1>
          <p>{expense.quantity}</p>
          <p className="text-sm">{currencyFormatter(expense.totalAmount)}</p>
        </div>
      ))}
    </div>
  );
}
