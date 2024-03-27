// style imports
import './registerForm.scss';
import { ButtonTheme, FloatingLabelCustomerTheme, FloatingLabelVolunteerTheme } from '../../style/flowbiteThemes';

// components
import { Button, FloatingLabel, Spinner } from 'flowbite-react';

// form validation
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../RegisterModal/registerModalSlice';
import { register, resetForm, setFormData } from './registerFormSlice';
import { setIsModalOpen as openLoginModal } from '../LoginModal/loginModalSlice';
import { authorize } from '../LoginForm/loginFormSlice';
import { getCurrentUserInfo, setIsAuthorized } from '../App/appUserSlice';
import { getAllOrders } from '../App/ordersSlice';

// libs
import toast from 'react-hot-toast';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);
    const formData = useSelector((state) => state.registerForm.formData);
    const formState = useSelector((state) => state.registerForm.formState);

    const schema = yup.object().shape({
        firstName: yup.string().required('Введите имя'),
        email: yup.string().email('Проверьте корректность почты').required('Введите почту'),
        password: yup.string().required('Введите пароль'),
        repassword: yup.string().required('Повторите пароль'),
    });

    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValue: {
            firstName: formData.firstName,
            email: formData.email,
            password: formData.password,
            repassword: formData.repassword
        },
        resolver: yupResolver(schema)
    });

    // Обработка отправки формы
    const onSubmit = async (data) => {
        if (data.password === data.repassword) {
            dispatch(register({
                'first_name': data.firstName,
                'email': data.email,
                'password': data.password
            }))
            .then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    dispatch(resetForm());
                    dispatch(setIsModalOpen(false));
                    dispatch(authorize({
                        'email': data.email,
                        'password': data.password
                    }))
                    .then((response) => {
                        if (response.meta.requestStatus === 'fulfilled') {
                            localStorage.setItem('refresh_token', response.payload.refresh)
                            localStorage.setItem('access_token', response.payload.access)
                            dispatch(setIsAuthorized(true));
                            dispatch(setIsModalOpen(false));
                            dispatch(getCurrentUserInfo());
                            dispatch(getAllOrders());
                        } else if (response.meta.requestStatus === 'rejected') {
                            console.error('Error while signing in after registration.')
                        }
                    });
                    
                    toast('Ура! Регистрация прошла успешно.', {
                        position: 'bottom-right',
                        icon: '🤩'
                    });
                } else if (response.meta.requestStatus === 'rejected') {
                    console.log(response)
                    toast('Упс! Что-то пошло не так.', {
                        position: 'bottom-right',
                        icon: '😰'
                    });
                };
            });
        } else {
            setError('repassword', {message: 'Пароли не совпадают.'})
        }
    };

    return (
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <div className='login-form__field'>
                <Controller
                    name='firstName'
                    control={control}
                    defaultValue={formData.firstName}
                    render={({ field }) => <FloatingLabel
                            theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme}
                            variant='standard'
                            label='Ваше имя'
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(setFormData({...formData, firstName: e.target.value}));
                            }}
                        />
                    }
                />
                <span className="error">{errors.firstName?.message}</span>
            </div>
            <div className='login-form__field'>
                <Controller
                    name='email'
                    control={control}
                    defaultValue={formData.email}
                    render={({ field }) => <FloatingLabel
                            theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme}
                            variant='standard'
                            label='Ваша почта'
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
                            label='Придумайте пароль'
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(setFormData({...formData, password: e.target.value}));
                            }}
                        />
                    }
                />
                <span className="error">{errors.password?.message}</span>
            </div>
            <div className='login-form__field'>
                <Controller
                    name='repassword'
                    control={control}
                    defaultValue={formData.repassword}
                    render={({ field }) => <FloatingLabel
                            theme={appMode === 'customer' ? FloatingLabelCustomerTheme : FloatingLabelVolunteerTheme}
                            variant='standard'
                            type='password'
                            label='Повторите пароль'
                            onChange={(e) => {
                                field.onChange(e.target.value);
                                dispatch(setFormData({...formData, repassword: e.target.value}));
                            }}
                        />
                    }
                />
                <span className="error">{errors.repassword?.message}</span>
            </div>
            <Button
                theme={ButtonTheme}
                className='login-form__submit'
                color={appMode === 'customer' ? 'green' : 'purple'}
                size='xl'
                type='submit'
                isProcessing={formState === 'sending'}
                processingSpinner={<Spinner theme={{ base: "inline animate-spin text-main-accent-color", color: { info: "fill-main-color" } }}/>}
            >Зарегистрироваться</Button>
            <div>Есть аккаунт? <span className={appMode === 'customer' ? "text-main-color hover:underline dark:text-main-color cursor-pointer" : "text-volunteer-color hover:underline dark:text-volunteer-color cursor-pointer"} onClick={() => {
                dispatch(setIsModalOpen(false));
                dispatch(openLoginModal(true));
            }}>Войти.</span></div>
        </form>
    );
};

export default RegisterForm;