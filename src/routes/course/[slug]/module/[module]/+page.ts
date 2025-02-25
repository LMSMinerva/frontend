import type { PageLoad } from './$types';
import type { CourseModule } from '$lib/types/module';
import { ModuleStore } from '$lib/stores/module';
import { mockQuestionContent } from '$lib/utils/mock';
import { ContentStore } from '$lib/stores/content';
import type { Content } from '$lib/types/content';

export const load = (async ({ params }) => {
	const id = params.module;
	if (!id) {
		throw new Error('Slug is required');
	}

	const moduleStore = new ModuleStore();
	const contentStore = new ContentStore();

	const module = await moduleStore.getModuleById(id);

	const [contentsFromStore, questionContent] = await Promise.all([
		contentStore.getContentsByModuleId((module as CourseModule).id),
		mockQuestionContent()
	]);

	const combinedContents: Content[] = [...contentsFromStore, ...questionContent];

	return {
		module: module,
		contents: combinedContents
	};
}) satisfies PageLoad;
