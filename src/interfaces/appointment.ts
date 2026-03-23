import { Doctor } from "./doctor";
import { Patient } from "../types/patient";
import { AppointmentStatus } from "../types/appointmentStatus";

export interface Appointment {
    id: number;
    doctor: Doctor;
    patient: Patient;
    date: Date;
    fee: Number;
    status: AppointmentStatus;
    observation?: string;
}
