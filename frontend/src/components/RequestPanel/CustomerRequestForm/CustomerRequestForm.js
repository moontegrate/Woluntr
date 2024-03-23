// Style imports
import './customerRequestForm.scss';
import { FloatingLabelCustomerTheme } from '../../../style/flowbiteThemes';

// Components
import { Button, FileInput, FloatingLabel, Label } from 'flowbite-react';
import { ButtonTheme, FileInputTheme } from '../../../style/flowbiteThemes';

// Hooks
import { useRef } from 'react';

// Form validation
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCoordinates, setFormData, setSearchResult } from './customerRequestFormSlice';

import { getRequest } from '../../../services/http';
import { _key } from '../../Map/Map';

const CustomerRequestForm = () => {
    const dispatch = useDispatch();

    const appMode = useSelector((state) => state.appMode.appMode);
    const currentLocation = useSelector((state) => state.map.currentLocation);
    const formData = useSelector((state) => state.customerRequestForm.formData);
    const searchResult = useSelector((state) => state.customerRequestForm.addressSearchResult);

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

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValue: {
            orderDesc: formData.orderDesc,
            orderAddress: formData.orderAddress,
            note: formData.note
        },
        resolver: yupResolver(schema)
    });

    // Обработка отправки формы
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    // Поиск по адресу
    const searchAddress = async (address) => {
        const targetLocation = currentLocation ? currentLocation : [71.43, 51.12]
        const response = await getRequest(`https://catalog.api.2gis.ru/3.0/items/geocode?type=street%2Cbuilding%2Cattraction%2Cstation_platform%2Cadm_div.place%2Cadm_div.city%2Cadm_div.district&key=${_key}&fields=items.point%2Citems.region_id%2Citems.segment_id&location=${targetLocation[0]}%2C${targetLocation[1]}&q=${address}`);
        
        try {
            dispatch(setSearchResult(response.result.items));
        } catch (error) {
            console.error(error);
        };
    };

    // Рендер результатов поиска
    const renderAddressSuggestions = () => {
        if (searchResult) {
            const result = searchResult.map((item, i) => {
                return <div
                    key={i}
                    className='customer-request-form-field__result-item dsbswp'
                    onClick={() => {
                        dispatch(setFormData({...formData, orderAddress: item.address_name}));
                        dispatch(setSearchResult(null));
                        dispatch(setCoordinates([item.point.lon, item.point.lat]));
                        setValue('orderAddress', item.address_name);
                    }}
                >
                    <p className='customer-request-form-field__result-item_name dsbswp'>{item.name}</p>
                    <p className='customer-request-form-field__result-item_address dsbswp'>{item.address_name}</p>
                </div>
            });
    
            return result;
        };
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
                        className='customer-request-form-address'
                        control={control}
                        defaultValue={formData.orderAddress}
                        render={({ field }) => <FloatingLabel
                                theme={FloatingLabelCustomerTheme}
                                ref={(el) => inputRefs.current.push(el)}
                                variant='standard'
                                defaultValue={field.value}
                                label='Укажите адрес'
                                onChange={(e) => {
                                    searchAddress(e.target.value);
                                    field.onChange(e.target.value);
                                    dispatch(setFormData({...formData, orderAddress: e.target.value}));
                                }}
                            />
                        }
                    />
                    <div className='customer-request-form-field__result dsbswp'>
                        {renderAddressSuggestions()}
                    </div>
                    <span className="error">{errors.orderAddress?.message}</span>
                </div>
                <div className='customer-request-form-field'>
                    <Label className='input-label' htmlFor="order-photos" style={{'fontSize': '14px', 'display': 'block', 'marginBottom': '10px'}} value="Добавить фотографии" />
                    <Controller
                        name="orderPhotos"
                        id="order-photos"
                        control={control}
                        render={({ field }) => <FileInput
                                theme={FileInputTheme}
                                style={{
                                    'fontSize': '0.875rem'
                                }}
                                ref={(el) => inputRefs.current.push(el)}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                        }
                    />
                    <span className="error">{errors.orderDesc?.message}</span>
                </div>
                <div className='customer-request-form-field'>
                    <FloatingLabel theme={FloatingLabelCustomerTheme} ref={(el) => inputRefs.current.push(el)} variant='standard' label='Комментарий волонтёру'/>
                </div>
                <Button className='customer-request-form-submit' type='submit' color={appMode === 'customer' ? 'green' : 'purple'}  theme={ButtonTheme} size='xl'>Создать</Button>
            </form>
    );
};

export default CustomerRequestForm;