import type { Institution } from '$lib/types/institution';
import $api from '$lib/services/api';

export class InstitutionStore {
	async getInstitution(id: string): Promise<Institution | null> {
		try {
			const institution: Institution = await $api(`/institutions/${id}`);
			return institution;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}
