import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    
    const authToken = '123'
    const maxAge = 60 * 60 * 24 * 7;
    event.cookies.set('authToken', authToken, {
        maxAge: maxAge, path: '/'
    });

	const response = await resolve(event);
	return response;
};