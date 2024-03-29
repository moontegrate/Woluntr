// style imports
import './profileInfoCard.scss';
import { ButtonTheme } from '../../../style/flowbiteThemes';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// components
import { Button, Spinner } from 'flowbite-react';

const ProfileInfoCard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.appUser.data);

    return (
        <div className='profile-card profile-info-card'>
            <div className='profile-info-card__pic'>
                <img src={user.avatar ? user.avatar : 'https://cdn.lovattro.kz/woluntr/avatar.svg'} alt='profile'/>
            </div>
            <div className='profile-info-card__email'>{user.email}</div>
            <div className='profile-info-card__name'>{user.first_name + ' ' + user.last_name}</div>
            <div className='profile-info-card__btns'>
                <Button
                    theme={ButtonTheme}
                    className='profile-info-card__btn'
                    color='green'
                    size='xl'
                    isProcessing={user === 'sending'}
                    processingSpinner={<Spinner theme={{ base: "inline animate-spin text-main-accent-color", color: { info: "fill-main-color" } }}/>}
                    onClick={() => {}}
                >Дополнить данные</Button>
                <Button
                    theme={ButtonTheme}
                    className='profile-info-card__btn'
                    color='light'
                    size='xl'
                    isProcessing={user === 'sending'}
                    processingSpinner={<Spinner theme={{ base: "inline animate-spin text-main-accent-color", color: { info: "fill-main-color" } }}/>}
                    onClick={() => {}}
                >Изменить данные</Button>
            </div>
        </div>
    );
};

export default ProfileInfoCard;