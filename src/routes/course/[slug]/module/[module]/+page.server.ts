import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        module: params.module,
    };
}) satisfies PageServerLoad;