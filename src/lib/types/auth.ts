export type Token = {
	token: string;
	refreshToken: string;
};

export type GoogleCredentialsResponse = {
	credential: string;
	g_csrf_token: string;
}

export type UserProfile = {
	email: string;
	gender: string;
	birthday_date: string | null;
	role: string;
	picture: string;
	given_name: string;
	family_name: string;
	locale: string;
};

export type User = {
	id: number;
	username: string;
	profile: UserProfile;
};

export type GoogleSignInResponse = {
	access_token: string;
	user: User;
};