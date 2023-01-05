import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randonMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchMeals = async (url) => {
        setLoading(true);
                try {
                    const { data } = await axios.get(url)
                    if (data.meals) {
                        setMeals(data.meals)
                    } else {
                        setMeals([]);
                    }
                } catch (e) {
                    console.log(e.response)
        }
        setLoading(false)
    }
    
    useEffect(() => {
    fetchMeals(`${allMealsUrl}${setSearchText}`)
    }, [searchText])
    return (
        <AppContext.Provider value={{loading, meals, setSearchText}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}