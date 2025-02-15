import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	cookies.delete('authToken', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });

	throw redirect(303, '/login');

	return {};
}) satisfies PageServerLoad;
