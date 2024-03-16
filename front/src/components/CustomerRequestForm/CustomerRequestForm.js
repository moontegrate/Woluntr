// Стилистические импорты
import './customerRequestForm.scss';
import { FloatingLabelCustomerTheme } from '../../style/flowbiteThemes/floatingLabelCustomer';

// Вспомогательные компоненты
import { Button, FloatingLabel } from 'flowbite-react';
import { ButtonTheme } from '../../style/flowbiteThemes';

// Хуки
import { useSelector } from 'react-redux';

const CustomerRequestForm = () => {
    const appMode = useSelector((state) => state.appMode.appMode)

    return (
        <form className='customer-request-form'>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} variant='standard' label='Опишите задачу'/>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} variant='standard' label='Укажите адрес'/>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} variant='standard' label='Комментарий волонтёру'/>
                </div>
                <Button className={'customer-request-form-submit ' + appMode + '-bg-accent'}  theme={ButtonTheme} size='xl'>Создать</Button>
            </form>
    );
};

export default CustomerRequestForm;