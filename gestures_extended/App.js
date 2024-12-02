import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Componente Popup
const Popup = ({ style }) => {
  return (
    <Animated.View style={[styles.popup, style]}>
      <Text style={styles.popupText}>¡Hola! Soy un Popup</Text>
    </Animated.View>
  );
};

// Componente principal
function App() {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  const popupPosition = useSharedValue({ x: 0, y: 0 });
  const popupAlpha = useSharedValue(0); // Estado de visibilidad del popup

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
      ],
    };
  });

  const animatedPopupStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: popupPosition.value.x },
        { translateY: popupPosition.value.y },
      ],
      opacity: popupAlpha.value,
    };
  });

  const dragGesture = Gesture.Pan()
    .onStart((_e) => {
      popupAlpha.value = withTiming(0); // Ocultar el popup cuando se inicia el arrastre
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const longPressGesture = Gesture.Tap().onStart((_event) => {
    console.log("Long press started");
    // Establecer la posición del popup al mismo lugar donde se encuentra el componente
    popupPosition.value = { x: start.value.x, y: start.value.y };
    // Alternar la opacidad (toggle) entre 0 y 1 con animación
    popupAlpha.value = withTiming(popupAlpha.value === 0 ? 1 : 0, {
      duration: 200,
    });
  });

  const composed = Gesture.Race(dragGesture, longPressGesture);

  return (
    <Animated.View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.component, animatedStyles]}>
          <Popup style={animatedPopupStyles} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
  popup: {
    position: "absolute",
    // bottom: "100%", // Ajustar según sea necesario
    backgroundColor: "red",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  popupText: {
    color: "white",
    fontSize: 18,
  },
  component: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    borderRadius: 50,
  },
});

export default function Comp() {
  return (
    <GestureHandlerRootView>
      <App />
    </GestureHandlerRootView>
  );
}
