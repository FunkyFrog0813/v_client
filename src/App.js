
import {HashRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Update from './path/Update';
import AllBrand from './path/AllBrand';
import Add from './path/Add';
import Search from './path/Search';



function App() {
  return (
    <div className="App">
      <HashRouter >
      <Routes>
      <Route path="/" element={<Search/>}/>
        <Route path="/allbrands" element={<AllBrand/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      </HashRouter>
    </div>
  );
}

export default App;