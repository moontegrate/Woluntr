// Style imports
import './App.scss';

// Components
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { Spinner } from 'flowbite-react';

// Helper functions
import getTokens from '../../services/getTokens';

// Routing
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// React Helmet
import { HelmetProvider } from "react-helmet-async";

// Redux
import { getCurrentUserInfo } from './appUserSlice';

// Notifications
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';


// layouts for routes
const IndexLayout = lazy(() => import("../../pages/layouts/index"));
const BestVolunteersLayout = lazy(() => import("../../pages/layouts/bestVolunteers"));
const SupportLayout = lazy(() => import("../../pages/layouts/support"));
const HistoryLayout = lazy(() => import("../../pages/layouts/history"));
const OrdersLayout = lazy(() => import("../../pages/layouts/orders"));
const TeamsLayout = lazy(() => import("../../pages/layouts/teams"));

// lazy components
const ProfileModal = lazy(() => import("../../components/ProfileModal/ProfileModal"));
const SettingsModal = lazy(() => import("../../components/SettingsModal/SettingsModal"));

const App = () => {
    const isProfileModalOpen = useSelector((state) => state.profileModal.isModalOpen);
    const isSettingsModalOpen = useSelector((state) => state.settingsModal.isModalOpen);

    useEffect(() => {
        if (localStorage.getItem('refresh_token') && localStorage.getItem('rememberMe')) {
            getTokens()
                .then(() => {
                    getCurrentUserInfo();
                })
                .catch((e) => {
                    console.log("Token refresh error", e.response?.data);
                    toast('Ошибка при обновлении данных авторизации. Пожалуйста, обновите страницу.', {
                        position: 'bottom-right',
                        icon: '😰'
                    });
                });
        };
    }, []);

    return (
        <Router>
            <HelmetProvider>
                <div className="App">
                    <Header />
                    <Suspense fallback={<div className='fallback'><Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}>
                        <Routes>
                            <Route path="/" element={<IndexLayout />} />
                            <Route path="/best-volunteers" element={<BestVolunteersLayout />} />
                            <Route path="/support" element={<SupportLayout />} />
                            <Route path="/history" element={<HistoryLayout />} />
                            <Route path="/orders" element={<OrdersLayout />} />
                            <Route path="/teams" element={<TeamsLayout />} />
                        </Routes>
                    </Suspense>
                </div>
                <LoginModal />
                <RegisterModal />
                <Suspense fallback={<div className='fallback'><Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}>
                    {isProfileModalOpen ? <ProfileModal/> : null}
                    {isSettingsModalOpen ? <SettingsModal/> : null}
                </Suspense>
            </HelmetProvider>
        </Router>
    );
};

export default App;
