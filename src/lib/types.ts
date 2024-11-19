export type Curso = {
	id: number;
	name: string;
	alias: string;
	category: string;
	visibility: boolean;
	description: string;
	format: string;
	id_instructor: string;
	total_students_enrolled: number;
	creation_date: string;
};

export type Usuario = {
	username: string;
	fullname: string;
	email: string;
	avatar: string;
};
