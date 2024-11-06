import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("15");
  const [tipAmount, setTipAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    const tipPercent = parseFloat(tipPercentage);

    if (isNaN(bill) || bill <= 0) {
      alert("Por favor ingresa un monto válido para la cuenta");
      return;
    }

    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;

    setTipAmount(tip.toFixed(2));
    setTotalAmount(total.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Propinas</Text>

      {/* Input para el monto de la cuenta */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Monto de la cuenta"
        value={billAmount}
        onChangeText={setBillAmount}
      />

      {/* Input para el porcentaje de la propina */}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Porcentaje de propina"
        value={tipPercentage}
        onChangeText={setTipPercentage}
      />

      {/* Botón para calcular */}
      <TouchableOpacity style={styles.button} onPress={calculateTip}>
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>

      {/* Mostrar los resultados */}
      {tipAmount && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Propina: ${tipAmount}</Text>
          <Text style={styles.resultText}>Total a Pagar: ${totalAmount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TipCalculator;
