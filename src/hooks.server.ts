import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get("authToken")
    const refreshToken = event.cookies.get("refreshToken")

    const isLogin = event.url.pathname = "/login"

    if (isLogin) {
        return await resolve(event);
    }

    if (!authToken || !refreshToken) {
        throw redirect(300, "/login")
    }
    
	const response = await resolve(event);
	return response;
};