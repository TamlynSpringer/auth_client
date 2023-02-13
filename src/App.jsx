import './App.css';
import {useState} from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';

import {fakeProducts} from './fakedata/fakedata.js';
import {fakecart} from './fakedata/fakecart.js';
import NavBar from './components/Navbar.jsx';
import Cart from './components/checkout/Cart.jsx';
import AdminPage from "./components/admin/AdminPage.jsx";
import ProfileBar from "./components/ProfileBar.jsx";
import ProductList from './components/products/ProductList.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import NewUserForm from './components/login/NewUserForm.jsx';
import SuperAdminPage from "./components/admin/SuperAdminPage.jsx";
import Layout from './components/Layout';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth'
import Users from './components/Users';

function addToCart(productId) {
    console.log("Add " + productId + " From the App")
    //add item to the current Cart
}


function removeFromCart(productId) {
    console.log("Remove " + productId + " From the App")
    //remove item from the current Cart
}

function getCurrentCart() {
    return fakecart;
    //update to get from localstorage
}


function App() {
    const [currentCart, setCurrentCart] = useState(getCurrentCart());
    return (
        <main className="App">
            <header className={"top_header"}>
                <ProfileBar/>
                <NavBar/>
            </header>
            <Routes>
                <Route path='/' element={<Layout />}>
                    {/* public routes */}
                    <Route exact path='/' element={< ProductList products={fakeProducts} addToCart={addToCart}/>}></Route>
                    <Route exact path='register' element={< NewUserForm/>}></Route>
                    <Route exact path='auth' element={< LoginForm/>}></Route>
                    <Route path='links' element={<LinkPage />}></Route>
                    <Route path='users' element={<Users />}></Route> 
                    <Route path='unauthorized' element={<Unauthorized />}></Route>
                    {/* protected routes */}
                    <Route element={<RequireAuth />}>
                        <Route element={<RequireAuth allowedRoles={['user', 'admin', 'super-admin']} />}>
                            <Route exact path='/cart' element={< Cart products={currentCart} removeFromCart={removeFromCart}/>}></Route>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={['admin', 'super-admin']} />}>
                            <Route exact path='/admin' element={< AdminPage/>}></Route>
                        </Route>
                        <Route element={<RequireAuth allowedRoles={['super-admin']} />}>
                            <Route exact path='/admin/super' element={< SuperAdminPage/>}></Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </main>
    )
}

export default App;
