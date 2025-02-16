import type { PageLoad } from './$types';
import { mockContents } from '$lib/utils/mock';
import { ModuleStore } from '$lib/stores/module';

export const load = (async ({ params }) => {
    const id = params.module;
    if (!id) {
		throw new Error('Slug is required');
	}

    const moduleStore = new ModuleStore();

    return {
        module: moduleStore.getModuleById(id),
        contents: mockContents()
    }
}) satisfies PageLoad;