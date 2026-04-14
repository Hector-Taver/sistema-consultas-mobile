import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Specialty } from "../types/specialty";
import { Patient } from "../types/patient";
import { Doctor } from "../interfaces/doctor";
import { Appointment } from "../interfaces/appointment";
import AppointmentCard from "../components/AppointmentCard";
import { styles } from "../styles/app.styles";

export default function Home() {
  const cardiology: Specialty = {
    id: 1,
    name: "Cardiologia",
    description: "Cuidados com o coração",
  }

  const doctor1: Doctor = {
    id: 1,
    name: "Dr. Roberto Silva",
    crm: "CRM12345",
    specialty: cardiology,
    active: true,
  }

  const patient1: Patient = {
    id: 1,
    name: "Carlos Andrade",
    national_id: "123.456.789-00",
    email: "carlos@email.com",
    phone: "(11) 98765-4321"
  }

  const [appointment, setAppointment] = useState<Appointment>({
    id: 1,
    patient: patient1,
    doctor: doctor1,
    date: new Date(2026,2,10),
    fee: 350,
    status: "scheduled",
    observation: "Consulta de rotina",
  });

    function confirmAppointment() {
      setAppointment({
        ...appointment,
        status: "confirmed",
      });
    }

    function cancelAppointment() {
      setAppointment({
        ...appointment,
        status: "cancelled",
      });
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
  )

}
