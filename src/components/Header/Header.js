// Стилистические импорты
import Profile from './Profile/Profile';
import './header.scss';



const Header = () => {
    return (
        <header className="header">
            <div className='header__bar'>
                <div className='header__bar-logo'></div>
            </div>
            <Profile/>
            
        </header>
    )
};

export default Header;