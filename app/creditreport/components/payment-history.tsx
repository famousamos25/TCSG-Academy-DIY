"use client";

interface Props {
	account: any;
}

const PaymentHistory = ({ account }: Props) => {
	const processData = () => {
		// Get all unique years and months from the data
		const years = new Set();
		const monthsData: any = {};

		// Start with 2023 data as shown in the design
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

		account.forEach((bureau: any) => {			
			bureau.paymentHistory?.monthlyPayStatus?.forEach((status: any) => {
				const [year, month] = status.date.split('-');
				years.add(year);

				if (!monthsData[year]) {
					monthsData[year] = {};
				}

				// Convert month number to index (1-based to 0-based)
				const monthIndex = parseInt(month, 10) - 1;
				const monthName = months[monthIndex];

				if (!monthsData[year][monthName]) {
					monthsData[year][monthName] = {};
				}

				// Store the status for this bureau at this date
				monthsData[year][monthName][bureau.bureau] = status.status;
			});
		});

		// Get the years in sorted order
		const sortedYears = Array.from(years).sort();

		return {
			years: sortedYears,
			months,
			monthsData
		};
	};

	const { years, months, monthsData } = processData();
	
	const getYearMonthPairs = () => {
		const pairs: any[] = [];
		years.forEach(year => {
			months.forEach(month => {
				pairs.push({ year, month });
			});
		});
		return pairs.sort((a, b) => {
			if (a.year !== b.year) return parseInt(a.year) - parseInt(b.year);
			return months.indexOf(a.month) - months.indexOf(b.month);
		});
	};

	const yearMonthPairs = getYearMonthPairs();

	return (
		<div className="w-full overflow-x-auto text-sm mt-8" >
			<div className="min-w-max">
				<table className="border-collapse w-full">
					<thead>
						<tr className="border-b border-b-200">
							<th className="px-6 py-2 text-left">MONTH</th>
							{yearMonthPairs.map(({ year, month }) => (
								<th key={`${year}-${month}`} className="px-6 py-2 text-center">{month}</th>
							))}
						</tr>
						<tr className="">
							<th className="px-6 py-2 text-left">Year</th>
							{yearMonthPairs.map(({ year, month }) => (
								<th key={`${year}-${month}`} className="px-6 py-2 text-center">{year}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{account.map((bureau: any) => (
							<tr key={bureau.bureau} className="border-t border-slate-200">
								<td className="px-6 py-4 text-left ">{bureau.bureau}</td>
								{yearMonthPairs.map(({ year, month }) => {
									const status = monthsData[year]?.[month]?.[bureau.bureau] || "-";
									return (
										<td key={`${bureau.bureau}-${year}-${month}`} className="px-6 py-4 text-center ">
											{status}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;
