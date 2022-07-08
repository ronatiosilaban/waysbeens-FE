import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/user';
import Component from './pages/home';
import ComponentUser from './pages/home-user'
import ComponentCart from './pages/cart'
import ComponentDetail from './pages/detail'
import ComponentProfile from './pages/profile'
import ComponentCustomer from './pages/customer'
import ComponentProduct from './pages/add-product'
import ComponentList from './pages/Product'
import ComponentComplain from './pages/complain-user'
import ComponentComplainAdmin from './pages/complain-admin'
import ComponentEditProduct from './pages/edit-product'
import "bootstrap/dist/css/bootstrap.min.css";


import { API, setAuthToken } from './config/api';

// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      navigate('/');
    } else {
      if (state.user.status == 'admin') {
        navigate('/customer');
      } else if (state.user.status == 'customer') {
        navigate('/Home');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Component />} />
      <Route path="Home" element={<ComponentUser />} />
      <Route path="cart" element={<ComponentCart />} />
      <Route path="profile" element={<ComponentProfile />} />
      <Route path="detail/:id" element={<ComponentDetail />} />
      <Route path="customer" element={<ComponentCustomer />} />
      <Route path="List" element={<ComponentList />} />
      <Route path="product" element={<ComponentProduct />} />
      <Route path="complain-user" element={<ComponentComplain />} />
      <Route path="complain-admin" element={<ComponentComplainAdmin />} />
      <Route path="edit-product/:id" element={<ComponentEditProduct />} />
    </Routes>
  );
}

export default App;
