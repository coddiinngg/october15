import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductAll from './page/ProductAll';
import Login from './page/Login';
import { useState } from 'react';
import PrivateRoute from './route/PrivateRoute';
import Navbar from './component/Navbar';

function App() {
  const[authenticate,setAuthenticate] = useState(false)

  const [login, setLogin] = useState(false);

  return (
    <div>
      <Navbar login={login} setLogin={setLogin} setAuthenticate={setAuthenticate}/>
      <Routes>
        <Route path='/' element={<ProductAll/>}></Route>
        <Route path='/login' element={<Login setAuthenticate={setAuthenticate} setLogin={setLogin}/>}></Route>
        <Route path='/products/:id' element={<PrivateRoute authenticate={authenticate}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
