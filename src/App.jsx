import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useState} from 'react';
import RestaurantDetail from './pages/RestautantDetail';
import Login from './pages/Login';
import Otp from './pages/Otp';
import RestaurantList from './pages/RestaurantList';
import './App.css';

const App = () => {
    const [isAuth, setIsAuth] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    return(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Navigate to = "/login" />} />
            <Route path = "/login" element = {<Login/>} />
            <Route path = "/otp" element = {<Otp/>} />
            <Route path = "/list" element = {isAuth ? <RestaurantList /> : <Navigate to = "/login" />} />
            <Route path="/detail/:id" element={isAuth ? <RestaurantDetail /> : <Navigate to="/login" />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
