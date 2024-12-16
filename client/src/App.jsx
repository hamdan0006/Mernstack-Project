import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import {Services} from './pages/Services';
import Register from './pages/Register';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import {Logout} from './pages/Logout';
import Private from './pages/Private';
import { AdminLayout } from './components/layouts/Admin-layout';
import { AdminUsers } from './pages/AdminUsers';
import { AdminContacts } from './pages/AdminContacts';
import { AdminUpdate } from './pages/Admin-Update';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/private' element={<Private/>} />
        <Route path='/admin' element = {<AdminLayout/>}>
          <Route path='users' element={<AdminUsers/>} />
          <Route path='contacts' element={<AdminContacts/>} />
          <Route path='/admin/users/:id' element={<AdminUpdate/>} />


         



        </Route>



      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
