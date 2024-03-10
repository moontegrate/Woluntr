// 

// Вспомогательные компоненты
import { Dropdown } from 'flowbite-react';

const Profile = () => {
    return (
        <Dropdown label="Profile" dismissOnClick={false} renderTrigger={() => <div className='profile'>
                <img src='http://localhost:8000/media/user_photos/Profile_BW.jpg' alt='profile'/>
            </div>}>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
    );
};

export default Profile;