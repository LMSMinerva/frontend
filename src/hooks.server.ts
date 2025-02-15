import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('authToken');
	const refreshToken = event.cookies.get('refreshToken');

	const isValid = authToken !== undefined && refreshToken !== undefined;
	const isLogin = event.url.pathname === '/login' || event.url.pathname === '/authorize';

	if (isLogin) {
		return await resolve(event);
	}

	if (!isValid) {
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};
