
export interface Game {
	id: string;
	name: string;
	url: string;
	emailDescription: string;
	status: string;
	ticketUniverseSize: number;
	ticketPrice: string;
	createdAt: string;
	updatedAt: string | null;
	deletedAt: string | null;
	ticketCount: number;
	donationGoal: string;
	donationAmount: string;
}
