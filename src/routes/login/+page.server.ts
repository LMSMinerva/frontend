import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const username = form.get('username');
        const password = form.get('password');

        const response = await fetch('https://minerva-api-uid2.onrender.com/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        const { refresh, access } = data;

        const maxAge = 60 * 60 * 24 * 7;

        cookies.set('authToken', access, {
			maxAge: maxAge,
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		});

        cookies.set('refreshToken', refresh, {
			maxAge: maxAge,
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		});

        throw redirect(303, "/");
    }
} satisfies Actions;