// Стилистические импорты
import './profile.scss';
import { DropdownTheme } from '../../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Dropdown } from 'flowbite-react';

// Хуки
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <Dropdown theme={DropdownTheme} label="Profile" dismissOnClick={false} renderTrigger={() => <div className='profile'>
                <img src='https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile'/>
            </div>}>
            <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate('/@username')}>Профиль</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/settings')}>Настройки</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => {}}>Выйти</Dropdown.Item>
        </Dropdown>
    );
};

export default Profile;