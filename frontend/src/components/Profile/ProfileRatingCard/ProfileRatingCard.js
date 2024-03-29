// style imports
import './profileRatingCard.scss';

const ProfileRatingCard = () => {
    return (
        <div className='profile-rating-card'>
            <h2 className='profile-rating-card__title'>Тип помощи, которую ты выбираешь для выполнения</h2>
            <div className='profile-rating-card__content'>
                <div className='no-orders'>
                    <img src='https://cdn.lovattro.kz/woluntr/no-orders.svg' alt='no-orders'/>
                    <span>Чтобы узнать cвой рейтинг, выполни своё первое задание.</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileRatingCard;