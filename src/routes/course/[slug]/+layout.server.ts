import { CourseStore } from '$lib/stores/course';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		throw new Error('Slug is required');
	}

	console.log("Loading from server layout course..", slug);

	const courseStore = new CourseStore();
	const course = await courseStore.getCourseByAlias(slug);

	return {
		course: course,
	};
}) satisfies LayoutServerLoad;
