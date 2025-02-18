import type { Content } from '$lib/types/content';
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
}
