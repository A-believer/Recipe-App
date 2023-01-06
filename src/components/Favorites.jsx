import { useGlobalContext } from "../context"
import {ImCancelCircle} from 'react-icons/im'

const Favorites = () => {

    const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()
    


    return (
        <section className="favorites">
            <div className="favorites-content">
                <h5>Favorites</h5>
                <div className="favorites-container">
                {favorites.map((item) => {
                    const { idMeal, strMeal: title, strMealThumb: image } = item;

                    return <div key={idMeal} className="favorite-item">
                        <img src={image} className="favorites-img img" alt={title} />
                        <button className="remove-btn"
                            onClick={() => removeFromFavorites(idMeal)}>
                            <ImCancelCircle /></button>
                    </div>
                })}
                </div>
            </div>
        </section>
    )
}

export default Favorites