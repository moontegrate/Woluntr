// Стилистические импорты
import './profile.scss';
import { DropdownTheme } from '../../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Dropdown } from 'flowbite-react';

const Profile = () => {
    return (
        <Dropdown theme={DropdownTheme.dropdown} label="Profile" dismissOnClick={false} renderTrigger={() => <div className='profile'>
                <img src='https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile'/>
            </div>}>
            <Dropdown.Item>Профиль</Dropdown.Item>
            <Dropdown.Item>Настройки</Dropdown.Item>
            <Dropdown.Item>---</Dropdown.Item>
            <Dropdown.Item>Выйти</Dropdown.Item>
        </Dropdown>
    );
};

export default Profile;