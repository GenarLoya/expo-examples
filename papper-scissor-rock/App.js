import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const choices = ["Piedra", "Papel", "Tijera"];

const RPSGame = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  const getComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "¡Es un empate!";
    }
    if (
      (user === "Piedra" && computer === "Tijera") ||
      (user === "Papel" && computer === "Piedra") ||
      (user === "Tijera" && computer === "Papel")
    ) {
      return "¡Ganaste!";
    }
    return "¡Perdiste!";
  };

  const handleChoice = (choice) => {
    const computer = getComputerChoice();
    const gameResult = determineWinner(choice, computer);

    setUserChoice(choice);
    setComputerChoice(computer);
    setResult(gameResult);

    Alert.alert(
      "Resultado",
      `Tu elección: ${choice}\nComputadora: ${computer}\n${gameResult}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piedra, Papel o Tijera</Text>

      {/* Opciones del usuario */}
      <View style={styles.buttonContainer}>
        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleChoice(choice)}
          >
            <Text style={styles.buttonText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Resultado del juego */}
      {userChoice && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Tu elección: {userChoice}</Text>
          <Text style={styles.resultText}>
            Computadora eligió: {computerChoice}
          </Text>
          <Text style={styles.resultText}>{result}</Text>
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
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RPSGame;
