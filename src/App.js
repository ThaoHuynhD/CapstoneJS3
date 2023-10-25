import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignInPage from './page/login/SignInPage';
import HomePage from './page/guest/HomePage/HomePage';
import NotFoundPage from './page/NotFoundPage';
import SignUpPage from './page/login/SignUpPage';
import Header from './component/Header';
import MovieDetailPage from './page/guest/MovieDetailPage/MovieDetailPage';
import PersonalPage from './page/PersonalPage/PersonalPage';
import BookTicketPage from './page/guest/BookTicketPage/BookTicketPage';
import AdminHomePage from './page/admin/AdminHomePage/AdminHomePage';
import BookingManagementPage from './page/admin/BookingManagementPage/BookingManagementPage';
import UserManagementPage from './page/admin/UserManagementPage/UserManagementPage';
import ShowTimeManagementPage from './page/admin/ShowTimeManagementPage/ShowTimeManagementPage';
import ReportingManagementPage from './page/admin/ReportingManagementPage/ReportingManagementPage';
import MovieManagementPage from './page/admin/MovieManagementPage/MovieManagementPage';
import { userLocalStorage } from './api/localServices';
import LeftSideBar from './component/LeftSideBar';

function App() {
  let info = userLocalStorage.get();
  let isAdmin = info.maLoaiNguoiDung === 'QuanTri';

  const userRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/homepage', element: <HomePage /> },
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/detail/:maPhim', element: <MovieDetailPage /> },
    { path: '/personal', element: <PersonalPage /> },
    { path: '/purchasing/:maLichChieu', element: <BookTicketPage /> },
    { path: '/*', element: <NotFoundPage /> },
  ];
  const adminRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/homepage', element: <HomePage /> },
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/detail/:maPhim', element: <MovieDetailPage /> },
    { path: '/personal', element: <PersonalPage /> },
    { path: '/purchasing/:maLichChieu', element: <BookTicketPage /> },

    { path: '/admin/homepage', element: <AdminHomePage /> },
    { path: '/admin/user', element: <UserManagementPage /> },
    { path: '/admin/showtime', element: <ShowTimeManagementPage /> },
    { path: '/admin/report', element: <ReportingManagementPage /> },
    { path: '/admin/movie', element: <MovieManagementPage /> },
    { path: '/admin/booking', element: <BookingManagementPage /> },

    { path: '/*', element: <NotFoundPage /> },

  ];

  let selectedRoutes;
  if (info !== undefined && info !== null && isAdmin) { selectedRoutes = adminRoutes }
  else { selectedRoutes = userRoutes; }

  return (
    <div className="App">
      <BrowserRouter>
        {!isAdmin ? <Header /> : <LeftSideBar />}
        <div className={!isAdmin ? 'pt-20' : 'null'}>
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
