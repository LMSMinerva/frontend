import type { Institution } from '$types/institution';

export type Course = {
	id: number;
	name: string;
	alias: string;
	active: boolean;
	description: string;
	creation_date: string;
	last_update: string;
	modules: number;
	assessment_items: number;
	reviews: number;
	comments: number;
	rating: string;
	category: string;
	institution: string;
};

export type UserCourse = {
	image: string;
	name: string;
	alias: string;
	reviews: number;
	comments: number;
	rating: string;

	institution: Institution;
	progress: number;
};
