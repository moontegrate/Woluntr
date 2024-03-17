// Стилистические импорты
import './registerModal.scss';
import { ModalTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Modal } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './registerModalSlice';
import RegisterForm from '../RegisterForm/RegisterForm';

const RegisterModal = () => {
    const dispatch = useDispatch();
    
    const isModalOpen = useSelector((state) => state.registerModal.isModalOpen);

    return (
        <Modal theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header>
                <p className='title'>Зарегистрироваться</p>
                <p className='subtitle'>Добро пожаловать!</p>
            </Modal.Header>
            <Modal.Body>
                <RegisterForm/>
            </Modal.Body>
        </Modal>
    );
};

export default RegisterModal;