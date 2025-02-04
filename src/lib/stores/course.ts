import type { Course } from '$lib/types/course';
import $api from '$lib/services/api';
export class CourseStore {
	async getCourse(identifier: string): Promise<Course> {
		try {
			const course: Course = await $api(`/courses/${identifier}`);
			return course;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch course');
		}
	}

	async getCourses(): Promise<Course[]> {
		try {
			const courses: Course[] = await $api(`/courses/`);
			return courses;
		} catch (error) {
			console.error(error);
			throw new Error('Failed to fetch courses');
		}
	}
}
