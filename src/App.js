
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import { recipes as initialRecipes } from './datas/recipesList';

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home recipes={recipes} setRecipes={setRecipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe recipes={recipes} setRecipesChild={setRecipes} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
