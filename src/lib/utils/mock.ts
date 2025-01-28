import type { UserCourse, Course } from '$types/course';

export function mockCurso(): Course {
	return {
		id: 1,
		name: 'Curso 1',
		alias: 'C1',
		category: 'Categoría 1',
		visibility: true,
		description: 'Descripción del curso 1',
		format: 'Formato del curso 1',
		id_instructor: 'Instructor 1',
		total_students_enrolled: 10,
		creation_date: '2021-01-01'
	};
}

export function mockCursos(): Course[] {
	return [
		{
			id: 1,
			name: 'Curso 1',
			alias: 'C1',
			category: 'Categoría 1',
			visibility: true,
			description: 'Descripción del curso 1',
			format: 'Formato del curso 1',
			id_instructor: 'Instructor 1',
			total_students_enrolled: 10,
			creation_date: '2021-01-01'
		},
		{
			id: 2,
			name: 'Curso 2',
			alias: 'C2',
			category: 'Categoría 2',
			visibility: false,
			description: 'Descripción del curso 2',
			format: 'Formato del curso 2',
			id_instructor: 'Instructor 2',
			total_students_enrolled: 20,
			creation_date: '2021-01-01'
		},
		{
			id: 3,
			name: 'Curso 3',
			alias: 'C3',
			category: 'Categoría 3',
			visibility: true,
			description: 'Descripción del curso 3',
			format: 'Formato del curso 3',
			id_instructor: 'Instructor 3',
			total_students_enrolled: 30,
			creation_date: '2021-01-01'
		},
		{
			id: 4,
			name: 'Curso 4',
			alias: 'C4',
			category: 'Categoría 4',
			visibility: false,
			description: 'Descripción del curso 4',
			format: 'Formato del curso 4',
			id_instructor: 'Instructor 4',
			total_students_enrolled: 40,
			creation_date: '2021-01-01'
		}
	];
}

export function getUserCourses() {
	const inProgress: UserCourse[] = [];
	const completed: UserCourse[] = [];
	const availiable: UserCourse[] = [];
	const mockCourses = [
		{ name: 'Introducción a la Programación', alias: 'intro-programacion' },
		{ name: 'Desarrollo Web con Vue.js', alias: 'vue-desarrollo-web' },
		{ name: 'Bases de Datos SQL', alias: 'bases-datos-sql' },
		{ name: 'Machine Learning Básico', alias: 'machine-learning-basico' },
		{ name: 'Ciberseguridad para Principiantes', alias: 'ciberseguridad-inicial' },
		{ name: 'Diseño UX/UI', alias: 'diseno-ux-ui' }
	];

	for (let i = 0; i < 6; i++) {
		const course = mockCourses[i % mockCourses.length];
		const userCourse: UserCourse = {
			image: ``,
			name: course.name,
			alias: course.alias,
			reviews: Math.floor(Math.random() * 100),
			comments: Math.floor(Math.random() * 50),
			rating: (Math.random() * 5).toFixed(1),
			institution: {
				name: [
					'Universidad Nacional Autónoma de México',
					'Universidad de Buenos Aires',
					'Universidad Complutense de Madrid',
					'Pontificia Universidad Católica de Chile',
					'Universidad de los Andes',
					'Universidad Politécnica de Valencia'
				][i],
				image: ``
			},
			progress: Math.floor(Math.random() * 100)
		};

		if (i < 2) {
			inProgress.push(userCourse);
		} else if (i < 4) {
			completed.push(userCourse);
		} else {
			availiable.push(userCourse);
		}
	}

	return {
		inProgress,
		completed,
		availiable
	};
}
