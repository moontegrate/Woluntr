// style imports
import './profileInfoCard.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfoCard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.appUser.data);

    return (
        <div className='profile-info-card'>
            <div className='profile-info-card__pic'>
                <img src={user.avatar ? user.avatar : 'https://cdn.lovattro.kz/woluntr/avatar.svg'} alt='profile'/>
            </div>
        </div>
    );
};

export default ProfileInfoCard;