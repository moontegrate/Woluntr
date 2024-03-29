// style imports
import './profileLevelCard.scss';

// components
import { Progress } from "flowbite-react";

const ProfileLevelCard = () => {
    const volunteerRating = 200;

    return (
        <div className='profile-card profile-level-card'>
            <h3 className='profile-level-card__title title'>Стань лучшим волонтёром</h3>
            <p className='profile-level-card__text'>Повышай ранг волонтерства: выполняя задания и получая баллы за них. Набери 1000 баллов и мы пришлем электронный сертификат тебе на почту. Одно выполненное задание — это 25 баллов.</p>
            <div className='profile-level-card__bar'>
                <Progress progress={volunteerRating/1000*100} color='purple' theme={{
                    base: "w-full overflow-hidden rounded-full bg-main-accent-color dark:bg-main-accent-color",
                    color: {
                        purple: "bg-volunteer-color-dark dark:bg-volunteer-color-dark"
                        }
                    }
                }/>
                <div className='profile-level-card__bar_level'>
                    <div className={'profile-level-card__bar_level-item_active'}>
                        <div className='profile-level-card__bar_level-round'>0</div>
                        <div className='profile-level-card__bar_level-title'>Новичок</div>
                        <div className='profile-level-card__bar_level-desc' style={{display: (volunteerRating > 200 ? 'none' : 'block')}}>Ты только начал свой путь. Всё ещё впереди!</div>
                    </div>
                    <div className={'profile-level-card__bar_level-item' + (volunteerRating >= 200 ? '_active' : '')}>
                        <div className='profile-level-card__bar_level-round'>200</div>
                        <div className='profile-level-card__bar_level-title'>Опытный</div>
                        <div className='profile-level-card__bar_level-desc'>Текст для уровня "Опытный"</div>
                    </div>
                    <div className={'profile-level-card__bar_level-item' + (volunteerRating >= 500 ? '_active' : '')}>
                        <div className='profile-level-card__bar_level-round'>500</div>
                        <div className='profile-level-card__bar_level-title'>Эксперт</div>
                        <div className='profile-level-card__bar_level-desc'>Текст для уровня "Эксперт"</div>
                    </div>
                    <div className={'profile-level-card__bar_level-item' + (volunteerRating >= 1000 ? '_active' : '')}>
                        <div className='profile-level-card__bar_level-round'>1000+</div>
                        <div className='profile-level-card__bar_level-title'>Профессионал</div>
                        <div className='profile-level-card__bar_level-desc'>Текст для уровня "Профессионал"</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileLevelCard;