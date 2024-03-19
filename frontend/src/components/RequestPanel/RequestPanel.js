// Стилистические импорты
import './RequestPanel.scss';

// Вспомогательные компоненты
import CustomerRequestForm from './CustomerRequestForm/CustomerRequestForm';

// Хуки
import { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import VolunteerOrdersPanel from './VolunteerOrdersPanel/VolunteerOrdersPanel';

const RequestPanel = () => {
    const [height, setHeight] = useState(window.innerWidth > 925 ? 'auto' : '100px');
    const [transition, setTransition] = useState('0s');
    const [isDragging, setIsDragging] = useState(false);

    const appMode = useSelector((state) => state.appMode.appMode);

    const handleMouseDown = () => {
        setIsDragging(true);
        setTransition('0s');
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            document.activeElement.blur();
            const newY = window.innerHeight - e.touches[0].clientY;
            if (newY >= 0 && newY <= 500) {
                setHeight(newY);
            };
        };
    };

    const handleMouseUp = () => {
        setTransition('.3s height');

        if (height > 200) {
            setHeight('374px');
        } else if (height < 200) {
            setHeight('100px');
        };
        
        setIsDragging(false);
    };

    return (
        <div
            className='request-panel'
            style={{ height: height, transition: transition }}
        >
            <div
                className='request-panel__container'
                onTouchStart={handleMouseDown}
                onTouchMove={handleMouseMove}
                onTouchEnd={handleMouseUp}
            >
                {appMode === 'customer' ? <CustomerRequestForm/> : <VolunteerOrdersPanel/>}
            </div>
        </div>
    );
};

export default RequestPanel;