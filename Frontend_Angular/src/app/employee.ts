export class Employee {
    id?: number;
    firstName!: string;
    lastName !: string;
    emailId !: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
}
