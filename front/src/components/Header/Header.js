// Стилистические импорты
import './header.scss';
import { ButtonTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import Profile from './Profile/Profile';
import { Button } from 'flowbite-react';

import { useSelector } from 'react-redux';

const Header = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <header className="header">
            <div className='header__bar'>
                <div className='header__bar-logo'>
                    <img src={appMode === 'customer' ? 'http://localhost:3000/logo-line.svg' : 'http://localhost:3000/logo-line-volunteer.svg'} alt='logo'/>
                </div>
                <div className='header__bar-menu'>
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