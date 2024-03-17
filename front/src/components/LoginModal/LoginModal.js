// Стилистические импорты
import './loginModal.scss';
import { ModalTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Modal } from 'flowbite-react';
import LoginForm from '../LoginForm/LoginForm';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './loginModalSlice';

const LoginModal = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.loginModal.isModalOpen);

    return (
        <Modal theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header>
                <p className='title'>Вход</p>
                <p className='subtitle'>Добро пожаловать!</p>
            </Modal.Header>
            <Modal.Body>
                <LoginForm/>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;