import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './page/login/SignInPage';
import HomePage from './page/guest/HomePage/HomePage';
import NotFoundPage from './page/NotFoundPage';
import SignUpPage from './page/login/SignUpPage';
import MovieDetailPage from './page/guest/MovieDetailPage/MovieDetailPage';
import PersonalPage from './page/PersonalPage/PersonalPage';
import BookTicketPage from './page/guest/BookTicketPage/BookTicketPage';
import { userLocalStorage } from './api/localServices';
import MainAdminPage from './page/admin/MainAdminPage/MainAdminPage';
import Layout from './template/Layout';

function App() {
  let info = userLocalStorage.get();

  let isAdmin;
  if (info !== null && info !== undefined) { isAdmin = info.maLoaiNguoiDung === 'QuanTri'; }
  const userRoutes = [
    { path: '/', element: <Layout><HomePage /></Layout> },
    { path: '/homepage', element: <Layout><HomePage /></Layout> },
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/detail/:maPhim', element: <Layout><MovieDetailPage /></Layout> },
    { path: '/personal', element: <Layout><PersonalPage /></Layout> },
    { path: '/purchasing/:maLichChieu', element: <Layout><BookTicketPage /></Layout> },
    { path: '/*', element: <Layout><NotFoundPage /></Layout> },
  ];

  const adminRoutes = [
    { path: '/', element: <MainAdminPage /> },
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/personal', element: <PersonalPage /> },
    { path: '/*', element: <NotFoundPage /> },
    { path: '/admin', element: <MainAdminPage /> }]

  let selectedRoutes = userRoutes;
  if (isAdmin) { selectedRoutes = adminRoutes }
  return (
    <div className="App">
      <BrowserRouter>
        <div className={isAdmin ? 'pt-24' : ''}>
          <Routes>
            {selectedRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
