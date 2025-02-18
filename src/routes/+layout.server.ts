import type { LayoutServerLoad } from './$types';
import type { User } from '$types/user';

export const load = (async ({ cookies }) => {
	const authToken = cookies.get('authToken');
	const refreshToken = cookies.get('refreshToken');

	const user: User = {
		username: 'jlargo',
		fullname: 'Juan Carlos Largo Buenahora',
		email: 'jlargo@example.com',
		avatar:
			'https://lh3.googleusercontent.com/a/ACg8ocIX32rPXI4A4mrR7Jh7EMnpvVSYydEn8KqX7mIrdO0l6MvFYgBE=s96-c'
	};

	return {
		user,
		authToken,
		refreshToken
	};
}) satisfies LayoutServerLoad;
