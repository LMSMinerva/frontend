import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GoogleCredentialsResponse } from '$lib/types/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
    const credentialsText = await request.text();
    const decoded = new URLSearchParams(credentialsText);
    const credentials: GoogleCredentialsResponse = Object.fromEntries(decoded) as GoogleCredentialsResponse;

    console.log(credentials.credential);
    
    const maxAge = 60 * 60 * 24 * 7;

    cookies.set('authToken', credentials.credential, {
        maxAge: maxAge,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });

    cookies.set('refreshToken', credentials.g_csrf_token, {
        maxAge: maxAge,
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    });

    throw redirect(303, '/');
};