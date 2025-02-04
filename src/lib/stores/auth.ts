class AuthStore {
    getAuthToken() {
        return localStorage.getItem('authToken');
    }
}

export const storeAuth = new AuthStore();