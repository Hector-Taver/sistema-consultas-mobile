import { Specialty } from '../types/specialty';

export interface Doctor {
    id: number;
    name: string;
    crm: string;
    specialty: Specialty;
    active: boolean;
}
