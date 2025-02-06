import type { CourseCategory } from '$lib/types/category';
import $api from '$lib/services/api';

export class CategoryStore {
	async getCategory(id: string): Promise<CourseCategory | null> {
		try {
			const category: CourseCategory = await $api(`/course_category/${id}/`);
			return category;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
