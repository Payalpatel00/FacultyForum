import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/NavComponent/Nav';
import Footer from './components/FooterComponent/Footer';
import Main from './components/MainComponent/Main';
import Feedback from './components/FeedbackComponent/Feedback';
import Login from './components/LoginComponent/Login';
import Logout from './components/LogoutComponent/Logout';
import Register from './components/RegisterComponent/Register';
import UserHome from './components/UserHomeComponent/userHome';
import AdminHome from './components/AdminHomeComponent/AdminHome';
import Profile from './components/ProfileComponent/Profile';
import FacultyHome from './components/FacultyHomeComponent/FacultyHome';
import FacultyFeedback from './components/FacultyFeedbackComponent/FacultyFeedback';
import CpUser from './components/CpUserComponent/CpUser';
import CpAdmin from './components/CpAdminComponent/CpAdmin';
import EpAdmin from './components/EpAdminComponent/EpAdmin';
import EpUser from './components/EpUserComponent/EpUser';
import EpFaculty from './components/EpFacultyComponent/EpFaculty';
import CpFaculty from './components/CpFacultyComponent/CpFaculty';
import ManageUser from './components/ManageUserComponent/Manageuser';
import Verifyuser from './components/VerifyuserComponent/verifyuser';

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
          <Route  path='/home' element={<Main/>}></Route>
          <Route  path='/user' element={<UserHome/>}></Route>
          <Route  path='/admin' element={<AdminHome/>}></Route>
          <Route  path='/' element={<Main/>}></Route>
          <Route  path='/feedback' element={<Feedback/>}></Route>
          <Route  path='/profile' element={<EpUser/>}></Route>
          <Route  path='/cpuser' element={<CpUser/>}></Route>
          <Route  path='/cpadmin' element={<CpAdmin/>}></Route>
          <Route  path='/cpfaculty' element={<CpFaculty/>}></Route>
          <Route  path='/login' element={<Login/>}></Route>
          <Route  path='/logout' element={<Logout/>}></Route>
          <Route  path='/register' element={<Register/>}></Route> 
          <Route  path='/faculty' element={<FacultyHome/>}></Route> 
          <Route  path='/facultyFeedback' element={<FacultyFeedback/>}></Route> 
          <Route  path='/manageuser' element={<ManageUser/>}></Route> 
          <Route path='/verify/:email' element={<Verifyuser/>}></Route>
          <Route  path='/epadmin' element={<EpAdmin/>}></Route>
          <Route  path='/epfaculty' element={<EpFaculty/>}></Route>

      </Routes>
      <Footer />
    </div>
  );
}

export default App;