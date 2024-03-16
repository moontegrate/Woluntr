// Стилистические импорты
import './App.scss';

// Вспомогательные компоненты
import Header from '../Header/Header';

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
          <Suspense fallback={<div className='fallback'>page loading...</div>}>
            <Routes>
              <Route path="/" element={<IndexLayout />} />
            </Routes>
          </Suspense>
        </div>
      </HelmetProvider>
    </Router>
  );
};

export default App;
