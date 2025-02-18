import type { CourseCategory, ContentCategory } from '$lib/types/category';
import $api from '$lib/services/api';

export class CategoryStore {
	async getCourseCategory(id: string): Promise<CourseCategory | null> {
		try {
			const category: CourseCategory = await $api(`/course_category/${id}/`);
			return category;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async getContentCategory(id: string): Promise<ContentCategory | null> {
		try {
			const category: ContentCategory = await $api(`/content_category/${id}/`);
			return category;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
