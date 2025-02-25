import { AuthCookies } from '$lib/server/auth';
import { adminSecret } from '$lib/utils/constants';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import $api from '$lib/services/api';
import type { User } from '$lib/types/user';
import type { SignInResponse } from '$lib/types/auth';

export const load = (async ({ cookies }) => {
	const isAuthenticated = AuthCookies.hasAuthCookies(cookies);

	if (isAuthenticated) {
		redirect(303, '/');
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const response: SignInResponse = await $api('/login-with-email/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		const { access_token, user } = response;
	
		const userData: User = {
			id: user.id,
			username: user?.username,
			fullname: `${user?.profile?.given_name} ${user?.profile?.family_name}`,
			email: user?.profile?.email,
			avatar: user?.profile?.picture
		};
	
		AuthCookies.setAuthCookies(cookies, access_token, '');
		AuthCookies.setUserData(cookies, userData);

		redirect(303, '/');
	}
} satisfies Actions;
