// Стилистические импорты
import './loginModal.scss';
import { CheckboxTheme, FloatingLabelVolunteerTheme, FloatingLabelCustomerTheme, ModalTheme, ButtonTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button, Checkbox, FloatingLabel, Label, Modal } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from './loginModalSlice';
import { setIsModalOpen as openRegModal } from '../RegisterModal/registerModalSlice';

const LoginModal = () => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.loginModal.isModalOpen);
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
        <Modal theme={ModalTheme} show={isModalOpen} dismissible onClose={() => dispatch(setIsModalOpen(false))}>
            <Modal.Header>
                <p className='title'>Вход</p>
                <p className='subtitle'>Добро пожаловать!</p>
            </Modal.Header>
            <Modal.Body>
                <form className='login-form'>
                    <div className='login-form__field'>
                        <FloatingLabel theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme} variant='standard' label='Электронная почта'/>
                    </div>
                    <div className='login-form__field'>
                        <FloatingLabel theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme} variant='standard' type='password' label='Пароль'/>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember" defaultChecked theme={CheckboxTheme} color={appMode === 'customer' ? 'green' : 'purple'}/>
                        <Label htmlFor="remember" className="flex">Запомнить меня</Label>
                    </div>
                    <Button theme={ButtonTheme} className='login-form__submit' color={appMode === 'customer' ? 'green' : 'purple'} size='xl'>Войти</Button>
                    <div>Нет аккаунта? <span className={appMode === 'customer' ? "text-main-color hover:underline dark:text-main-color" : "text-volunteer-color hover:underline dark:text-volunteer-color"} onClick={() => {
                        dispatch(openRegModal(true));
                        dispatch(setIsModalOpen(false));
                    }}>Зарегистрироваться.</span></div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;