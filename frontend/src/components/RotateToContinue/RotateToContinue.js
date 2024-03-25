// Style imports
import './rotateToContinue.scss';

// Redux
import { useSelector } from 'react-redux';

const RotateToContinue = () => {
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <div className='rotate-to-continue'>
            <p>Чтобы продолжить, поверните ваше устройство.</p>
            <img src={appMode === 'customer' ? 'https://cdn.lovattro.kz/woluntr/rotate-to-continue.svg' : 'https://cdn.lovattro.kz/woluntr/rotate-to-continue-volunteer.svg'} alt='rotate'/>
        </div>
    );
};

export default RotateToContinue