// Style imports
import './settingsModal.scss';
import { ModalTheme } from '../../style/flowbiteThemes';

// Components
import { Modal } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './settingsModalSlice';

const SettingsModal = () => {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.settingsModal.isModalOpen);

    return (
        <Modal theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header>
                <p className='title'>Настройки</p>
                <p className='subtitle'>Управление настройками</p>
            </Modal.Header>
            <Modal.Body>
                Тело окна
            </Modal.Body>
        </Modal>
    );
};

export default SettingsModal;