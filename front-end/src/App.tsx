import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Instruction from './Components/Instruction/Instruction';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
 
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SearchBar />}></Route>
        <Route path="/:id" element={<Instruction />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
