
import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add" element={<AddRecipe />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
