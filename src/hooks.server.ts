import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const authToken = event.cookies.get('authToken');
	const refreshToken = event.cookies.get('refreshToken');


	event.cookies.set('authToken', "bWluZXJ2YTptaW5fbG1zMTIz", {
		maxAge: 60 * 60 * 24 * 7,
		secure: true,
		sameSite: 'lax',
		httpOnly: true,
		path: '/',
	});

	const isValid = authToken !== undefined && refreshToken !== undefined;
	const isLogin = event.url.pathname === '/login';

	if (isLogin) {
		return await resolve(event);
	}

	if (!isValid) {
		throw redirect(303, '/login');
	}

	const response = await resolve(event);
	return response;
};
