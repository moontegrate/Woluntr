// Style imports
import './App.scss';

// Components
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { Spinner } from 'flowbite-react';
import TokenRefresher from '../TokenRefresher/TokenRefresher';
import RotateToContinue from '../RotateToContinue/RotateToContinue';
import { Toaster } from 'react-hot-toast';

// Helper functions
import getTokens from '../../services/getTokens';

// Routing
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// hooks
import { useEffect, useLayoutEffect } from 'react';

// React Helmet
import { HelmetProvider } from "react-helmet-async";

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserInfo, setIsAuthorized } from './appUserSlice';
import { getAllOrders } from './ordersSlice';
import { getAllPersonalOrders } from '../VolunteerOrdersList/volunteerOrdersListSlice';
import { setMode } from '../AppMode/appModeSlice';

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
const VolunteerOrderModal = lazy(() => import("../../components/VolunteerOrderModal/VolunteerOrderModal"));

const App = () => {
    const dispatch = useDispatch();

    const appMode = useSelector((state) => state.appMode.appMode);
    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);
    const isProfileModalOpen = useSelector((state) => state.profileModal.isModalOpen);
    const isSettingsModalOpen = useSelector((state) => state.settingsModal.isModalOpen);
    const isVolunteerOrderModalOpen = useSelector((state) => state.volunteerOrderModal.isModalOpen);

    useLayoutEffect(() => {
        if (localStorage.getItem('refresh_token') && localStorage.getItem('rememberMe')) {
            getTokens()
            .then(() => {
                dispatch(setIsAuthorized(true));
                dispatch(getCurrentUserInfo());
            })
            .then(() => {
                if ( localStorage.getItem('appMode')) {
                    dispatch(setMode(localStorage.getItem('appMode')));
                } else {
                    localStorage.removeItem('appMode');
                    dispatch(setMode('customer'));
                };
            })
            .finally(() => {
                dispatch(getAllOrders());
            })
            .catch((e) => {
                console.log("Token refresh error", e.response?.data);
                localStorage.removeItem('refresh_token');
            });
        } else {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('rememberMe');
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (appMode === 'volunteer' && isAuthorized) {
            dispatch(getAllPersonalOrders());
        };
    }, [appMode]);

    return (
        <Router>
            <HelmetProvider>
                <div className="App">
                    <RotateToContinue/>
                    <TokenRefresher/>
                    <Toaster
                        toastOptions={{
                            style: {
                                borderRadius: '20px'
                            }
                        }}
                    />
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
                    {appMode === 'volunteer' && isVolunteerOrderModalOpen ? <VolunteerOrderModal/> : null}
                </Suspense>
            </HelmetProvider>
        </Router>
    );
};

export default App;
