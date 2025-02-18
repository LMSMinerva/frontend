import { AuthCookies } from '$lib/server/auth';
import { adminSecret } from '$lib/utils/constants';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies }) => {
	const authToken = cookies.get('authToken');

	if (authToken) {
		throw redirect(303, '/');
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		/*
		const response = await fetch('https://minerva-api-uid2.onrender.com/api/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		const data = await response.json();
		const { refresh, access } = data;
		*/

		const refresh = "123";
		const access = btoa(adminSecret);

		AuthCookies.setAuthCookies(cookies, access, refresh);

		throw redirect(303, '/');
	}
} satisfies Actions;
