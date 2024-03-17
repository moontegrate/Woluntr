// Стилистические импорты
import './loginForm.scss';
import { CheckboxTheme, FloatingLabelVolunteerTheme, FloatingLabelCustomerTheme, ButtonTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button, Checkbox, FloatingLabel, Label } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../LoginModal/loginModalSlice';
import { setIsModalOpen as openRegModal } from '../RegisterModal/registerModalSlice';

const LoginForm = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);

    return (
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
            <div>Нет аккаунта? <span className={appMode === 'customer' ? "text-main-color hover:underline dark:text-main-color cursor-pointer" : "text-volunteer-color hover:underline dark:text-volunteer-color cursor-pointer"} onClick={() => {
                dispatch(openRegModal(true));
                dispatch(setIsModalOpen(false));
            }}>Зарегистрироваться.</span></div>
        </form>
    );
};

export default LoginForm;