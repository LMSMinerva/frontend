import type { Course } from '$lib/types/course';
import $api from '$lib/services/api';
export class CourseStore {
	async getCourseByAlias(alias: string): Promise<Course | null> {
		try {
			const course: Course = await $api(`/course/${alias}/`);
			return course;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async getCourses(): Promise<Course[]> {
		try {
			const courses: Course[] = await $api(`/courses/`);
			return courses;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}
