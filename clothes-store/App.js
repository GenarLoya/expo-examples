import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const items = [
  {
    id: 1,
    name: "Camiseta Básica",
    description: "Camiseta de algodón",
    price: 15,
  },
  {
    id: 2,
    name: "Jeans Ajustados",
    description: "Jeans cómodos y ajustados",
    price: 35,
  },
  {
    id: 3,
    name: "Chaqueta de Cuero",
    description: "Chaqueta de cuero de alta calidad",
    price: 80,
  },
  {
    id: 4,
    name: "Sudadera con Capucha",
    description: "Sudadera cómoda para días fríos",
    price: 50,
  },
  {
    id: 5,
    name: "Zapatos Deportivos",
    description: "Zapatos deportivos ideales para ejercicio",
    price: 60,
  },
  {
    id: 6,
    name: "Sombrero de Paja",
    description: "Sombrero ligero para el verano",
    price: 20,
  },
];

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedItem, setSelectedItem] = useState(null); // Estado para la prenda seleccionada

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item); // Cambia la prenda seleccionada al hacer clic
  };

  const handleBuy = (item) => {
    Alert.alert(
      "¡Gracias por tu compra!",
      `Has comprado: ${item.name} por $${item.price}`
    );
    setSelectedItem(null); // Cierra los detalles después de la compra
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemSelect(item)}>
      <View style={styles.item}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda de Ropa</Text>

      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar productos"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Si hay una prenda seleccionada, mostramos los detalles */}
      {selectedItem ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detalles de la Prenda</Text>
          <Text style={styles.detailsName}>{selectedItem.name}</Text>
          <Text style={styles.detailsDescription}>
            {selectedItem.description}
          </Text>
          <Text style={styles.detailsPrice}>${selectedItem.price}</Text>

          {/* Botón para comprar */}
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => handleBuy(selectedItem)}
          >
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>

          {/* Botón para regresar a la lista de productos */}
          <TouchableOpacity onPress={() => setSelectedItem(null)}>
            <Text style={styles.goBackButton}>Volver a la tienda</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Si no hay prenda seleccionada, mostramos la lista
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 5,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsDescription: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  detailsPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  buyButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  goBackButton: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default Store;
