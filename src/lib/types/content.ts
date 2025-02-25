export type Content = {
	id: string;
	name: string;
	description: string;
	order: number;
	reviews: number;
	comments: number;
	rating: string;
	metadata: number;
	body: string;
	question?: {
		enunciado: string;
		respuestas: {
			id: string;
			texto: string;
			correcta: boolean;
		}[],
	}
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