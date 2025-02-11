export type Token = {
	token: string;
	refreshToken: string;
};

export type GoogleCredentialsResponse = {
	credential: string;
	g_csrf_token: string;
}