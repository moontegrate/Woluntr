// Стилистические импорты
import './registerModal.scss';
import { ButtonTheme, FloatingLabelCustomerTheme, FloatingLabelVolunteerTheme, ModalTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button, FloatingLabel, Modal } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './registerModalSlice';
import { setIsModalOpen as openLoginModal } from '../LoginModal/loginModalSlice';

const RegisterModal = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);
    const isModalOpen = useSelector((state) => state.registerModal.isModalOpen);

    return (
        <Modal theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header>
                <p className='title'>Зарегистрироваться</p>
                <p className='subtitle'>Добро пожаловать!</p>
            </Modal.Header>
            <Modal.Body>
                <form className='login-form'>
                    <div className='login-form__field'>
                        <FloatingLabel theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme} variant='standard' label='Ваше имя'/>
                    </div>
                    <div className='login-form__field'>
                        <FloatingLabel theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme} variant='standard' type='password' label='Придумайте пароль'/>
                    </div>
                    <div className='login-form__field'>
                        <FloatingLabel theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme} variant='standard' type='password' label='Повторите пароль'/>
                    </div>
                    <div className='login-form__field'>
                        <FloatingLabel theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme} variant='standard' label='Ваша почта'/>
                    </div>
                    <Button theme={ButtonTheme} className='login-form__submit' color={appMode === 'customer' ? 'green' : 'purple'} size='xl'>Зарегистрироваться</Button>
                    <div>Есть аккаунт? <span className={appMode === 'customer' ? "text-main-color hover:underline dark:text-main-color" : "text-volunteer-color hover:underline dark:text-volunteer-color"} onClick={() => {
                        dispatch(setIsModalOpen(false));
                        dispatch(openLoginModal(true));
                    }}>Войти.</span></div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RegisterModal;