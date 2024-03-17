// Стилистические импорты
import './registerForm.scss';
import { ButtonTheme, FloatingLabelCustomerTheme, FloatingLabelVolunteerTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button, FloatingLabel } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../RegisterModal/registerModalSlice';
import { setIsModalOpen as openLoginModal } from '../LoginModal/loginModalSlice';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
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
            <div>Есть аккаунт? <span className={appMode === 'customer' ? "text-main-color hover:underline dark:text-main-color cursor-pointer" : "text-volunteer-color hover:underline dark:text-volunteer-color cursor-pointer"} onClick={() => {
                dispatch(setIsModalOpen(false));
                dispatch(openLoginModal(true));
            }}>Войти.</span></div>
        </form>
    );
};

export default RegisterForm;