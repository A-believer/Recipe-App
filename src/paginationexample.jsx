/* eslint-disable no-unused-vars */
const { useState, createContext, useContext, useEffect } = React;

const PaginationContext = createContext();

const PaginationProvider = ({ children }) => {
  const [pagination, setPagination] = useState({
    limit: 10,
    total: numbers.length,
    start: 0,
    page: 1,
    perPage: 10,
    showPrevButton: false,
    showFirstPageButton: false,
    showNextButton: false,
    showLastPageButton: false
  });
  
  return (
    <PaginationContext.Provider value={[pagination, setPagination]}>
      {children}   
    </PaginationContext.Provider>
  )
}

const numbers = [1,2,3,4,5,6,7,8,9, 10,
                 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

const state = {
  limit: 10,
  total: numbers.length,
  start: 0,
  page: 1,
  perPage: 10,
}

const Page = () => { 
  const [pagination, setPagination] = useContext(PaginationContext)
  const data = numbers;
  const numberOfPages = Math.ceil(numbers.length / pagination.limit);
  
  const navigateToPage = (pageNumber) => {
    setPagination({
      ...pagination,
      page: pageNumber,
      start: (pageNumber - 1) * pagination.limit,
      perPage: (pageNumber * pagination.limit),
    });
  };
  
  useEffect(() => {
    navigateToPage(1)
  }, [navigateToPage])
  
   return (
     <>
       <h1>
        {data.slice(pagination.start, pagination.perPage).map(number => <p>{number}</p>)}
       </h1>
       
       {pagination.page > 2 && <button onClick={() => navigateToPage(1)}>First</button>}
       {pagination.page > 1 && <button onClick={() => navigateToPage(pagination.page - 1)}>Prev</button>}
       {[...Array(100)].slice(0, numberOfPages).map((x, i) =>
          <button onClick={() => navigateToPage(i + 1)}>{i + 1}</button>
        )}
       
       {pagination.page !== numberOfPages && <button onClick={() => navigateToPage(pagination.page + 1)}>Next</button>}
       {pagination.page < Math.ceil(numberOfPages / 2 + 1) && <button onClick={() => navigateToPage(numberOfPages)}>Last</button>}
       
     </>
  )
}

const App = () => {
  
  return (
    <PaginationProvider>
      <Page />
    </PaginationProvider>
  )
}

const mainNode = document.getElementById("app");
// eslint-disable-next-line no-undef
ReactDOM.render(<App />, mainNode);