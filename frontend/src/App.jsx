import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/authSlice';  // Redux action ที่เก็บข้อมูลผู้ใช้
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/ฺBrowse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Componies from './components/admin/Componies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs.jsx';
import PostJobs from './components/admin/PostJobs';
import Applicants from './components/admin/Applicants';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  {
    path: '/browse',
    element: <Browse />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/description/:id',
    element: <JobDescription />,
  },
  // admin
  {
    path: '/admin/companies',
    element: <Componies />,
  },
  {
    path: '/admin/companies/create',
    element: <CompanyCreate />,
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />,
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />,
  },
  {
    path: '/admin/jobs/create',
    element: <PostJobs />,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <Applicants />,
  },

]);


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // ตรวจสอบข้อมูลใน localStorage และตั้งค่า Redux
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUser(storedUser));  // ถ้ามีข้อมูลใน localStorage ตั้งค่าผู้ใช้ใน Redux
    }
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
