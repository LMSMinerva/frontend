import type { LayoutLoad } from './$types';
import { storeAuth } from '$lib/stores/auth';
import { browser } from '$app/environment';

export const load = (async ({ data }) => {
    if (browser) {
        storeAuth.setAccessToken(data.accessToken || '');
    	storeAuth.setRefreshToken(data.refreshToken || '');
	    if (data.user !== null) storeAuth.setUser(data.user);
    }
    
    return {
        ...data,
    };
}) satisfies LayoutLoad;