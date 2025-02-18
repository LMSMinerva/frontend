import type { LayoutServerLoad } from './$types';
import type { User } from '$types/user';
import { AuthCookies } from '$lib/server/auth';

export const load = (async ({ cookies }) => {
	const { accessToken, refreshToken } = AuthCookies.getAuthTokens(cookies);

	const user: User | null = AuthCookies.getUserFromCookies(cookies);

	return {
		user,
		accessToken,
		refreshToken
	};
}) satisfies LayoutServerLoad;
