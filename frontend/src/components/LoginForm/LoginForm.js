// Стилистические импорты
import './loginForm.scss';
import { CheckboxTheme, FloatingLabelVolunteerTheme, FloatingLabelCustomerTheme, ButtonTheme } from '../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button, Checkbox, FloatingLabel, Label, Spinner } from 'flowbite-react';

// Валидация формы
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../LoginModal/loginModalSlice';
import { setFormData } from './loginFormSlice';
import { authorize } from './loginFormSlice';
import { setIsModalOpen as openRegModal } from '../RegisterModal/registerModalSlice';
import { getCurrentUserInfo } from '../App/appUserSlice';

const LoginForm = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);
    const formData = useSelector((state) => state.loginForm.formData);
    const formState = useSelector((state) => state.loginForm.formState);

    // Валидация формы
    const schema = yup.object().shape({
        email: yup.string().required('Введите почту'),
        password: yup.string().required('Введите пароль'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValue: {
            email: formData.email,
            password: formData.password,
            rememberMe: formData.rememberMe
        },
        resolver: yupResolver(schema)
    });

    // Обработка отправки формы
    const onSubmit = handleSubmit((data) => {
        dispatch(authorize({
            'email': data.email,
            'password': data.password
        })).finally(() => {
            dispatch(getCurrentUserInfo());
        });

        if (data.rememberMe) {
            localStorage.setItem('rememberMe', true);
        };
    });

    return (
        <form className='login-form' onSubmit={onSubmit}>
            <div className='login-form__field'>
                <Controller
                    name='email'
                    control={control}
                    defaultValue={formData.email}
                    render={({ field }) => <FloatingLabel
                            theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme}
                            variant='standard'
                            defaultValue={formData.email}
                            label='Электронная почта'
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(setFormData({...formData, email: e.target.value}));
                            }}
                        />
                    }
                />
                <span className="error">{errors.email?.message}</span>
            </div>
            <div className='login-form__field'>
                <Controller
                    name='password'
                    control={control}
                    defaultValue={formData.password}
                    render={({ field }) => <FloatingLabel
                            theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme}
                            variant='standard'
                            type='password'
                            defaultValue={formData.password}
                            label='Пароль'
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(setFormData({...formData, password: e.target.value}));
                            }}
                        />
                    }
                />
                <span className="error">{errors.password?.message}</span>
            </div>
            <div className="flex items-center gap-2">
                <Controller
                    name='rememberMe'
                    control={control}
                    defaultValue={formData.rememberMe}
                    render={({ field }) => <Checkbox
                            id="remember"
                            theme={CheckboxTheme} 
                            color={appMode === 'customer' ? 'green' : 'purple'}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(setFormData({...formData, rememberMe: e.target.value}));
                            }}
                        />
                    }
                />
                <Label htmlFor="remember" className="flex">Запомнить меня</Label>
            </div>
            <Button
                theme={ButtonTheme}
                className='login-form__submit'
                color={appMode === 'customer' ? 'green' : 'purple'}
                size='xl'
                isProcessing={formState === 'sending'}
                processingSpinner={<Spinner theme={{ base: "inline animate-spin text-main-accent-color", color: { info: "fill-main-color" } }}/>}
                type='submit'
            >Войти</Button>
            <div>Нет аккаунта? <span className={appMode === 'customer' ? "text-main-color hover:underline dark:text-main-color cursor-pointer" : "text-volunteer-color hover:underline dark:text-volunteer-color cursor-pointer"} onClick={() => {
                dispatch(openRegModal(true));
                dispatch(setIsModalOpen(false));
            }}>Зарегистрироваться.</span></div>
        </form>
    );
};

export default LoginForm;