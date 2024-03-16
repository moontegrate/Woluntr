// Стилистические импорты
import './requestPanel.scss';

// Вспомогательные компоненты
import CustomerRequestForm from '../CustomerRequestForm/CustomerRequestForm';

// Хуки
import { useState } from 'react';

const RequestPanel = () => {
    const [height, setHeight] = useState(window.innerWidth > 925 ? 'auto' : '100px');
    const [transition, setTransition] = useState('0s');
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setTransition('0s')
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newY = window.innerHeight - e.touches[0].clientY;
            if (newY >= 0 && newY <= 500) { // Ограничение движения от 0 до 200 пикселей по оси Y
                setHeight(newY);
                console.log(newY);
            }
        }
    };

    const handleMouseUp = () => {
        setTransition('.3s height');

        if (height > 200) {
            setHeight('374px')
        } else if (height < 200) {
            setHeight('100px')
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
                <CustomerRequestForm/>
            </div>
        </div>
    );
};

export default RequestPanel;