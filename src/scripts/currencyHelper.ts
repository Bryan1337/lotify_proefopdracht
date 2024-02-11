
export const formatCurrency = (value: number = 0) => {

	value = Number(value);

	if (isNaN(value)) {

		value = 0;
	}

	const numberFormat = Intl.NumberFormat('nl-NL', {
		currency: 'EUR',
		style: 'currency',
		/** Only show fractions if value has decimals */
		maximumFractionDigits: (value % 1 === 0) ? 0 : 2,
		currencyDisplay: 'narrowSymbol',
	});

	return numberFormat.format(value);
}