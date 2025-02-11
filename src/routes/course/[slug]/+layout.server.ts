import { CourseStore } from '$lib/stores/course';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		throw new Error('Slug is required');
	}

	const courseStore = new CourseStore();

	return {
		course: courseStore.getCourseByAlias(slug)
	};
}) satisfies LayoutServerLoad;
