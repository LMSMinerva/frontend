import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GoogleOAuthResponse, GoogleSignInResponse } from '$lib/types/auth';
import { apiBaseUrl } from '$lib/utils/constants';
import { AuthCookies } from '$lib/server/auth';
import type { User } from '$lib/types/user';

export const GET: RequestHandler = async ({ request, url, cookies }) => {
	const credentialsText = url.searchParams.toString();
	const decoded = new URLSearchParams(credentialsText);
	const credentials = Object.fromEntries(decoded) as GoogleOAuthResponse;

	const oathCode = credentials.code;
	const response = await fetch(`${apiBaseUrl}/login-with-google/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ code: oathCode })
	});

	if (!response.ok) {
		console.log(
			`Failed to login with Google. Status: ${response.status}, Status Text: ${response.statusText}. Respoonse: ${await response.text()}`
		);
		throw redirect(303, '/login');
	}

	const data: GoogleSignInResponse = await response.json();
	const { access_token, user } = data;

	const userData: User = {
		username: user?.username,
		fullname: `${user?.profile?.given_name} ${user?.profile?.family_name}`,
		email: user?.profile?.email,
		avatar: user?.profile?.picture
	};

	console.log('User data:', JSON.stringify(userData));

	AuthCookies.setAuthCookies(cookies, access_token, '');
	AuthCookies.setUserData(cookies, userData);

	throw redirect(303, '/');
};
