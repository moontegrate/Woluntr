// Стилистические импорты
import './header.scss';
import { ButtonTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import Profile from './Profile/Profile';
import { Button } from 'flowbite-react';

const Header = () => {
    return (
        <header className="header">
            <div className='header__bar'>
                <div className='header__bar-logo'>
                    <img src='http://localhost:3000/logo.svg' alt='logo'/>
                </div>
            </div>
            <Button className='header__login-btn' theme={ButtonTheme} size='xl'>Войти</Button>
            {/* <Profile/> */}
        </header>
    )
};

export default Header;