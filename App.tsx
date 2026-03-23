import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Specialty } from "./src/types/specialty";
import { Patient } from "./src/types/patient";
import { Doctor } from "./src/interfaces/doctor";
import { Appointment } from "./src/interfaces/appointment";


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

export default function App() {
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

  function formatValue(value: Number):String {
      return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatDate(date: Date): String {
    return date.toLocaleDateString("pt-BR");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Sistema de Consultas</Text>
          <Text style={styles.subtitulo}>Consulta #{appointment.id}</Text>
        </View>

        {/* Card da Consulta */}
        <View style={styles.card}>
          {/* Status Badge */}
          <View style={[
            styles.statusBadge,
            appointment.status === "confirmed" && styles.statusConfirmada,
            appointment.status === "cancelled" && styles.statusCancelada,
          ]}>
            <Text style={styles.statusTexto}>{appointment.status.toUpperCase()}</Text>
          </View>

          {/* Informações do Médico */}
          <View style={styles.secao}>
            <Text style={styles.label}>👨‍⚕️ Médico</Text>
            <Text style={styles.valor}>{appointment.doctor.name}</Text>
            <Text style={styles.info}>CRM: {appointment.doctor.crm}</Text>
            <Text style={styles.info}>{appointment.doctor.specialty.name}</Text>
          </View>

          {/* Informações do Paciente */}
          <View style={styles.secao}>
            <Text style={styles.label}>👤 Paciente</Text>
            <Text style={styles.valor}>{appointment.patient.name}</Text>
            <Text style={styles.info}>CPF: {appointment.patient.national_id}</Text>
            <Text style={styles.info}>Email: {appointment.patient.email}</Text>
            {appointment.patient.phone && (
              <Text style={styles.info}>Tel: {appointment.patient.phone}</Text>
            )}
          </View>

          {/* Informações da Consulta */}
          <View style={styles.secao}>
            <Text style={styles.label}>📅 Dados da Consulta</Text>
            <Text style={styles.valor}>Data: {formatDate(appointment.date)}</Text>
            <Text style={styles.valor}>Valor: {formatValue(appointment.fee)}</Text>
            {appointment.observation && (
              <Text style={styles.observacoes}>{appointment.observation}</Text>

          )}
          </View>

          {/* Botões de Ação */}
          <View style={styles.acoes}>
            {appointment.status === "scheduled" && (
              <>
                <View style={styles.botaoContainer}>
                  <Button
                    title="Confirmar Consulta"
                    onPress={confirmAppointment}
                    color="#4CAF50"
                  />
                </View>
                <View style={styles.botaoContainer}>
                  <Button
                    title="Cancelar Consulta"
                    onPress={confirmAppointment}
                    color="#F44336"
                  />
                </View>
              </>
            )}
            {appointment.status === "confirmed" && (
              <View style={styles.mensagem}>
                <Text style={styles.mensagemTexto}>✓ Consulta confirmada com sucesso!</Text>
              </View>
            )}
            {appointment.status === "cancelled" && (
              <View style={styles.mensagemCancelada}>
                <Text style={styles.mensagemTexto}>✗ Consulta cancelada</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#79059C",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statusBadge: {
    backgroundColor: "#FFA500",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusConfirmada: {
    backgroundColor: "#4CAF50",
  },
  statusCancelada: {
    backgroundColor: "#F44336",
  },
  statusTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  secao: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 8,
  },
  valor: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  observacoes: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
  },
  acoes: {
    marginTop: 10,
  },
  botaoContainer: {
    marginBottom: 12,
  },
  mensagem: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  mensagemCancelada: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  mensagemTexto: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  rodape: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  rodapeTexto: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    lineHeight: 18,
  }
});
