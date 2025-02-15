import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GoogleCredentialsResponse } from '$lib/types/auth';

export const GET: RequestHandler = async ({ request, url, cookies }) => {
    const credentialsText = url.searchParams.toString();
    const decoded = new URLSearchParams(credentialsText);
    const credentials = Object.fromEntries(decoded) as GoogleCredentialsResponse;

    return json({ credentials });
};
