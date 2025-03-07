import type { PageLoad } from './$types';
import type { CourseModule } from '$lib/types/module';
import { ModuleStore } from '$lib/stores/module';
import { ContentStore } from '$lib/stores/content';

export const load = (async ({ params }) => {
	const id = params.module;
	if (!id) {
		throw new Error('Slug is required');
	}

	const moduleStore = new ModuleStore();
	const contentStore = new ContentStore();

	const modulo = await moduleStore.getModuleById(id);
	const contents = contentStore.getContentsByModuleId((modulo as CourseModule).id);

	return {
		module: modulo,
		contents: contents
	};
}) satisfies PageLoad;
