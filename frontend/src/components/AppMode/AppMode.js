// Стилистические импорты
import './appMode.scss';
import { AppModeBtnTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from './appModeSlice';
import { setIsModalOpen } from '../LoginModal/loginModalSlice';

const AppMode = () => {
    const dispatch = useDispatch();

    const appMode = useSelector((state) => state.appMode.appMode);
    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);

    return (
        <div className='app-mode'>
            <Button.Group>
                <Button theme={AppModeBtnTheme} color='green' className={`rounded-[30px] rounded-r-none customer-btn ${appMode === 'customer' ? ' customer-btn-active' : null}`} onClick={() => dispatch(setMode('customer'))}>Заказчик</Button>
                <Button theme={AppModeBtnTheme} color='purple' className={`rounded-[30px] rounded-l-none volunteer-btn ${appMode === 'volunteer' ? ' volunteer-btn-active' : null}`} onClick={() => {
                    if (isAuthorized) {
                        dispatch(setMode('volunteer'));
                    } else {
                        dispatch(setIsModalOpen(true));
                    };
                }}>Волонтёр</Button>
            </Button.Group>
        </div>
    );
};

export default AppMode;