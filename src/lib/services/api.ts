import { apiBaseUrl } from "$lib/utils/constants";
import { storeAuth } from "$lib/stores/auth";

function getAuthToken(): string | null {
    return storeAuth.getAuthToken();
}

function createHeaders(options: RequestInit = {}): HeadersInit {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'authorization': `Basic ${token}`,
        ...options.headers,
    };
}

async function handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
}

interface ApiOptions extends RequestInit {
    headers?: HeadersInit;
}

async function $api(endpoint: string, options: ApiOptions = {}): Promise<any> {
    const headers = createHeaders(options);
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        ...options,
        headers,
    });
    return handleResponse(response);
}

export default $api;