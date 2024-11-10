import type { LayoutServerLoad } from './$types';
import type { Usuario } from '$lib/types';

export const load = (async () => {
	const user: Usuario = {
		username: 'jlargo',
		fullname: 'Juan Carlos L',
		email: 'jlargo@example.com',
		avatar:
			'https://lh3.googleusercontent.com/a/ACg8ocIX32rPXI4A4mrR7Jh7EMnpvVSYydEn8KqX7mIrdO0l6MvFYgBE=s96-c'
	};

	return {
		user: user
	};
}) satisfies LayoutServerLoad;
