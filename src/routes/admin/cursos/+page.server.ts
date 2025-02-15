import type { PageServerLoad } from './$types';
import type { Course } from '$types/course';
import { mockCursos } from '$lib/utils/mock';

export const load = (async () => {
	const courses: Course[] = mockCursos();
	return {
		courses
	};
}) satisfies PageServerLoad;
