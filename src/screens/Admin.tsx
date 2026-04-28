import React, { useState, useEffect, use } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  loadSpecialties,
  saveSpecialties,
  loadDoctors,
  saveDoctors,
  loadAppointments,
  saveAppointments,
} from "../services/storage";
import { Specialty } from "../types/specialty";
import { Doctor } from "../interfaces/doctor";
import { Patient } from "../types/patient";
import { Appointment } from "../interfaces/appointment";
import { styles } from "../styles/admin.styles";

export default function Admin({ navigation }: any) {
  const [specialtyName, setSpecialtyName] = useState("");
  const [specialtyDescription, setSpecialtyDescription] = useState("");
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const [doctorName, setDoctorName] = useState("");
  const [doctorCrm, setDoctorCrm] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const specialties = await loadSpecialties();
    const doctors = await loadDoctors();
    setSpecialties(specialties);
    setDoctors(doctors);
  }

  function addNewSpecialty() {
    if (!specialtyName || !specialtyDescription) {
      Alert.alert("Erro", "Prrecha o nome e descrição");
      return;
    }

    const newSpecialty: Specialty = {
      id: specialties.length + 1,
      name: specialtyName,
      description: specialtyDescription,
    };

    const newSpecialties = [...specialties, newSpecialty];
    setSpecialties(newSpecialties);
    saveSpecialties(newSpecialties);

    setSpecialtyName("");
    setSpecialtyDescription("");
    Alert.alert("Sucesso", "Especialidade adicionada");
  }

  function addNewDoctor() {
    if (!doctorName || !doctorCrm) {
      Alert.alert("Erro", "Preencha nome e CRM");
      return;
    }

    if (specialties.length === 0) {
      Alert.alert("Erro", "Adicione uma especialidade primeiro!");
      return;
    }

    const newDoctor: Doctor = {
      id: doctors.length + 1,
      name: doctorName,
      crm: doctorCrm,
      specialty: specialties[0],
      active: true,
    };

    const newDoctors = [...doctors, newDoctor];
    setDoctors(newDoctors);
    saveDoctors(newDoctors);

    setDoctorName("");
    setDoctorCrm("");
    Alert.alert("Sucesso", "Médico adicionado!");
  }

  async function createTestAppointment() {
    if (!patientName || !appointmentDate) {
      Alert.alert("Erro", "Preencha nome do paciente e data");
      return;
    }

    if (doctors.length === 0) {
      Alert.alert("Erro", "Adicione um médico primeiro!");
      return;
    }

    // Paciente fictício
    const testPatient: Patient = {
      id: 1,
      name: patientName,
      national_id: "123.456.789-00",
      email: "patient@email.com",
      phone: "(11) 98765-4321",
    };

    const [day, month, year] = appointmentDate.split("/");
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const newAppointment: Appointment = {
      id: Date.now(),
      doctor: doctors[0],
      patient: testPatient,
      date: date,
      fee: 350,
      status: "scheduled",
      observation: "Consulta de teste",
    };

    const currentAppointments = await loadAppointments();
    await saveAppointments([...currentAppointments, newAppointment]);

    setPatientName("");
    setAppointmentDate("");

    Alert.alert("Sucesso", "Consulta criada! Volte para a Home", [
      { text: "OK", onPress: () => navigation.navigate("Home") },
    ]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          {/* === ESPECIALIDADES === */}
          <Text style={styles.title}>1. Adicionar Especialidade</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome da especialidade"
            value={specialtyName}
            onChangeText={setSpecialtyName}
          />

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={specialtyDescription}
            onChangeText={setSpecialtyDescription}
          />
          <Button title="Adicionar Especialidade" onPress={addNewSpecialty} />

          {/* Lista de especialidades */}
          <View>
            {specialties.map((specialty) => (
              <Text key={specialty.id} style={styles.item}>
                • {specialty.name} - {specialty.description}
              </Text>
            ))}
          </View>
        </View>

        {/* === MÉDICOS === */}
        <View style={styles.section}>
          <Text style={styles.title}>2. Adicionar Médicos</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do médico"
            value={doctorName}
            onChangeText={setDoctorName}
          />

          <TextInput
            style={styles.input}
            placeholder="CRM"
            value={doctorCrm}
            onChangeText={setDoctorCrm}
          />
          <Button title="Adicionar Médico" onPress={addNewDoctor} />

          {/* Lista de médicos */}
          <View style={styles.list}>
            {doctors.map((doctor) => (
              <Text key={doctor.id} style={styles.item}>
                • {doctor.name} {doctor.crm} - {doctor.specialty.name}
              </Text>
            ))}
          </View>
        </View>

        {/* === CONSULTARS === */}
        <View style={styles.section}>
          <Text style={styles.title}>3. Criar Consulta de Teste</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do paciente"
            value={patientName}
            onChangeText={setPatientName}
          />
          <TextInput
            style={styles.input}
            placeholder="Data (DD/MM/AAAA)"
            value={appointmentDate}
            onChangeText={setAppointmentDate}
          />
          <Button title="Criar Consulta" onPress={createTestAppointment} />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
