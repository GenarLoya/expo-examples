import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";

const RecipeApp = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [procedure, setProcedure] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);

  const addRecipe = () => {
    if (
      recipeName.trim() === "" ||
      ingredients.trim() === "" ||
      procedure.trim() === ""
    ) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    if (editRecipe) {
      // Actualizar receta
      const updatedRecipeList = recipeList.map((recipe) =>
        recipe.id === editRecipe.id
          ? {
              ...recipe,
              name: recipeName,
              ingredients: ingredients,
              procedure: procedure,
            }
          : recipe
      );
      setRecipeList(updatedRecipeList);
      setEditRecipe(null);
    } else {
      // Agregar receta
      setRecipeList([
        ...recipeList,
        {
          id: Math.random().toString(),
          name: recipeName,
          ingredients: ingredients,
          procedure: procedure,
        },
      ]);
    }

    setRecipeName("");
    setIngredients("");
    setProcedure("");
  };

  const deleteRecipe = (id) => {
    setRecipeList(recipeList.filter((recipe) => recipe.id !== id));
  };

  const startEditing = (recipe) => {
    setEditRecipe(recipe);
    setRecipeName(recipe.name);
    setIngredients(recipe.ingredients);
    setProcedure(recipe.procedure);
  };

  const renderItem = ({ item }) => (
    <View style={styles.recipeItem}>
      <Text style={styles.recipeText}>{item.name}</Text>
      <Text style={styles.recipeDetails}>Ingredientes: {item.ingredients}</Text>
      <Text style={styles.recipeDetails}>Procedimiento: {item.procedure}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => startEditing(item)}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteRecipe(item.id)}
        >
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recetario</Text>

      {/* Input para el nombre de la receta */}
      <TextInput
        style={styles.input}
        value={recipeName}
        onChangeText={setRecipeName}
        placeholder="Nombre de la receta"
      />

      {/* Input para los ingredientes */}
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Ingredientes (separados por comas)"
      />

      {/* Input para el procedimiento */}
      <TextInput
        style={styles.input}
        value={procedure}
        onChangeText={setProcedure}
        placeholder="Procedimiento"
      />

      {/* Botón para agregar o actualizar receta */}
      <TouchableOpacity style={styles.addButton} onPress={addRecipe}>
        <Text style={styles.addButtonText}>
          {editRecipe ? "Actualizar Receta" : "Agregar Receta"}
        </Text>
      </TouchableOpacity>
      {editRecipe && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            setRecipeName("");
            setIngredients("");
            setProcedure("");
            setEditRecipe(null);
          }}
        >
          <Text style={styles.addButtonText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      {/* Lista de recetas */}
      <FlatList
        data={recipeList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.recipeList}
      />
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
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
  },
  recipeList: {
    width: "100%",
  },
  recipeItem: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  recipeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeDetails: {
    fontSize: 16,
    marginVertical: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#FF9800",
    padding: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
  },
});

export default RecipeApp;
