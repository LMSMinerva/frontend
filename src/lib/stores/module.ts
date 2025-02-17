import type { CourseModule } from '$lib/types/module';
import $api from '$lib/services/api';
export class ModuleStore {
	async getModulesByCourseId(courseId: string): Promise<CourseModule[]> {
		try {
			const modules: CourseModule[] = await $api(`/courses/${courseId}/modules/`);
			return modules;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
	async getModuleById(id: string): Promise<CourseModule | null> {
		try {
			const module: CourseModule = await $api(`/module/${id}/`);
			return module;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
