
export interface QueryObject {
	query: string;
}

export const requestData = async (query: QueryObject) => {

	try {

		const apiUrl = import.meta.env.VITE_APP_API_URL;

		if(!apiUrl) {

			throw new Error('VITE_APP_API_URL is not defined (Has it been added to the .env? 🤔).');
		}

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(query),
		});

		return response.json();

	} catch (error) {

		console.error(error);
	}
}

export const fetchGames = () => requestData({
	query: `{
		games {
			url
			emailDescription
			ticketPrice
			id
			donationGoal
			donationAmount
		}
	}`
})