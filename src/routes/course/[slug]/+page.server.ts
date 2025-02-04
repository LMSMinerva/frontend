import type { Course } from '$lib/types/course';
import { mockCurso } from '$lib/utils/mock';
import type { PageServerLoad } from './$types';


export const load = (async ({ params }) => {

    const slug = params.slug;
    if (!slug) {
        throw new Error('Slug is required');
    }

    const course: Course = mockCurso();

    return { course };
}) satisfies PageServerLoad;