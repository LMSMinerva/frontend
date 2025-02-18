import type { LayoutServerLoad } from './$types';
import type { User } from '$types/user';
import { AuthCookies } from '$lib/server/auth';

export const load = (async ({ cookies }) => {
	const authToken = cookies.get('authToken');
	const refreshToken = cookies.get('refreshToken');

	const user: User | null = AuthCookies.getUserFromCookies(cookies);

	return {
		user,
		authToken,
		refreshToken
	};
}) satisfies LayoutServerLoad;
