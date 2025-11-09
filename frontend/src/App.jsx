import {BrowserRouter , Route , Routes } from 'react-router-dom';
import LogSignPage from './page/global/LogSignPage';
import UserPage from './page/user/UserPage';
import Dashboard from './page/user/Dashboard/Dashboard';
import ReservationForm from './page/user/ReservationForm/ReservationForm';
import CheckVenue from './page/user/CheckVenue/CheckVenue';
import UserProfile from './page/user/UserProfile/UserProfile';
import AdminPage from './page/admin/AdminPage';
import AdminLogin from './page/admin/AdminLogin';
import AdminDashboard from './page/admin/Dashboard/AdminDashboard';
import CreateVenue from './page/admin/CreateVenue/CreateVenue';
import CreateNews from './page/admin/CreateNews/CreateNews';
import Reservations from './page/admin/Reservations/Reservations';
import Inventories from './page/admin/Inventories/Inventories';

function App() {
  

  return (
    <>
      <BrowserRouter>

            <Routes>
                <Route path='/login' element={<LogSignPage login={true}/>} />
                <Route path='/signup' element={<LogSignPage login={false}/>} />

                <Route path='/admin/login' element={<AdminLogin/>} />


                <Route path='/' element={<UserPage/>}>
                  <Route index path='dashboard' element={<Dashboard/>} />
                  <Route path='reserve' element={<ReservationForm/>}/>
                  <Route path='check' element={<CheckVenue/>}/>
                  <Route path='profile' element={<UserProfile/>} />
                </Route>

                <Route path='/admin' element={<AdminPage/>}>
                  <Route path='dashboard' element={<AdminDashboard/>} />
                  <Route path='venues' element={<CreateVenue/>} />
                  <Route path='news' element={<CreateNews/>} />
                  <Route path='active' element={<Reservations active={true}/>} />
                  <Route path='past' element={<Reservations active={false}/>} />
                  <Route path='inventories' element={<Inventories/>} />
                </Route>
            </Routes>
      
      </BrowserRouter>
        
    </>
  )

}

export default App
