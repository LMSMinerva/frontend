import type { Content, ContentInteraction, QuestionContent } from '$lib/types/content';
import $api from '$lib/services/api';
import { storeAuth } from './auth';
import type { User } from '$lib/types/user';

export class ContentStore {
	async getContentsByModuleId(moduleId: string): Promise<Content[]> {
		try {
			const contents: Content[] = await $api(`/module/${moduleId}/contents/`);
			return contents;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	async getContentInteractions(contentId: string): Promise<ContentInteraction[]> {
		try {
			const params = new URLSearchParams({ content: contentId });
			const interactions: ContentInteraction[] = await $api(`/content_interaction/?${params}`);
			return interactions;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	async rateContent(rate: number, completed: boolean, content: string): Promise<ContentInteraction | null> {
		try {

			const interaction: ContentInteraction = {
				completed: completed,
				rating: rate,
				user: (storeAuth.getUser() as User).id,
				content: content,
			};

			const newInteraction: ContentInteraction = await $api('/content_interaction/', {
				method: 'POST',
				body: JSON.stringify(interaction)
			});
			return newInteraction;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async deleteRate(interaction: string): Promise<boolean> {
		try {
			await $api(`/content_interaction/${interaction}/`, {
				method: 'DELETE'
			});

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	async updateRate(interactionid: string, rate: number, completed: boolean): Promise<ContentInteraction | null> {
		try {

			const interaction: Partial<ContentInteraction> = {
				completed: completed,
				rating: rate,
			};

			const newInteraction: ContentInteraction = await $api(`/content_interaction/${interactionid}/`, {
				method: 'PUT',
				body: JSON.stringify(interaction)
			});
			return newInteraction;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async getQuestionContentVisualization(contentId: string): Promise<QuestionContent | null> {
		try {
			const visualization = await $api(`/content/${contentId}/visualize/`);
			return visualization;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async checkAnswer(contentId: string, selected: string[]) {
		try {
			const correct = await $api(`/content/${contentId}/result`, {
				method: 'POST',
				body: JSON.stringify({ selected: selected })
			});
			return correct;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
