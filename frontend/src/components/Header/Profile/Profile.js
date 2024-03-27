// Style imports
import './profile.scss';
import { DropdownTheme } from '../../../style/flowbiteThemes';

// Components
import { Dropdown } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen as setSettingsModal } from '../../SettingsModal/settingsModalSlice';
import { setIsAuthorized } from '../../App/appUserSlice';
import { setMode } from '../../AppMode/appModeSlice';

// hooks
import { useNavigate } from 'react-router';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.appUser.data);

    const logout = () => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('rememberMe');
        dispatch(setIsAuthorized(false));
        dispatch(setMode('customer'));
    };

    return (
        <Dropdown theme={DropdownTheme} label="Profile" dismissOnClick renderTrigger={() => <div className='profile'>
                <img src={userData.avatar ? userData.avatar : 'https://cdn.lovattro.kz/woluntr/avatar.svg'} alt='profile'/>
            </div>}>
            <Dropdown.Header>
                <span className="block text-sm">{userData.first_name + ' ' + userData.last_name}</span>
                <span className="block truncate text-sm font-medium">{userData.email}</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => navigate('/profile')}>Профиль</Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(setSettingsModal(true))}>Настройки</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => logout()}>Выйти</Dropdown.Item>
        </Dropdown>
    );
};

export default Profile;