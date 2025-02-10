import { mockContents } from '$lib/utils/mock';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
    const parentData = await parent();

    const module = parentData.modules.find((module) => module.order === Number(params.module));
    const contents = mockContents();
    if (!module) {
        throw new Error('Module not found');
    }

    return { module, contents };

}) satisfies PageServerLoad;