export const currencyFormatter = (amount) => {
	const formatter = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "MMK",
	});
	return formatter.format(amount);
};
