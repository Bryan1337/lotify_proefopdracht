
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

	return {
		"data": {
			"games": [
				{
					"name": "Braive",
					"url": "https://venki.nl/braive/",
					"emailDescription": "Zet jongeren in hun kracht 💪 en win jij een The School of Life training?",
					"status": "active",
					"ticketUniverseSize": 3600,
					"ticketPrice": "2.00",
					"createdAt": "2024-01-26T14:35:30+00:00",
					"updatedAt": null,
					"deletedAt": null,
					"id": "0246ee91-1561-4686-8652-9611e885cf98",
					"ticketCount": 13,
					"donationGoal": "7200.00",
					"donationAmount": "26.00"
				},
				{
					"name": "De Varkensschuur",
					"url": "https://venki.nl/de-varkensschuur/",
					"emailDescription": "Gun dieren een nieuw thuis 🏠 en maak kans op een big & breakfast.",
					"status": "active",
					"ticketUniverseSize": 3750,
					"ticketPrice": "2.00",
					"createdAt": "2024-01-26T14:35:30+00:00",
					"updatedAt": null,
					"deletedAt": null,
					"id": "cea4a7e1-ceaf-4a86-991b-0f22d7899390",
					"ticketCount": 54,
					"donationGoal": "7500.00",
					"donationAmount": "108.00"
				},
				{
					"name": "Club Kakatua",
					"url": "https://venki.nl/club-kakatua/",
					"emailDescription": "Draag jouw boompje 🌳 bij en maak kans op een getaway.",
					"status": "active",
					"ticketUniverseSize": 2500,
					"ticketPrice": "2.00",
					"createdAt": "2024-01-26T14:35:30+00:00",
					"updatedAt": null,
					"deletedAt": null,
					"id": "36948d09-f35d-448a-956d-74cbba6afe7b",
					"ticketCount": 76,
					"donationGoal": "5000.00",
					"donationAmount": "152.00"
				}
			]
		}
	}
}

export const fetchGames = () => requestData({
	query: `{
		games {
			name
			url
			emailDescription
			status
			ticketUniverseSize
			ticketPrice
			createdAt
			updatedAt
			deletedAt
			id
			ticketCount
			donationGoal
			donationAmount
		}
	}`
})