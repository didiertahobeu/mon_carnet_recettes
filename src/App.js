
import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';

function App() {
  const recipes = [
    {
      title: "Tarte aux pommes",
      image: "https://placehold.co/600x400/orange/white?text=Tarte+aux+pommes",
      ingredients: ["Pommes", "Pâte", "Sucre", "Cannelle"]
    },
    {
      title: "Quiche Lorraine",
      image: "https://placehold.co/600x400/green/white?text=Quiche+Lorraine",
      ingredients: ["Pâte brisée", "Lardons", "Œufs", "Crème fraîche"]
    },
    {
      title: "Salade Niçoise",
      image: "https://placehold.co/600x400/pink/white?text=Salade+Nicoise",
      ingredients: ["Tomates", "Œufs durs", "Olives", "Thon", "Haricots verts"]
    }
  ];

  return (
    <>
      <Header  />
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        {recipes.map((recipe, index) => (
          <RecipeCard 
            key={index}
            title={recipe.title}
            image={recipe.image}
            ingredients={recipe.ingredients}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
