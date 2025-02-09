import { CourseStore } from '$lib/stores/course';
import type { Course } from '$lib/types/course';
import { mockCurso } from '$lib/utils/mock';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		throw new Error('Slug is required');
	}

	const courseStore = new CourseStore();
	const course: Course | null = courseStore.getCourseByAlias(slug);
	if (!course) {
		throw new Error('Course not found');
	}

	return { course };
}) satisfies PageServerLoad;
