import type { PageServerLoad } from './$types';
import type { Curso } from '$lib/types';
import { mockCursos } from '$lib/utils/mock';

export const load = (async () => {
	const courses: Curso[] = mockCursos();
	return {
		courses
	};
}) satisfies PageServerLoad;
