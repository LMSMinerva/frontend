import type { Content, ContentInteraction } from '$lib/types/content';
import $api from '$lib/services/api';
export class ContentStore {
	async getContentsByModuleId(moduleId: string): Promise<Content[]> {
		try {
			const contents: Content[] = await $api(`/content/?module_id=${moduleId}/`);
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
}
