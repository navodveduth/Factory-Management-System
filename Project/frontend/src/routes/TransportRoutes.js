import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  HomeSharedLayout,
  TransportSharedLayout,
  TransportForm,
  TransportView,
  TransportUpdate,
  DriverSharedLayout,
  DriverForm,
  DriverView,
  DriverUpdate,
} from '../components';

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeSharedLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/transport' element={<TransportSharedLayout />}>
            <Route index element={<TransportView />} />
            <Route path='/transport/create' element={<TransportForm />} />
            <Route path='transportUpdate/:id' element={<TransportUpdate />} />
          </Route>

          <Route path='/driver' element={<DriverSharedLayout />}>
            <Route index element={<DriverView />} />
            <Route path='/driver/create' element={<DriverForm />} />
            <Route path='driverUpdate/:id' element={<DriverUpdate />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
