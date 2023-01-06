import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Favorites from './components/Favorites';


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randonMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [favorites, setFavorites] = useState([]);
  
    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        meal = meals.find((meal) => meal.idMeal === idMeal);

        setSelectedMeal(meal)
        setShowModal(true);
    }

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (e) {

      console.log(e.response)
    }
    setLoading(false)
    }
    
    const fetchRandomMeal = () => {
        fetchMeals(randonMealsUrl)
    }

    const addToFavorites =  (idMeal ) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavorite) return
        const updatedFavorites = [...favorites, meal]
        setFavorites(updatedFavorites);
    }

    const removeFromFavorites = (idMeal ) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
        setFavorites(updatedFavorites);
    }
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, []);


     useEffect(() => {
    if (!searchTerm) return
    fetchMeals(`${allMealsUrl}${searchTerm}`)
     }, [searchTerm])
    
    const closeModal = () => {
        setShowModal(false)
    }
    
    return (
        <AppContext.Provider value={{
            loading, meals, setSearchTerm, fetchRandomMeal,
            showModal, selectMeal, selectedMeal, closeModal,
            addToFavorites, removeFromFavorites, favorites
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}