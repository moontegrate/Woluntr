// Стилистические импорты
import './App.scss';

// Вспомогательные компоненты
import Header from '../Header/Header';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { Spinner } from 'flowbite-react';

// Вспомогательные функции
import getTokens from '../../services/getTokens';

// Маршрутизация
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// React Helmet
import { HelmetProvider } from "react-helmet-async";

// Redux
import { useDispatch, UseDispatch } from 'react-redux';

const IndexLayout = lazy(() => import("../../pages/layouts/index"));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('refresh_token') && localStorage.getItem('rememberMe')) {
            getTokens()
                .then((access) => {
                    getUserInfo(access)
                        .then((data) => {
                            if (data) {
                                dispatch(setIsAuthorized(true));
                            };
                        })
                        .catch((e) => {
                            toast('Ошибка при загрузке данных о пользователе. Пожалуйста, обновите страницу.', {
                                position: 'bottom-right',
                                icon: '😰'
                            });
                        });
                })
                .catch((e) => {
                    console.log("Token refresh error", e.response?.data);
                    toast('Ошибка при обновлении данных авторизации. Пожалуйста, обновите страницу.', {
                        position: 'bottom-right',
                        icon: '😰'
                    });
                });
        } else {
            dispatch(setCurrentUser({
                id: 0,
                username: '',
                role: 'anon',
                firstName: '',
                lastName: '',
                company: '',
                email: '',
                phone: '',
                photo: '',
                isChecked: false
            }))
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
                        </Routes>
                    </Suspense>
                </div>
                <LoginModal />
                <RegisterModal />
            </HelmetProvider>
        </Router>
    );
};

export default App;
