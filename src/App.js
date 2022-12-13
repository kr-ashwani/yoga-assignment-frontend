import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLoading from './components/AppLoading/AppLoading';
import YogaEnroll from './pages/YogaEnroll/YogaEnroll';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import PrivateRoute from './privateRoute';
import Homepage from './pages/Homepage/Homepage';

function App() {
  return (
    <>
      <AppLoading />

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/yogaenroll"
          element={
            <PrivateRoute>
              <YogaEnroll />
            </PrivateRoute>
          }></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </>
  );
}

export default App;
