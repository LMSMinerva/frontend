import { CourseStore } from '$lib/stores/course';
import { InstitutionStore } from '$lib/stores/institution';
import { ModuleStore } from '$lib/stores/module';
import type { Course } from '$lib/types/course';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		throw new Error('Slug is required');
	}

	const courseStore = new CourseStore();
	const institutionStore = new InstitutionStore();
    const moduleStore = new ModuleStore();

    const course: Course | null = await courseStore.getCourseByAlias(slug);

    if (!course) {
		throw new Error('Course not found');
	}

    const [institution, modules] = await Promise.all([
        institutionStore.getInstitution(course.institution),
        moduleStore.getModulesByCourseId(course.id)
    ]);

	if (!institution) {
		throw new Error('Institution not found');
	}
	if (!modules) {
		throw new Error('Modules not found');
	}

	return { course, institution, modules };
}) satisfies LayoutServerLoad;
