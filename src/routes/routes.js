import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Products from '../pages/Products';
import Create from '../pages/Create';
import Edit from '../pages/Edit';
import { getItem } from '../utils/storage';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id" element={<Detail />} />

      <Route element={<ProtectedRoutes redirectTo="/login" />}>
        <Route path="/products" element={<Products />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
