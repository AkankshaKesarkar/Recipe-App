import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });
  const [shoppingList, setShoppingList] = useState(() => {
    const savedList = localStorage.getItem("shoppingList");
    return savedList ? JSON.parse(savedList) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    description: "",
    method: "",
  });

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [recipes, shoppingList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addRecipe = () => {
    if (form.name && form.ingredients && form.description && form.method) {
      setRecipes([...recipes, { ...form }]);
      setForm({ name: "", ingredients: "", description: "", method: "" });
    } else {
      alert("Please fill all fields.");
    }
  };

  const editRecipe = (index) => {
    const recipeToEdit = recipes[index];
    setForm(recipeToEdit);
    deleteRecipe(index);
  };

  const deleteRecipe = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setForm({ name: "", ingredients: "", description: "", method: "" });
  };

  const addToShoppingList = (ingredients) => {
    setShoppingList([...shoppingList, ...ingredients.split(",")]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };
  

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <header>
        <h1>Recipe Manager</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={form.name}
          onChange={handleInputChange}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={form.ingredients}
          onChange={handleInputChange}
        ></textarea>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
        ></textarea>
        <textarea
          name="method"
          placeholder="Method"
          value={form.method}
          onChange={handleInputChange}
        ></textarea>
        <div className="buttons">
          <button onClick={addRecipe}>Add Recipe</button>
          <button onClick={clearForm}>Clear</button>
        </div>
      </div>
      <div className="recipes">
        <h2>Recipes</h2>
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <h3>{recipe.name}</h3>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Description:</strong> {recipe.description}
            </p>
            <p>
              <strong>Method:</strong> {recipe.method}
            </p>
            <div className="recipe-buttons">
              <button onClick={() => addToShoppingList(recipe.ingredients)}>
                Add to Shopping List
              </button>
              <button onClick={() => editRecipe(index)}>Edit</button>
              <button onClick={() => deleteRecipe(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="shopping-list">
        <h2>Shopping List</h2>
        <ol>
        {shoppingList.map((item, index) => (
          <li>
            <p key={index}>{item.trim()}</p>
          </li>
        ))}
        
        </ol>
        <div className="recipe-buttons">
              <button onClick={clearShoppingList}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
