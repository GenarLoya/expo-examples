import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";

const API_KEY = "f8fcbaa1101d4f5e843205623240611"; // Reemplaza con tu API Key de WeatherAPI

const Weather = () => {
  const [location, setLocation] = useState("29.969212,-107.056298"); // Coordenadas por defecto
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputLocation, setInputLocation] = useState(location);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=5&q=${inputLocation}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city or coordinates"
        value={inputLocation}
        onChangeText={setInputLocation}
      />
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {weatherData && (
        <View style={styles.weatherContainer}>
          {/* Datos actuales */}
          <Text style={styles.cityName}>
            {weatherData.location.name}, {weatherData.location.region}
          </Text>
          <Text style={styles.temperature}>
            {weatherData.current.temp_c} °C
          </Text>
          <Text style={styles.condition}>
            <Text style={styles.conditionText}>
              {weatherData.current.condition.text}
            </Text>
            <Text style={styles.conditionIcon}>
              <img
                src={`https:${weatherData.current.condition.icon}`}
                alt="weather icon"
                style={{ width: 50, height: 50 }}
              />
            </Text>
          </Text>
          <Text style={styles.wind}>
            Wind: {weatherData.current.wind_kph} kph
          </Text>
          <Text style={styles.humidity}>
            Humidity: {weatherData.current.humidity}%
          </Text>

          {/* Pronóstico diario */}
          <ScrollView style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>5-Day Forecast</Text>
            {weatherData.forecast.forecastday.map((day, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDate}>{day.date}</Text>
                <Text style={styles.forecastCondition}>
                  {day.day.condition.text}
                </Text>
                <Text style={styles.forecastTemp}>
                  Max: {day.day.maxtemp_c} °C, Min: {day.day.mintemp_c} °C
                </Text>
                <Text style={styles.forecastRain}>
                  Chance of Rain: {day.day.daily_chance_of_rain}%
                </Text>
                <Text style={styles.forecastWind}>
                  Max Wind: {day.day.maxwind_kph} kph
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  weatherContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 24,
  },
  conditionText: {
    fontSize: 18,
  },
  condition: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 8,
  },
  wind: {
    fontSize: 16,
    marginTop: 8,
  },
  humidity: {
    fontSize: 16,
    marginTop: 8,
  },
  forecastContainer: {
    marginTop: 20,
    width: "100%",
  },
  forecastTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  forecastItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: "bold",
  },
  forecastCondition: {
    fontSize: 16,
  },
  forecastTemp: {
    fontSize: 16,
  },
  forecastRain: {
    fontSize: 16,
  },
  forecastWind: {
    fontSize: 16,
  },
});

export default Weather;
