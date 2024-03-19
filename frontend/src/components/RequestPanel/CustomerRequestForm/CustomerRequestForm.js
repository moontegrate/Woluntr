// Стилистические импорты
import './customerRequestForm.scss';
import { FloatingLabelCustomerTheme } from '../../../style/flowbiteThemes';

// Вспомогательные компоненты
import { Button, FloatingLabel } from 'flowbite-react';
import { ButtonTheme } from '../../../style/flowbiteThemes';

// Хуки
import { useRef } from 'react';

// Валидация формы
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setFormData } from './customerRequestFormSlice';

const CustomerRequestForm = () => {
    const dispatch = useDispatch();
    const appMode = useSelector((state) => state.appMode.appMode);
    const formData = useSelector((state) => state.customerRequestForm.formData);

    // Следующий код служит для скрытия клавиатуры на мобилках при клике на все кроме инпутов. Сделано это для избежания багов при скролле с раскрытой клавиатурой.
    const inputRefs = useRef([]);

    const handleOutsideClick = (e) => {
        let isClickInsideInput = false;
        for (let inputRef of inputRefs.current) {
          if (inputRef && inputRef.contains(e.target)) {
            isClickInsideInput = true;
            break;
          }
        }
        if (!isClickInsideInput) {
          document.activeElement.blur();
        }
    };

    window.addEventListener('touchmove', handleOutsideClick);

    // Валидация формы
    const schema = yup.object().shape({
        orderDesc: yup.string().required('Заполните описание'),
        orderAddress: yup.string().required('Укажите адрес'),
        note: yup.string()
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValue: {
            orderDesc: formData.orderDesc,
            orderAddress: formData.orderAddress,
            note: formData.note
        },
        resolver: yupResolver(schema)
    });

    // Обработка отправки формы
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form className='customer-request-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='customer-request-form__head'>
                    <img src='https://cdn.lovattro.kz/woluntr/task.svg' alt='task'/>
                    <span>Создать задание</span>
                </div>
                <div className='customer-request-form-field'>
                    <Controller
                        name="orderDesc"
                        control={control}
                        defaultValue={formData.orderDesc}
                        render={({ field }) => <FloatingLabel
                                theme={FloatingLabelCustomerTheme}
                                ref={(el) => inputRefs.current.push(el)}
                                variant='standard'
                                defaultValue={formData.orderDesc}
                                label='Опишите задачу'
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    dispatch(setFormData({...formData, orderDesc: e.target.value}));
                                }}
                            />
                        }
                    />
                    <span className="error">{errors.orderDesc?.message}</span>
                </div>
                <div className='customer-request-form-field'>
                    <Controller
                        name="orderAddress"
                        control={control}
                        defaultValue={formData.orderAddress}
                        render={({ field }) => <FloatingLabel
                                theme={FloatingLabelCustomerTheme}
                                ref={(el) => inputRefs.current.push(el)}
                                variant='standard'
                                defaultValue={formData.orderAddress}
                                label='Укажите адрес'
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    dispatch(setFormData({...formData, orderAddress: e.target.value}));
                                }}
                            />
                        }
                    />
                    <span className="error">{errors.orderAddress?.message}</span>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} ref={(el) => inputRefs.current.push(el)} variant='standard' label='Комментарий волонтёру'/>
                </div>
                <Button className='customer-request-form-submit' type='submit' color={appMode === 'customer' ? 'green' : 'purple'}  theme={ButtonTheme} size='xl'>Создать</Button>
            </form>
    );
};

export default CustomerRequestForm;