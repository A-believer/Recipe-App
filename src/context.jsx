import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
const randonMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [meals, setMeals] = useState([]);

    const fetchMeals = async (url) => {

                try {
                    const {data} = await axios(url)
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
    }
    
    useEffect(() => {
        console.log("Bring it!")
        
    fetchMeals(allMealsUrl)
    }, [])
    return (
        <AppContext.Provider value='Man'>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}