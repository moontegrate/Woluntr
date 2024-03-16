// Стилистические импорты
import './header.scss';
import { ButtonTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
// import Profile from './Profile/Profile';
import { Button } from 'flowbite-react';
import { Sling as Hamburger } from 'hamburger-react'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setHamburgerToggled } from './headerSlice';

const Header = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);
    const isHamburgerToggled = useSelector((state) => state.header.hamburgerToggled);

    const hamburgerClass = isHamburgerToggled ? 'header__bar-menu header__bar-menu-active' : 'header__bar-menu';
    const wrapperClass = isHamburgerToggled ? 'header__bar-menu-wrapper header__bar-menu-wrapper-active' : 'header__bar-menu-wrapper';

    const screenWidth = window.innerWidth;

    return (
        <header className="header">
            <div className={wrapperClass} style={{'height': screenWidth < 925 ? window.innerHeight : '100%'}} onClick={() => dispatch(setHamburgerToggled())}></div>
            <div className='header__bar'>
                <div className='header__burger'>
                    <Hamburger toggled={isHamburgerToggled} onToggle={() => dispatch(setHamburgerToggled())}/>
                </div>
                <div className='header__bar-logo'>
                    <img src={appMode === 'customer' ? 'http://localhost:3000/logo-line.svg' : 'http://localhost:3000/logo-line-volunteer.svg'} alt='logo'/>
                </div>
                
                <div className={hamburgerClass} style={{'height': screenWidth < 925 ? window.innerHeight : '100%'}}>
                    <div className={'header__bar-menu-item header__bar-menu-item-active ' + appMode + '-hover'}>Создать задание</div>
                    <div className={'header__bar-menu-item ' + appMode + '-hover'}>Лучшие волонтеры</div>
                    <div className={'header__bar-menu-item ' + appMode + '-hover'}>Мои задания</div>
                    <div className={'header__bar-menu-item ' + appMode + '-hover'}>Поддержка</div>
                </div>
                <Button className={'header__login-btn ' + appMode + '-bg-accent'} theme={ButtonTheme} size='xl'>Войти</Button>
            </div>
            {/* <Profile/> */}
        </header>
    )
};

export default Header;