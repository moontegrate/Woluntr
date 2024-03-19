// Style imports
import './RequestPanel.scss';

// Components
import { Spinner } from 'flowbite-react';

// Hooks
import { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// React lazy
import { lazy, Suspense } from 'react';

// Lazy imports
const CustomerRequestForm = lazy(() => import("../../components/RequestPanel/CustomerRequestForm/CustomerRequestForm"));
const VolunteerOrdersPanel = lazy(() => import("../../components/RequestPanel/VolunteerOrdersPanel/VolunteerOrdersPanel"));

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
                <Suspense fallback={<div className='fallback'><Spinner theme={{ color: { info: "fill-main-color" } }} aria-label="Extra large spinner example" size="xl" /></div>}>
                    {appMode === 'customer' ? <CustomerRequestForm/> : <VolunteerOrdersPanel/>}
                </Suspense>
            </div>
        </div>
    );
};

export default RequestPanel;