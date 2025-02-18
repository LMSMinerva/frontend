import type { Cookies } from "@sveltejs/kit";

export class AuthCookies {
    private static readonly ACCESS_TOKEN_COOKIE_NAME = 'access_token';
    private static readonly REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
    private static readonly MAX_AGE = 60 * 60 * 24 * 7; // 1 week

    static setAuthCookies(cookies: Cookies, accessToken: string, refreshToken: string): void {
        this.setCookie(cookies, this.ACCESS_TOKEN_COOKIE_NAME, accessToken);
        this.setCookie(cookies, this.REFRESH_TOKEN_COOKIE_NAME, refreshToken);
    }

    static deleteAuthCookies(cookies: Cookies): void {
        this.deleteCookie(cookies, this.ACCESS_TOKEN_COOKIE_NAME);
        this.deleteCookie(cookies, this.REFRESH_TOKEN_COOKIE_NAME);
    }

    static hasAuthCookies(cookies: Cookies): boolean {
        return cookies.get(this.ACCESS_TOKEN_COOKIE_NAME) !== undefined;
    }

    private static setCookie(cookies: Cookies, cookieName: string, cookieValue: string): void {
        cookies.set(cookieName, cookieValue, {
            maxAge: this.MAX_AGE,
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
    }

    private static deleteCookie(cookies: Cookies, cookieName: string): void {
        cookies.delete(cookieName, { path: '/' })
    }
}