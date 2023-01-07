import React from "react";
import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";

const Meals = () => {
  const pagecount = Math.ceil;
  const {
    loading,
    meals,
    selectMeal,
    addToFavorites,
    handlePageClick,
    pageCount,
    currentItem,
  } = useGlobalContext();
  // Number of items per page
  const ITEMS_PER_PAGE = 4;

  // Split the meals array into smaller arrays of 4 items each
  const page1 = meals.slice(0, ITEMS_PER_PAGE);
  const page2 = meals.slice(ITEMS_PER_PAGE, ITEMS_PER_PAGE * 2);
  const page3 = meals.slice(ITEMS_PER_PAGE * 2, ITEMS_PER_PAGE * 3);
  // and so on...

  // Use a state variable to keep track of the current page number
  const [currentPage, setCurrentPage] = React.useState(1);

  // Modify the handlePageClick function to accept a page number as an argument
  const handlePaginationClick = (event) => {
    // Extract the selected page number from the event object
    const selected = event.selected;

    // Update the current page number using the setCurrentPage function
    setCurrentPage(selected);
  };

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }
  let currentPageMeals = [];
  if (currentPage === 0) {
    currentPageMeals = page1;
  } else if (currentPage === 1) {
    currentPageMeals = page2;
  } else if (currentPage === 2) {
    currentPageMeals = page3;
  }

  let pageNumber = Math.ceil(meals.length / ITEMS_PER_PAGE);
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <>
      <section className="section-center">
        <>
          {currentPageMeals.map((singleMeal) => {
            const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
            return (
              <article key={idMeal} className="single-meal">
                <img
                  src={image}
                  className="img"
                  alt={title}
                  onClick={() => selectMeal(idMeal)}
                />
                <footer>
                  <h5>{title}</h5>
                  <button
                    className="like-btn"
                    onClick={() => addToFavorites(idMeal)}
                  >
                    <BsHandThumbsUp />{" "}
                  </button>
                </footer>
              </article>
            );
          })}
        </>
      </section>
      <footer className="pagination">
        <ReactPaginate
          pageCount={pageNumber} // Total number of pages
          pageRangeDisplayed={4} // Number of page numbers to display at a time
          marginPagesDisplayed={2} // Number of pages displayed on either side of the current page
          onPageChange={handlePaginationClick} // Function to call when a page number is clicked
          containerClassName={"paginate-container"} // CSS class name for the pagination container
          subContainerClassName={"pages pagination"} // CSS class name for the page numbers container
          activeClassName={"active"} // CSS class name for the active page number
          pageClassName={"paginate-items"}
          pageLinkClassName={"paginate-links"}
          previousClassName={"paginate-previous"}
          nextClassName={"paginate-next"}
        />
      </footer>
    </>
  );
};

export default Meals;
