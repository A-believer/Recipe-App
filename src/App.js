
import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <h1>Recipe App</h1>
      {/* <Favorites /> */}
      <Meals />
      {/* <Modal/> */}
      {/* <Search/> */}
    </div>
  );
}

export default App;
