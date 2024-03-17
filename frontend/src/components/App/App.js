// Стилистические импорты
import './App.scss';

// Вспомогательные компоненты
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { Spinner } from 'flowbite-react';

// Маршрутизация
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// React Helmet
import { HelmetProvider } from "react-helmet-async";

const IndexLayout = lazy(() => import("../../pages/layouts/index"));

const App = () => {

  return (
    <Router>
      <HelmetProvider>
        <div className="App">
          <Header />
          <Suspense fallback={<div className='fallback'><Spinner theme={{color: {info: "fill-main-color"}}} aria-label="Extra large spinner example" size="xl" /></div>}>
            <Routes>
              <Route path="/" element={<IndexLayout />} />
            </Routes>
          </Suspense>
        </div>
        <LoginModal/>
        <RegisterModal/>
      </HelmetProvider>
    </Router>
  );
};

export default App;
