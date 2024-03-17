// Стилистические импорты
import './customerRequestForm.scss';
import { FloatingLabelCustomerTheme } from '../../style/flowbiteThemes/floatingLabelCustomer';

// Вспомогательные компоненты
import { Button, FloatingLabel } from 'flowbite-react';
import { ButtonTheme } from '../../style/flowbiteThemes';

// Хуки
import { useSelector } from 'react-redux';
import { useRef } from 'react';

const CustomerRequestForm = () => {
    const appMode = useSelector((state) => state.appMode.appMode)

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
          document.activeElement.blur(); // Скрыть клавиатуру
        }
    };

    window.addEventListener('touchmove', handleOutsideClick);
    

    return (
        <form className='customer-request-form'>
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