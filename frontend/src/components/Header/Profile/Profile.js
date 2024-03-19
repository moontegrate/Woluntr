// Style imports
import './profile.scss';
import { DropdownTheme } from '../../../style/flowbiteThemes';

// Components
import { Dropdown } from 'flowbite-react';

// Redux
import { useDispatch } from 'react-redux';
import { setIsModalOpen as setProfileModal } from '../../ProfileModal/profileModalSlice';
import { setIsModalOpen as setSettingsModal } from '../../SettingsModal/settingsModalSlice';

const Profile = () => {
    const dispatch = useDispatch();

    return (
        <Dropdown theme={DropdownTheme} label="Profile" dismissOnClick={false} renderTrigger={() => <div className='profile'>
                <img src='https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile'/>
            </div>}>
            <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => dispatch(setProfileModal(true))}>Профиль</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setSettingsModal(true))}>Настройки</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => {}}>Выйти</Dropdown.Item>
        </Dropdown>
    );
};

export default Profile;