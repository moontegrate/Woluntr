// Стилистические импорты
import './appMode.scss';
import { AppModeBtnTheme } from '../../style/flowbiteThemes/appModeBtn';

// Вспомогательные компоненты
import { Button } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from './appModeSlice';

const AppMode = () => {
    const dispatch = useDispatch();

    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <div className='app-mode'>
            <Button.Group>
                <Button theme={AppModeBtnTheme} className={`rounded-[30px] rounded-r-none customer-btn ${appMode === 'customer' ? ' customer-btn-active' : null}`} onClick={() => dispatch(setMode('customer'))}>Заказчик</Button>
                <Button theme={AppModeBtnTheme} className={`rounded-[30px] rounded-l-none volunteer-btn ${appMode === 'volunteer' ? ' volunteer-btn-active' : null}`} onClick={() => dispatch(setMode('volunteer'))}>Волонтёр</Button>
            </Button.Group>
        </div>
    );
};

export default AppMode;