import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Specialty } from "../types/specialty";
import { Patient } from "../types/patient";
import { Doctor } from "../interfaces/doctor";
import { Appointment } from "../interfaces/appointment";
import AppointmentCard from "../components/AppointmentCard";
import { styles } from "../styles/app.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@appointments:current_appointment";

export default function Home() {
  const cardiology: Specialty = {
    id: 1,
    name: "Cardiologia",
    description: "Cuidados com o coração",
  };

  const doctor1: Doctor = {
    id: 1,
    name: "Dr. Roberto Silva",
    crm: "CRM12345",
    specialty: cardiology,
    active: true,
  };

  const patient1: Patient = {
    id: 1,
    name: "Carlos Andrade",
    national_id: "123.456.789-00",
    email: "carlos@email.com",
    phone: "(11) 98765-4321",
  };

  const [appointment, setAppointment] = useState<Appointment>({
    id: 1,
    patient: patient1,
    doctor: doctor1,
    date: new Date(2026, 2, 10),
    fee: 350,
    status: "scheduled",
    observation: "Consulta de rotina",
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  async function saveAppointment(updatedAppointment: Appointment) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedAppointment),
      );
    } catch (error) {
      console.log("Erro ao salvar: ", error);
    }
  }

  async function loadAppointments() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data) {
        const appointmentObject = JSON.parse(data);
        appointmentObject.date = new Date(appointmentObject.date);
        setAppointment(appointmentObject);
      }
    } catch (error) {
      console.log("Erro ao carregar: ", error);
    }
  }

  function confirmAppointment() {
    const updatedAppointment = {
      ...appointment,
      status: "confirmed" as const,
    };
    setAppointment(updatedAppointment);
    saveAppointment(updatedAppointment);
  }

  function cancelAppointment() {
    const updatedAppointment = {
      ...appointment,
      status: "cancelled" as const,
    };
    setAppointment(updatedAppointment);
    saveAppointment(updatedAppointment);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Sistema de Consulta</Text>
          <Text style={styles.subtitle}>Consulta #{appointment.id}</Text>
        </View>
        <AppointmentCard
          appointment={appointment}
          onConfirm={confirmAppointment}
          onCancel={cancelAppointment}
        />
      </ScrollView>
    </View>
  );
}
