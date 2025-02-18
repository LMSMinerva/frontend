import { redirect, type Handle } from '@sveltejs/kit';
import { AuthCookies } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const hasAuthCookies = AuthCookies.hasAuthCookies(event.cookies);
	const isLogin = event.url.pathname === '/login' || event.url.pathname === '/authorize';

	if (isLogin) {
		return await resolve(event);
	}

	if (!hasAuthCookies) {
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};
