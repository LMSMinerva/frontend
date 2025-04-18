import type { Token } from '$lib/types/auth';
import type { User } from '$lib/types/user';

class AuthStore {
	private authToken: Token = {
		token: '',
		refreshToken: ''
	};

	private user: User | null = null;

	clearAuthToken() {
		this.authToken = {
			token: '',
			refreshToken: ''
		};
	}

	isAuthenticated() {
		return this.authToken.token !== '';
	}

	getAccessToken() {
		return this.authToken.token;
	}

	getRefreshToken() {
		return this.authToken.refreshToken;
	}

	setAccessToken(token: string) {
		this.authToken.token = token;
	}

	setRefreshToken(token: string) {
		this.authToken.refreshToken = token;
	}
	
	setUser(user: User) {
		this.user = user;
	}

	deleteUser() {
		this.user = null;
	}

	getUser() {
		return this.user;
	}

	refresh() {}
}

export const storeAuth = new AuthStore();
