import { useGlobalContext } from "../context"
import { BsHandThumbsUp } from 'react-icons/bs'
import ReactPaginate from 'react-paginate';
import {  GrLinkPrevious, GrLinkNext} from 'react-icons/gr'

const Meals = () => {
    const { loading, meals, selectMeal, addToFavorites, handlePageClick, pageCount, currentItem } = useGlobalContext();
    

    if (loading) {
        return <section className="section">
            <h4>Loading...</h4>
        </section>
    }

    if (meals.length < 1) {
        return <section className="section">
            <h4>
                No meals matched your search term. Please try again.
            </h4>
        </section>
    }

    return (
        <section className="section-center">
<>
            {currentItem.map((singleMeal) => {
                const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
                return <article key={idMeal} className='single-meal'>
                    <img src={image} className="img"
                        alt={title}
                        onClick={() => selectMeal(idMeal)} />
                    <footer>
                        <h5>{title}</h5>
                        <button className="like-btn"
                            onClick={() => addToFavorites(idMeal)}>
                            <BsHandThumbsUp /> </button>
                    </footer>
                 </article>
            })}

            </>
            <footer className="pagination">
                <ReactPaginate 
                    previousLabel={<GrLinkPrevious/>}
                    nextLabel={<GrLinkNext/>}
                    pageCount={pageCount}
                    onPageChange={() => handlePageClick()}
                    containerClassName='paginate-container'
                    pageClassName={'paginate-items'}
                    pageLinkClassName={"paginate-links"}
                    previousClassName={"paginate-previous"}
                    nextClassName={"paginate-next"}
                    // activeClassName={"paginate-active"}
                    renderOnZeroPageCount={null}
                />    
</footer>
                     
        </section>
    )
}

export default Meals