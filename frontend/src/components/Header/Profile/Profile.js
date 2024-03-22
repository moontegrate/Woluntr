// Style imports
import './profile.scss';
import { DropdownTheme } from '../../../style/flowbiteThemes';

// Components
import { Dropdown } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen as setProfileModal } from '../../ProfileModal/profileModalSlice';
import { setIsModalOpen as setSettingsModal } from '../../SettingsModal/settingsModalSlice';
import { setIsAuthorized } from '../../App/appUserSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.appUser.data);

    const logout = () => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        dispatch(setIsAuthorized(false));
    };

    return (
        <Dropdown theme={DropdownTheme} label="Profile" dismissOnClick={false} renderTrigger={() => <div className='profile'>
                <img src={userData.profilePic ? userData.profilePic : 'https://cdn.lovattro.kz/woluntr/avatar.svg'} alt='profile'/>
            </div>}>
            <Dropdown.Header>
                <span className="block text-sm">{userData.firstName + ' ' + userData.lastName}</span>
                <span className="block truncate text-sm font-medium">{userData.email}</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => dispatch(setProfileModal(true))}>Профиль</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setSettingsModal(true))}>Настройки</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => logout()}>Выйти</Dropdown.Item>
        </Dropdown>
    );
};

export default Profile;