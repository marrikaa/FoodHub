import { Route,Routes } from 'react-router-dom';
import './App.css';
import CreateBlog from './Components/CreateBlog/CreateBlog';
import Header from './Components/Header/Header';
import Instruction from './Components/Instruction/Instruction';
import MyBlogs from './Components/Blogs/MyBlogs';
import MyFavRecipes from './Components/MyFavRecipes/MyFavRecipes';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchForm from './Components/SearchForm/SearchForm';
import SearchFormByIngredients from './Components/SearchFormByIngredients/SearchFormByIngredients';
import { AuthContextProvider } from './Context/AuthContext';
import AllBlogsPage from './Components/Blogs/AllBlogsPage';

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
          <Route path="/blogs" element={<AllBlogsPage />}></Route> 
          <Route path="/myblogs" element={<MyBlogs />}></Route>
          <Route path="/myRecipes" element={<MyFavRecipes />}></Route>
          <Route path="/createBlog" element={<CreateBlog />}></Route>  
          
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
