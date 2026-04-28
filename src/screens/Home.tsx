import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appointment } from "../interfaces/appointment";
import AppointmentCard from "../components/AppointmentCard";
import { styles } from "../styles/app.styles";
// Funções do Service Layer
import { loadAppointments, saveAppointments } from "../services/storage";

export default function Home({ navigation }: any) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    bringAppointments();
  }, [])

  async function bringAppointments() {
    const savedAppointments = await loadAppointments();
    setAppointments(savedAppointments);
  }

  async function confirmAppointment(appointmentId: number) {
    const updatedAppointments = appointments.map((c) =>
      c.id === appointmentId ? { ...c, status: "confirmed" as const } : c
    )

    setAppointments(updatedAppointments);
    await saveAppointments(updatedAppointments);
  }

  async function cancelAppointment(appointmentId: number) {
    const updatedAppointments = appointments.map((c) =>
      c.id === appointmentId ? { ...c, status: "cancelled" as const } : c
    )

    setAppointments(updatedAppointments)
    await saveAppointments(updatedAppointments)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Minhas Consultas</Text>
          <Text style={styles.subtitle}>
            {appointments.length} consulta(s) agendadas(s)
          </Text>
        </View>

        {appointments.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#666", marginBottom: 20 }}>
              Nenhuma consulta agendada ainda
            </Text>

            <Button
              title="Ir para Admin"
              onPress={() => navigation.navigate("Admin")}
            />
          </View>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onConfirm={() => confirmAppointment(appointment.id)}
              onCancel={() => cancelAppointment(appointment.id)}

            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
