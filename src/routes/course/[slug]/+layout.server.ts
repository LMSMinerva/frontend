import type { LayoutServerLoad } from './$types';
import { InstitutionStore } from '$lib/stores/institution';
import { CourseStore } from '$lib/stores/course';
import type { Course } from '$lib/types/course';

export const load = (async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		throw new Error('Slug is required');
	}

	console.log('Loading from server layout course..', slug);

	const institutionStore = new InstitutionStore();
	const courseStore = new CourseStore();

	const course = await courseStore.getCourseByAlias(slug);
	const institution = institutionStore.getInstitution((course as Course).institution);

	return {
		course: course,
		institution: institution
	};
}) satisfies LayoutServerLoad;
