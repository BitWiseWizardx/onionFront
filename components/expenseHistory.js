import { currencyFormatter } from "@/lib/utils";

export default function ExpenseHistory({ color, title, amount }) {
  return (
    <div className="flex items-center justify-between bg-white/20 rounded-full px-4 py-3">
      <div className="flex items-center gap-2">
        <div
          className="w-[25px] h-[25px] rounded-full"
          style={{ backgroundColor: color }}
        />
        <h3>{title}</h3>
      </div>
      <p className="text-xs">{currencyFormatter(amount)}</p>
    </div>
  );
}
