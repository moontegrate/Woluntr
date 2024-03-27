// Стилистические импорты
import './header.scss';
import { ButtonTheme } from '../../style/flowbiteThemes';
import { TbLogin2 } from "react-icons/tb";

// Вспомогательные компоненты
import Profile from './Profile/Profile';
import { Button } from 'flowbite-react';
import { Sling as Hamburger } from 'hamburger-react'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setHamburgerToggled } from './headerSlice';
import { setIsModalOpen as setLoginModal } from '../LoginModal/loginModalSlice';

// Хуки
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);
    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);
    const isHamburgerToggled = useSelector((state) => state.header.hamburgerToggled);
    const volunterExecutionOrders = useSelector((state) => state.volunteerOrdersList.orders);
    const execuctionCount = volunterExecutionOrders ? volunterExecutionOrders.length : null;
    // eslint-disable-next-line no-restricted-globals
    const pathname = location.pathname;

    const hamburgerClass = isHamburgerToggled ? 'header__bar-menu header__bar-menu-active' : 'header__bar-menu';
    const wrapperClass = isHamburgerToggled ? 'header__bar-menu-wrapper header__bar-menu-wrapper-active' : 'header__bar-menu-wrapper';
    const screenWidth = window.innerWidth;

    const customerMenu = (
        <>
            <div onClick={() => {navigate('/'); dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item customer-hover'}>Создать задание</div>
            <div onClick={() => {if (isAuthorized) {navigate('/orders')} else {dispatch(setLoginModal(true))}; dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item customer-hover'}>Мои задания</div>
            <div onClick={() => {navigate('/best-volunteers'); dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item customer-hover'}>Лучшие волонтеры</div>
        </>
    );

    const volunteerMenu = (
        <>
            <div onClick={() => {navigate('/'); dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item volunteer-hover'}>Выполнить задание</div>
            <div onClick={() => {navigate('/history'); dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item volunteer-hover'} id='exec-history'>История заданий<span id='exec-count'>{execuctionCount}</span></div>
            <div onClick={() => {navigate('/teams'); dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item volunteer-hover'}>Команды</div>
        </>
    );
    
    return (
        <header className="header" style={pathname === '/' ? {
            position: 'absolute',
            top: 0,
            left: 0
        } : null}>
            <div className={wrapperClass} style={{'height': screenWidth < 925 ? window.innerHeight : '100%'}} onClick={() => dispatch(setHamburgerToggled())}></div>
            <div className='header__bar' style={pathname === '/' ? {
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 26.3px 0px rgba(0, 0, 0, 0.1)'
                } : null}>
                {/* Кнопка-бургер (появляется на мобильных устройствах) */}
                <div className='header__burger'>
                    <Hamburger toggled={isHamburgerToggled} size={window.innerWidth > 560 ? 30 : 25} onToggle={() => dispatch(setHamburgerToggled())}/>
                </div>

                {/* Логотип */}
                <div className='header__bar-logo' onClick={() => navigate('/')}>
                    <img src={appMode === 'customer' ? 'https://cdn.lovattro.kz/woluntr/logo-line.svg' : 'https://cdn.lovattro.kz/woluntr/logo-line-volunteer.svg'} alt='logo'/>
                </div>
                
                {/* Навигационное меню */}
                <div className={hamburgerClass} style={{'height': screenWidth < 925 ? window.innerHeight : '100%'}}>
                    {appMode === 'customer' ? customerMenu : volunteerMenu}
                    <div onClick={() => {navigate('/support'); dispatch(setHamburgerToggled(false))}} className={'header__bar-menu-item ' + appMode + '-hover'}>Поддержка</div>
                </div>

                {isAuthorized ? <Profile/> : <Button
                    className='header__login-btn'
                    color={appMode === 'customer' ? 'green' : 'purple'}
                    theme={ButtonTheme}
                    onClick={() => dispatch(setLoginModal(true))}
                    size='xl'
                >
                    <TbLogin2 size={window.innerWidth > 560 ? 30 : 20}/>
                </Button>}

            </div>


        </header>
    )
};

export default Header;