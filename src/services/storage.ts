import AsyncStorage from "@react-native-async-storage/async-storage";
import { Specialty } from "../types/specialty";
import { Doctor } from "../interfaces/doctor";
import { Appointment } from "../interfaces/appointment";

// Definição das chaves
const KEYS = {
  SPECIALTIES: "@appointment:specialties",
  DOCTORS: "@appointment:doctors",
  APPOINTMENTS: "@appointment:appointments",
};

// Salvar array de especialidades
export async function saveSpecialties(specialties: Specialty[]) {
  try {
    await AsyncStorage.setItem(KEYS.SPECIALTIES, JSON.stringify(specialties));
  } catch (error) {
    console.log("Erro ao salvar: ", error);
  }
}

// Buscar array de especialidades
export async function loadSpecialties(): Promise<Specialty[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SPECIALTIES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erro ao obter: ", error);
    return [];
  }
}

// Salvar array de médicos
export async function saveDoctors(doctors: Doctor[]) {
  try {
    await AsyncStorage.setItem(KEYS.DOCTORS, JSON.stringify(doctors));
  } catch (error) {
    console.log("Erro ao salvar: ", error);
  }
}

// Buscar array de médicos
export async function loadDoctors(): Promise<Doctor[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.DOCTORS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erro ao obter: ", error);
    return [];
  }
}

// Salvar array de consultas
export async function saveAppointments(appointments: Appointment[]) {
  try {
    await AsyncStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appointments));
  } catch (error) {
    console.log("Erro ao salvar: ", error);
  }
}

// Buscar array de consultas
export async function loadAppointments(): Promise<Appointment[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erro ao obter: ", error);
    return [];
  }
}
