import { CourseStore } from '$lib/stores/course';
import { InstitutionStore } from '$lib/stores/institution';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const slug = params.slug;
    if (!slug) {
        throw new Error('Slug is required');
    }
    const courseStore = new CourseStore();
    const institutionStore = new InstitutionStore();

    const coursePromise = courseStore.getCourseByAlias(slug);

    return {
		course: coursePromise.then((course) => {
			if (!course) throw new Error('Course not found');
			return course;
		}),
		institution: coursePromise.then(async (course) => {
			if (!course) return null;
			return institutionStore.getInstitution(course.institution);
		})
	};

}) satisfies PageServerLoad;