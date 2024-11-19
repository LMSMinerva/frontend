import type { Curso } from "$lib/types";

export function mockCurso(): Curso {
    return {
        id: 1,
        name: "Curso 1",
        alias: "C1",
        category: "Categoría 1",
        visibility: true,
        description: "Descripción del curso 1",
        format: "Formato del curso 1",
        id_instructor: "Instructor 1",
        total_students_enrolled: 10,
        creation_date: "2021-01-01",
    };
}

export function mockCursos(): Curso[] {
    return [
        {
            id: 1,
            name: "Curso 1",
            alias: "C1",
            category: "Categoría 1",
            visibility: true,
            description: "Descripción del curso 1",
            format: "Formato del curso 1",
            id_instructor: "Instructor 1",
            total_students_enrolled: 10,
            creation_date: "2021-01-01",
        },
        {
            id: 2,
            name: "Curso 2",
            alias: "C2",
            category: "Categoría 2",
            visibility: false,
            description: "Descripción del curso 2",
            format: "Formato del curso 2",
            id_instructor: "Instructor 2",
            total_students_enrolled: 20,
            creation_date: "2021-01-01",
        },
        {
            id: 3,
            name: "Curso 3",
            alias: "C3",
            category: "Categoría 3",
            visibility: true,
            description: "Descripción del curso 3",
            format: "Formato del curso 3",
            id_instructor: "Instructor 3",
            total_students_enrolled: 30,
            creation_date: "2021-01-01",
        },
        {
            id: 4,
            name: "Curso 4",
            alias: "C4",
            category: "Categoría 4",
            visibility: false,
            description: "Descripción del curso 4",
            format: "Formato del curso 4",
            id_instructor: "Instructor 4",
            total_students_enrolled: 40,
            creation_date: "2021-01-01",
        }
    ];
}