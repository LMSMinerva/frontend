import { CourseStore } from '$lib/stores/course';
import type { LayoutServerLoad } from './$types';
import { ModuleStore } from '$lib/stores/module';
import type { Course } from '$lib/types/course';

export const load = (async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		throw new Error('Slug is required');
	}

	console.log("Loading from server layout course..", slug);

	const courseStore = new CourseStore();
	const course = await courseStore.getCourseByAlias(slug);
    const moduleStore = new ModuleStore();
    const modules = await moduleStore.getModulesByCourseId((course as Course).id);

	return {
		course: course,
		modules,
	};
}) satisfies LayoutServerLoad;
