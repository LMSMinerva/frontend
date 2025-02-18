import type { UserCourse, Course } from '$types/course';

export function mockCurso(): Course {
	return {
		id: 1,
		name: 'Curso de Ejemplo',
		alias: 'curso-ejemplo',
		active: true,
		description: 'Descripción del curso de ejemplo',
		creation_date: '2021-01-01',
		last_update: '2021-06-01',
		modules: 5,
		assessment_items: 10,
		reviews: 50,
		comments: 20,
		rating: '4.5',
		category: 'Categoría de Ejemplo',
		institution: 'Institución de Ejemplo'
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
	const available: UserCourse[] = [];
	const mockCourses = [
		{ name: 'Introducción a la Programación', alias: 'intro-programacion' },
		{ name: 'Desarrollo Web con Vue.js', alias: 'vue-desarrollo-web' },
		{ name: 'Bases de Datos SQL', alias: 'bases-datos-sql' },
		{ name: 'Machine Learning Básico', alias: 'machine-learning-basico' },
		{ name: 'Ciberseguridad para Principiantes', alias: 'ciberseguridad-inicial' },
		{ name: 'Diseño UX/UI', alias: 'diseno-ux-ui' }
	];

	for (let i = 0; i < 18; i++) {
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
				][i % 6],
				image: ``
			},
			progress: Math.floor(Math.random() * 100)
		};

		if (i < 6) {
			inProgress.push(userCourse);
		} else if (i < 12) {
			userCourse.progress = 100;
			completed.push(userCourse);
		} else {
			userCourse.progress = 0;
			available.push(userCourse);
		}
	}

	return {
		inProgress,
		completed,
		available
	};
}

export async function mockContents() {
	await new Promise((resolve) => setTimeout(resolve, 3000));

	return [
		{
			id: '1',
			name: 'Notación Big O',
			description: '8 minutos 45 segundos',
			order: 1,
			reviews: 2,
			comments: 32,
			rating: '4.5',
			module: 'module1',
			content_type: 'video_content'
		},
		{
			id: '2',
			name: 'Parcial 1',
			description: '25 preguntas',
			order: 2,
			reviews: 2,
			comments: 32,
			rating: '4.5',
			module: 'module1',
			content_type: 'assesment_content'
		},
		{
			id: '3',
			name: 'Pago en Beris',
			description: '1/3 intentos',
			order: 3,
			reviews: 2,
			comments: 32,
			rating: '4.5',
			module: 'module1',
			content_type: 'assesment_content'
		}
	];
}
