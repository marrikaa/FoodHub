import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Instruction from './Components/Instruction/Instruction';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchForm from './Components/SearchForm/SearchForm';
import SearchFormByIngredients from './Components/SearchFormByIngredients/SearchFormByIngredients';

function App() {
 
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SearchBar />}></Route>
        <Route path="/:id" element={<Instruction />}></Route>
        <Route path="/searchDish" element={<SearchForm />}></Route>
        <Route path="/searchDishByIngredients" element={<SearchFormByIngredients />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
