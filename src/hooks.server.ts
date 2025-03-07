import { redirect, type Handle } from '@sveltejs/kit';
import { AuthCookies } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const hasAuthCookies = AuthCookies.hasAuthCookies(event.cookies);
	const authTokens = AuthCookies.getAuthTokens(event.cookies);
	const isLogin = event.url.pathname === '/login' || event.url.pathname === '/authorize' || event.url.pathname === '/logout' || event.url.pathname === '/register';


	if (isLogin) {
		return await resolve(event);
	}

	if (!hasAuthCookies) {
		redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};
