import type { PageServerLoad } from './$types';
import type { Curso } from '$lib/types';

export const load = (async () => {
	const courses: Curso[] = [
		{
			id: 1,
			name: 'Curso 1',
			shortName: 'C1',
			category: 'Categoría 1',
			visibility: 'Público',
			startDate: '2021-01-01',
			endDate: '2021-12-31'
		},
		{
			id: 2,
			name: 'Curso 2',
			shortName: 'C2',
			category: 'Categoría 2',
			visibility: 'Privado',
			startDate: '2021-01-01',
			endDate: '2021-12-31'
		},
		{
			id: 3,
			name: 'Curso 3',
			shortName: 'C3',
			category: 'Categoría 3',
			visibility: 'Público',
			startDate: '2021-01-01',
			endDate: '2021-12-31'
		}
	];
	return {
		courses
	};
}) satisfies PageServerLoad;
