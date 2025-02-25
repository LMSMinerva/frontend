export type Content = {
	id: string;
	name: string;
	description: string;
	order: number;
	reviews: number;
	comments: number;
	rating: string;
	metadata: string;
	body: string;
	module: string;
	content_type: string;
};

export type ContentInteraction = {
	id?: string;
	completed: boolean;
	rating: number;
	user: number;
	content: string;
}