import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Instruction from './Components/Instruction/Instruction';
import MyBlogs from './Components/MyBlogs/MyBlogs';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchForm from './Components/SearchForm/SearchForm';
import SearchFormByIngredients from './Components/SearchFormByIngredients/SearchFormByIngredients';
import SignIn from './Components/SignIn/SignIn';
import { AuthContextProvider } from './Context/AuthContext';

function App() {
 
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<SearchBar />}></Route>
          <Route path="/:id" element={<Instruction />}></Route>
          <Route path="/searchDish" element={<SearchForm />}></Route>
          <Route path="/searchDishByIngredients" element={<SearchFormByIngredients />}></Route>
          <Route path="/myblogs" element={<MyBlogs />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
