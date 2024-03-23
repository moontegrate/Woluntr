// Style imports
import './RequestPanel.scss';

// Components
import { Spinner } from 'flowbite-react';

// Hooks
import { useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResult } from './CustomerRequestForm/customerRequestFormSlice';

// React lazy
import { lazy, Suspense } from 'react';

// Lazy imports
const CustomerRequestForm = lazy(() => import("../../components/RequestPanel/CustomerRequestForm/CustomerRequestForm"));
const VolunteerOrdersPanel = lazy(() => import("../../components/RequestPanel/VolunteerOrdersPanel/VolunteerOrdersPanel"));

const RequestPanel = () => {
    const dispatch = useDispatch();

    const appMode = useSelector((state) => state.appMode.appMode);

    const [isDragging, setIsDragging] = useState(false);
    const [height, setHeight] = useState(window.innerWidth > 925 ? 'auto' : '100px');
    const [transition, setTransition] = useState('0s');
    const [startY, setStartY] = useState(0);
    const [startHeight, setStartHeight] = useState(100);

    // Начало кода для обработки свайпа панели
    const handleMouseDown = (e) => {
        if (!e.target.className.includes('dsbswp')) {
            setIsDragging(true);
            document.activeElement.blur();
            dispatch(setSearchResult(null))
            setTransition('0s');
            setStartY(e.touches[0].clientY);
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newY = startY - e.touches[0].clientY;
            setHeight((startHeight + newY) < 600 ? startHeight + newY : 600);
        }
    };

    const handleMouseUp = () => {
        setTransition('.3s height');
        setHeight(height > 200 ? 461 : 100);
        setStartHeight(height > 200 ? 461 : 100);
        setIsDragging(false);
    };
    // Конец кода для обработки свайпа панели

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
                <Suspense fallback={<div className='fallback'><Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}>
                    {appMode === 'customer' ? <CustomerRequestForm/> : <VolunteerOrdersPanel/>}
                </Suspense>
            </div>
        </div>
    );
};

export default RequestPanel;