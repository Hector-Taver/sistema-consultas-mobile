import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
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
  statusConfirmed: {
    backgroundColor: "#4CAF50",
  },
  statusCancelled: {
    backgroundColor: "#F44336",
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0"
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#79059C",
    marginBottom: 8,
  },
  fee: {
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  observation: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
    marginTop: 8,
  },
  actions: {
    marginTop: 10,
  },
  containerButton: {
    marginBottom: 12,
  },
  message: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  cancelledMessage: {
    backgroundColor: "#FFEBEE",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  textMessage: {
    fontSize: 16,
    color: "#333",
    fontWeight: 600,
    textAlign: "center",
  },
})
