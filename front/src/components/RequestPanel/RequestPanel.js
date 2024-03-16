// Стилистические импорты
import './requestPanel.scss';

// Вспомогательные компоненты
import CustomerRequestForm from '../CustomerRequestForm/CustomerRequestForm';

// Хуки
import { useState } from 'react';

const RequestPanel = () => {
    const [top, setTop] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY - top);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newY = e.clientY - startY;
            if (newY >= 0 && newY <= 200) { // Ограничение движения от 0 до 200 пикселей по оси Y
                setTop(newY);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className='request-panel'
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                className='request-panel__container'
                style={{ top: `${top}px` }}
                onMouseDown={handleMouseDown}
            >
                <div className='request-panel__head'>
                    <img src='http://localhost:3000/task.svg' alt='task'/>
                    <span>Создать задание</span>
                </div>
                <CustomerRequestForm/>
            </div>
        </div>
    );
};

export default RequestPanel;