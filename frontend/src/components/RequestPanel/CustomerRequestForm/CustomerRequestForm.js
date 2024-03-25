// Style imports
import './customerRequestForm.scss';
import { ButtonTheme, FileInputTheme, TextareaTheme, TextInputTheme } from '../../../style/flowbiteThemes';

// Components
import { Button, FileInput, Label, Spinner, TextInput, Textarea } from 'flowbite-react';

// Hooks
import { useRef } from 'react';

// Form validation
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { sendFormData, setFormData, setSearchResult } from './customerRequestFormSlice';
import { setIsModalOpen as setLoginModal } from '../../LoginModal/loginModalSlice';

import { getRequest } from '../../../services/http';
import { _key } from '../../Map/Map';

const CustomerRequestForm = () => {
    const dispatch = useDispatch();

    const isAuthorized = useSelector((state) => state.appUser.isAuthorized);
    const appMode = useSelector((state) => state.appMode.appMode);
    const currentLocation = useSelector((state) => state.map.currentLocation);
    const formData = useSelector((state) => state.customerRequestForm.formData);
    const formState = useSelector((state) => state.customerRequestForm.formState);
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
        title: yup.string().required('Заполните описание').max(255, 'Описание не должно превышать 255 символов'),
        location: yup.string().required('Укажите адрес'),
        img: yup.array().test('is-valid-files', 'Недопустимый тип файла или слишком большой размер (5 МБ)', function (files) {
            const validTypes = ['image/png', 'image/jpeg'];
            const maxSizeMB = 5;
            if (files) {
                return files.every(file => {
                    if (!validTypes.includes(file.type)) {
                        return false;
                    };
            
                    const maxSizeBytes = maxSizeMB * 1024 * 1024;
                    return file.size <= maxSizeBytes;
                });
            } else {
                return true;
            };
        }),
        description: yup.string()
    });

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValue: {
            title: formData.title,
            location: formData.location,
            description: formData.description
        },
        resolver: yupResolver(schema)
    });

    // Обработка отправки формы
    const onSubmit = handleSubmit((data) => {
        dispatch(sendFormData({...data, latitude: formData.latitude || null, longitude: formData.longitude || null}));
    });

    // Поиск по адресу
    const searchAddress = async (address) => {
        const targetLocation = currentLocation ? currentLocation : [71.43, 51.12]
        const response = await getRequest(`https://catalog.api.2gis.ru/3.0/items/geocode?type=street%2Cbuilding%2Cattraction%2Cstation_platform%2Cadm_div.place%2Cadm_div.city%2Cadm_div.district&key=${_key}&fields=items.point%2Citems.region_id%2Citems.segment_id&location=${targetLocation[0]}%2C${targetLocation[1]}&q=${address}`);
        
        try {
            dispatch(setSearchResult(response.result.items));
        } catch (e) {
            dispatch(setSearchResult(null));
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
                        dispatch(setFormData({...formData, location: item.address_name}));
                        dispatch(setSearchResult(null));
                        dispatch(setFormData({...formData, latitude: item.point.lat, longitude: item.point.lon}));
                        setValue('location', item.address_name);
                        document.activeElement.blur();
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
        <form className='customer-request-form' encType='multipart/form-data' onSubmit={(e) => {
            e.preventDefault();

            if (isAuthorized) {
                onSubmit();
            } else {
                dispatch(setLoginModal(true));
            };
        }}>
                <div className='customer-request-form__head'>
                    <img src='https://cdn.lovattro.kz/woluntr/task.svg' alt='task'/>
                    <span>Создать задание</span>
                </div>
                <div className='customer-request-form-field'>
                    <Label className='input-label' htmlFor="title" style={{'fontSize': '14px', 'display': 'block', 'marginBottom': '5px', 'marginLeft': '10px'}} value="Назовите задачу" />
                    <Controller
                        name="title"
                        control={control}
                        defaultValue={formData.title}
                        render={({ field }) => <TextInput
                                theme={TextInputTheme}
                                ref={(el) => inputRefs.current.push(el)}
                                id='title'
                                defaultValue={formData.title}
                                placeholder='Введите название'
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    dispatch(setFormData({...formData, title: e.target.value}));
                                }}
                            />
                        }
                    />
                    <span className="error">{errors.title?.message}</span>
                </div>
                <div className='customer-request-form-field'>
                    <Label className='input-label' htmlFor="title" style={{'fontSize': '14px', 'display': 'block', 'marginBottom': '5px', 'marginLeft': '10px'}} value="Опишите задачу" />
                    <Controller
                        name='description'
                        className="customer-request-form-img"
                        control={control}
                        defaultValue={formData.description}
                        render={({ field }) => <Textarea
                                color="gray"
                                className='dsbswp'
                                theme={TextareaTheme}
                                ref={(el) => inputRefs.current.push(el)}
                                rows={4}
                                style={{':focus:border': 'none'}}
                                placeholder='Введите описание'
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                    dispatch(setFormData({...formData, description: e.target.value}));
                                }}
                            />
                        }
                    />
                </div>
                <div className='customer-request-form-field'>
                    <Label className='input-label' htmlFor="title" style={{'fontSize': '14px', 'display': 'block', 'marginBottom': '5px', 'marginLeft': '10px'}} value="Укажите адрес" />
                    <Controller
                        name="location"
                        className='customer-request-form-address'
                        control={control}
                        defaultValue={formData.location}
                        render={({ field }) => <TextInput
                                theme={TextInputTheme}
                                ref={(el) => inputRefs.current.push(el)}
                                value={field.value || ''}
                                placeholder='Введите адрес'
                                onChange={(e) => {
                                    dispatch(setFormData({...formData, location: e.target.value}));
                                    if (e.target.value) {searchAddress(e.target.value);}
                                    field.onChange(e.target.value || '');
                                    dispatch(setFormData({...formData, latitude: null, longitude: null}));
                                }}
                            />
                        }
                    />
                    <div className='customer-request-form-field__result dsbswp' style={{display: searchResult ? 'block' : 'none'}}>
                        {renderAddressSuggestions()}
                    </div>
                    <span className="error">{errors.location?.message}</span>
                </div>
                <div className='customer-request-form-field'>
                    <Label className='input-label' htmlFor="order-photos" style={{'fontSize': '14px', 'display': 'block', 'marginBottom': '5px', 'marginLeft': '10px'}} value="Добавить фотографии" />
                    <Controller
                        name="img"
                        id="order-photos"
                        control={control}
                        render={({ field }) => <FileInput
                                theme={FileInputTheme}
                                style={{
                                    'fontSize': '0.875rem'
                                }}
                                ref={(el) => inputRefs.current.push(el)}
                                onChange={(e) => {
                                    field.onChange(Array.from(e.target.files));
                                }}
                            />
                        }
                    />
                    <span className="error">{errors.img?.message}</span>
                </div>
                <Button
                    className='customer-request-form-submit'
                    type='submit'
                    color={appMode === 'customer' ? 'green' : 'purple'}
                    theme={ButtonTheme}
                    size='xl'
                    isProcessing={formState === 'sending'}
                    processingSpinner={<Spinner theme={{ base: "inline animate-spin text-main-accent-color", color: { info: "fill-main-color" } }}/>}
                >Создать</Button>
            </form>
    );
};

export default CustomerRequestForm;