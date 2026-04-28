import React from "react";
import { View, Text, Button } from "react-native";
import { Appointment } from "../interfaces/appointment";
import { styles } from "../styles/appointmentCard.styles";

type AppointmentCardProps = {
  appointment: Appointment;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function AppointmentCard({
  appointment,
  onConfirm,
  onCancel,
}: AppointmentCardProps) {
  function formatCurrency(currency: number): string {
    return currency.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("pt-BR");
  }

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.statusBadge,
          appointment.status === "confirmed" && styles.statusConfirmed,
          appointment.status === "cancelled" && styles.statusCancelled,
        ]}
      >
        <Text style={styles.statusText}>
          {appointment.status.toUpperCase()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Médico</Text>
        <Text style={styles.fee}>{appointment.doctor.name}</Text>
        <Text style={styles.info}>CRM: {appointment.doctor.crm}</Text>
        <Text style={styles.info}>{appointment.doctor.specialty.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Dados da Consulta</Text>
        <Text style={styles.fee}>Data: {formatDate(appointment.date)}</Text>
        <Text style={styles.fee}>Valor: {formatCurrency(appointment.fee)}</Text>
        {appointment.observation && (
          <Text style={styles.observation}>{appointment.observation}</Text>
        )}
      </View>

      <View style={styles.actions}>
        {appointment.status === "scheduled" && (
          <>
            {onConfirm && (
              <View style={styles.containerButton}>
                <Button
                  title="Confirmar Consulta"
                  onPress={onConfirm}
                  color={"#4CAF50"}
                />
              </View>
            )}
            {onCancel && (
              <View style={styles.containerButton}>
                <Button
                  title="Cancelar Consulta"
                  onPress={onCancel}
                  color={"#F44336"}
                />
              </View>
            )}
          </>
        )}

        {appointment.status === "confirmed" && (
          <View style={styles.message}>
            <Text style={styles.textMessage}>
              Consulta confirmada com sucesso!
            </Text>
          </View>
        )}

        {appointment.status === "cancelled" && (
          <View style={styles.cancelledMessage}>
            <Text style={styles.textMessage}>
              Consulta cancelada
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
