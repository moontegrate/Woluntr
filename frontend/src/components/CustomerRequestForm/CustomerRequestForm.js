// Стилистические импорты
import './customerRequestForm.scss';
import { FloatingLabelCustomerTheme } from '../../style/flowbiteThemes/floatingLabelCustomer';

// Вспомогательные компоненты
import { Button, FloatingLabel } from 'flowbite-react';
import { ButtonTheme } from '../../style/flowbiteThemes';

// Хуки
import { useSelector } from 'react-redux';
import { useRef } from 'react';

// Валидация формы
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CustomerRequestForm = () => {
    const appMode = useSelector((state) => state.appMode.appMode)

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
        email: yup.string().email('Проверьте корректность почты').required('Введите почту')
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        
    };

    return (
        <form className='customer-request-form' onSubmit={handleSubmit(onSubmit)}>
                <div className='customer-request-form__head'>
                    <img src='https://cdn.lovattro.kz/woluntr/task.svg' alt='task'/>
                    <span>Создать задание</span>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} ref={(el) => inputRefs.current.push(el)} variant='standard' label='Опишите задачу'/>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} ref={(el) => inputRefs.current.push(el)} variant='standard' label='Укажите адрес'/>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} ref={(el) => inputRefs.current.push(el)} variant='standard' label='Комментарий волонтёру'/>
                </div>
                <Button className='customer-request-form-submit' color={appMode === 'customer' ? 'green' : 'purple'}  theme={ButtonTheme} size='xl'>Создать</Button>
            </form>
    );
};

export default CustomerRequestForm;